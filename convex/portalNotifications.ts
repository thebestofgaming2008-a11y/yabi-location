import { v } from "convex/values";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { internalAction } from "./_generated/server";

const resultValidator = v.object({
  sent: v.boolean(),
  reason: v.optional(v.string()),
});

type Result = { sent: boolean; reason?: string };

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const typeLabels: Record<string, string> = {
  problem_report: "Problème ou dommage signalé",
  accident_report: "Accident signalé",
  payment_proof: "Preuve de paiement reçue",
  monthly_inspection: "Inspection mensuelle reçue",
};

export const sendWorkflowNotification = internalAction({
  args: {
    recordId: v.id("workflowRecords"),
    attempt: v.optional(v.number()),
  },
  returns: resultValidator,
  handler: async (ctx, args): Promise<Result> => {
    const record = await ctx.runQuery(internal.portal.getWorkflowForNotification, {
      recordId: args.recordId,
    });
    if (!record) return { sent: false, reason: "record_not_found" };
    if (record.notificationEmailStatus === "sent") return { sent: true };

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to =
      record.type === "payment_proof"
        ? process.env.ACCOUNTING_NOTIFICATION_EMAIL ??
          process.env.PORTAL_NOTIFICATION_EMAIL ??
          process.env.QUOTE_NOTIFICATION_EMAIL ??
          "contact.yabilocation@gmail.com"
        : process.env.PORTAL_NOTIFICATION_EMAIL ??
          process.env.QUOTE_NOTIFICATION_EMAIL ??
          "contact.yabilocation@gmail.com";
    if (!apiKey || !from) {
      await ctx.runMutation(internal.portal.setWorkflowNotificationStatus, {
        recordId: args.recordId,
        notificationEmailStatus: "not_configured",
        notificationEmailLastError: "email_not_configured",
        notificationEmailAttemptedAt: Date.now(),
      });
      return { sent: false, reason: "email_not_configured" };
    }

    const details = [
      ["Référence", record.reference],
      ["Type", typeLabels[record.type] ?? record.type],
      ["Client", record.customerName ?? "—"],
      ["Société", record.customerCompany ?? "—"],
      ["Personne", record.performedByName ?? "—"],
      ["Plaque", record.licensePlate ?? "—"],
      ["Facture", record.invoiceReference ?? "—"],
      [
        "Date",
        new Date(record.occurredAt).toLocaleString("fr-BE", {
          timeZone: "Europe/Brussels",
        }),
      ],
      ["Description", record.description ?? "—"],
    ];
    const text = `${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nLes preuves restent disponibles uniquement dans le portail administrateur sécurisé.`;
    const rows = details
      .map(
        ([label, value]) =>
          `<tr><th style="padding:8px 12px;text-align:left;background:#f3f6fb;color:#0d3a8e;">${escapeHtml(label)}</th><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`,
      )
      .join("");

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `portal-workflow-${String(args.recordId)}`,
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: record.customerEmail,
          subject: `YABI — ${typeLabels[record.type] ?? record.type} — ${record.reference}`,
          text,
          html: `<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;"><h1 style="color:#0d3a8e;">${escapeHtml(typeLabels[record.type] ?? record.type)}</h1><table style="width:100%;border-collapse:collapse;border:1px solid #dbe4f0;">${rows}</table><p style="margin-top:20px;padding:12px;background:#f3f6fb;color:#4b5563;">Les photos, formulaires, accords et preuves de paiement restent dans le portail administrateur sécurisé.</p></div>`,
        }),
      });
      if (!response.ok) throw new Error(`resend_${response.status}`);
      const body = (await response.json().catch(() => ({}))) as { id?: unknown };
      await ctx.runMutation(internal.portal.setWorkflowNotificationStatus, {
        recordId: args.recordId,
        notificationEmailStatus: "sent",
        notificationEmailProviderId:
          typeof body.id === "string" ? body.id.slice(0, 200) : undefined,
        notificationEmailAttemptedAt: Date.now(),
      });
      return { sent: true };
    } catch (error) {
      const reason = error instanceof Error ? error.message.slice(0, 200) : "request_failed";
      await ctx.runMutation(internal.portal.setWorkflowNotificationStatus, {
        recordId: args.recordId,
        notificationEmailStatus: "failed",
        notificationEmailLastError: reason,
        notificationEmailAttemptedAt: Date.now(),
      });
      const attempt = args.attempt ?? 0;
      if (attempt < 2) {
        await ctx.scheduler.runAfter(
          attempt === 0 ? 30_000 : 120_000,
          internal.portalNotifications.sendWorkflowNotification,
          { recordId: args.recordId as Id<"workflowRecords">, attempt: attempt + 1 },
        );
      }
      return { sent: false, reason };
    }
  },
});
