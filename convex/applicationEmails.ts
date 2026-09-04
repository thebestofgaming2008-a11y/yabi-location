import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

const resultValidator = v.object({
  sent: v.boolean(),
  reason: v.optional(v.string()),
});

type ApplicationEmailPayload = {
  reference: string;
  locale: "en" | "fr" | "nl";
  applicantType: "individual" | "company";
  holderFullName: string;
  companyName?: string;
  companyVatNumber?: string;
  holderAddress: string;
  holderPhone: string;
  holderEmail: string;
  submittedAt: number;
  emailStatus?: "not_configured" | "pending" | "sent" | "failed";
  drivers: Array<{
    kind: "main" | "additional";
    fullName: string;
    email?: string;
    phone: string;
    companyPosition?: string;
  }>;
  documentCount: number;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value: string): string {
  return `<tr><th style="padding:8px 12px;text-align:left;vertical-align:top;background:#f3f6fb;color:#0d3a8e;">${escapeHtml(label)}</th><td style="padding:8px 12px;color:#1f2937;">${escapeHtml(value)}</td></tr>`;
}

export const sendApplicationNotification = internalAction({
  args: { applicationId: v.id("rentalApplications") },
  returns: resultValidator,
  handler: async (ctx, args): Promise<{ sent: boolean; reason?: string }> => {
    const application: ApplicationEmailPayload | null = await ctx.runQuery(
      internal.applications.getApplicationForEmail,
      { applicationId: args.applicationId },
    );
    if (!application) return { sent: false, reason: "application_not_found" };
    if (application.emailStatus === "sent") return { sent: true };

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to =
      process.env.APPLICATION_NOTIFICATION_EMAIL ??
      process.env.QUOTE_NOTIFICATION_EMAIL ??
      "contact.yabilocation@gmail.com";

    if (!apiKey || !from) {
      await ctx.runMutation(internal.applications.setApplicationEmailStatus, {
        applicationId: args.applicationId,
        emailStatus: "not_configured",
        emailLastError: "email_not_configured",
        emailAttemptedAt: Date.now(),
      });
      return { sent: false, reason: "email_not_configured" };
    }

    const applicantType =
      application.applicantType === "company" ? "Société" : "Particulier";
    const submitted = new Date(application.submittedAt).toLocaleString(
      "fr-BE",
      { timeZone: "Europe/Brussels" },
    );
    const details = [
      ["Référence", application.reference],
      ["Type de demandeur", applicantType],
      ["Locataire", application.holderFullName],
      ["Société", application.companyName ?? "—"],
      ["N° TVA", application.companyVatNumber ?? "—"],
      ["E-mail", application.holderEmail],
      ["Téléphone", application.holderPhone],
      ["Adresse", application.holderAddress],
      ["Date d’envoi", submitted],
      ["Conducteurs", String(application.drivers.length)],
      ["Photos de documents", String(application.documentCount)],
    ];
    const textDrivers = application.drivers
      .map(
        (driver, index) =>
          `Conducteur ${index + 1} (${driver.kind === "main" ? "principal" : "supplémentaire"}): ${driver.fullName}; ${driver.email ?? "—"}; ${driver.phone}; fonction: ${driver.companyPosition ?? "—"}`,
      )
      .join("\n");
    const htmlDrivers = application.drivers
      .map(
        (driver, index) =>
          `<li style="margin-bottom:8px;"><strong>${escapeHtml(`Conducteur ${index + 1} — ${driver.kind === "main" ? "principal" : "supplémentaire"}`)}</strong><br>${escapeHtml(driver.fullName)} · ${escapeHtml(driver.email ?? "—")} · ${escapeHtml(driver.phone)}${driver.companyPosition ? ` · ${escapeHtml(driver.companyPosition)}` : ""}</li>`,
      )
      .join("");
    const text = `${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n${textDrivers}\n\nLes numéros d’identité, de registre national et de permis ainsi que les photos restent disponibles uniquement dans le portail administrateur sécurisé.`;
    const html = `<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;"><h1 style="color:#0d3a8e;">Nouvelle demande de location</h1><p>Une demande complète a été envoyée depuis le portail YABI Location.</p><table style="width:100%;border-collapse:collapse;border:1px solid #dbe4f0;">${details.map(([label, value]) => row(label, value)).join("")}</table><h2 style="margin-top:24px;color:#0d3a8e;">Conducteurs</h2><ol>${htmlDrivers}</ol><p style="margin-top:24px;padding:12px;background:#f3f6fb;color:#4b5563;">Pour protéger les données personnelles, les numéros d’identité, de registre national et de permis ainsi que les photos ne sont pas inclus dans cet e-mail. Consultez-les dans le portail administrateur sécurisé.</p></div>`;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `application-notification-${String(args.applicationId)}`,
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: application.holderEmail,
          subject: `Nouvelle demande de location YABI — ${application.reference}`,
          text,
          html,
        }),
      });
      if (!response.ok) {
        const reason = `resend_${response.status}`;
        await ctx.runMutation(internal.applications.setApplicationEmailStatus, {
          applicationId: args.applicationId,
          emailStatus: "failed",
          emailLastError: reason,
          emailAttemptedAt: Date.now(),
        });
        return { sent: false, reason };
      }
      const body = (await response.json().catch(() => ({}))) as {
        id?: unknown;
      };
      await ctx.runMutation(internal.applications.setApplicationEmailStatus, {
        applicationId: args.applicationId,
        emailStatus: "sent",
        emailProviderId:
          typeof body.id === "string" ? body.id.slice(0, 200) : undefined,
        emailAttemptedAt: Date.now(),
      });
      return { sent: true };
    } catch {
      await ctx.runMutation(internal.applications.setApplicationEmailStatus, {
        applicationId: args.applicationId,
        emailStatus: "failed",
        emailLastError: "request_failed",
        emailAttemptedAt: Date.now(),
      });
      return { sent: false, reason: "request_failed" };
    }
  },
});
