import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

const resultValidator = v.object({
  sent: v.boolean(),
  reason: v.optional(v.string()),
});

type EmailResult = {
  sent: boolean;
  reason?: string;
};

type QuoteEmailPayload = {
  reference: string;
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  vehicle:
    | "unspecified"
    | "l1h1"
    | "master_l2h2_2023"
    | "citroen_l2h2_2019"
    | "l3h2"
    | "fleet";
  duration:
    | "1_month"
    | "2_months"
    | "3_months"
    | "4_6_months"
    | "over_6_months";
  startDate?: string;
  message?: string;
  createdAt: number;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const durationLabels: Record<string, string> = {
  "1_month": "1 mois",
  "2_months": "2 mois",
  "3_months": "3 mois",
  "4_6_months": "4 à 6 mois",
  "over_6_months": "Plus de 6 mois",
};

export const sendQuoteNotification = internalAction({
  args: { quoteRequestId: v.id("quoteRequests") },
  returns: resultValidator,
  handler: async (ctx, args): Promise<EmailResult> => {
    const request: QuoteEmailPayload | null = await ctx.runQuery(
      internal.quoteRequests.getForEmail,
      {
        quoteRequestId: args.quoteRequestId,
      },
    );
    if (!request) return { sent: false, reason: "request_not_found" };

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to =
      process.env.QUOTE_NOTIFICATION_EMAIL ??
      "contact.yabilocation@gmail.com";

    if (!apiKey || !from) {
      await ctx.runMutation(internal.quoteRequests.setEmailStatus, {
        quoteRequestId: args.quoteRequestId,
        emailStatus: "not_configured",
      });
      return { sent: false, reason: "email_not_configured" };
    }

    const details = [
      ["Référence", request.reference],
      ["Nom", request.fullName],
      ["Entreprise", request.company ?? "Non renseignée"],
      ["E-mail", request.email],
      ["Téléphone", request.phone],
      ["Durée", durationLabels[request.duration] ?? request.duration],
      ["Date de début", request.startDate ?? "Non renseignée"],
      ["Message", request.message ?? "Aucun message"],
    ];

    const htmlRows = details
      .map(
        ([label, value]) =>
          `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;background:#f3f6fb;color:#0d3a8e;">${escapeHtml(label)}</th><td style="padding:8px 12px;color:#1f2937;">${escapeHtml(value)}</td></tr>`,
      )
      .join("");
    const text = details.map(([label, value]) => `${label}: ${value}`).join("\n");

    try {
      const response: Response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: request.email,
          subject: `Nouvelle demande YABI — ${request.reference}`,
          text,
          html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;"><h1 style="color:#0d3a8e;">Nouvelle demande YABI Location</h1><p>Une nouvelle demande a été envoyée depuis le site.</p><table style="width:100%;border-collapse:collapse;border:1px solid #dbe4f0;">${htmlRows}</table><p style="margin-top:20px;color:#6b7280;">Répondez directement à cet e-mail pour contacter ${escapeHtml(request.fullName)}.</p></div>`,
        }),
      });

      if (!response.ok) {
        await ctx.runMutation(internal.quoteRequests.setEmailStatus, {
          quoteRequestId: args.quoteRequestId,
          emailStatus: "failed",
        });
        return { sent: false, reason: `resend_${response.status}` };
      }

      await ctx.runMutation(internal.quoteRequests.setEmailStatus, {
        quoteRequestId: args.quoteRequestId,
        emailStatus: "sent",
      });
      return { sent: true };
    } catch {
      await ctx.runMutation(internal.quoteRequests.setEmailStatus, {
        quoteRequestId: args.quoteRequestId,
        emailStatus: "failed",
      });
      return { sent: false, reason: "request_failed" };
    }
  },
});
