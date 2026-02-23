export interface Env {
  PAYMENTS: R2Bucket;

  RESEND_API_KEY: string;
  ADMIN_EMAIL: string;
  FROM_EMAIL: string;
  SITE_ORIGIN: string;

  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_WHATSAPP_FROM: string;
  WHATSAPP_TO: string;

  // Feature flag — set to "false" to disable WhatsApp notifications
  ENABLE_WHATSAPP_NOTIFICATIONS?: string;

  // Optional: WhatsApp template mode
  TWILIO_CONTENT_SID?: string;
  PROGRAM_NAME?: string;
}

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB hard limit
const ATTACH_THRESHOLD = 9 * 1024 * 1024; // attach up to ~9MB, else signed link
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
]);

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 registrations per IP per hour

function json(status: number, data: unknown, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function corsHeaders(origin: string, reqOrigin: string | null) {
  // Allow production site, Pages deployments, and localhost for dev
  const allow =
    (reqOrigin && reqOrigin === origin) ||
    (reqOrigin && reqOrigin.includes(".ewoman-conference.pages.dev")) ||
    (reqOrigin && reqOrigin.startsWith("http://localhost:")) ||
    (reqOrigin && reqOrigin.startsWith("http://127.0.0.1:"))
      ? reqOrigin
      : origin;

  return {
    "access-control-allow-origin": allow,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    "vary": "Origin",
  };
}

function getClientIp(req: Request) {
  // Cloudflare standard
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // Reset or first request
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

function sanitize(s: string) {
  return s.replace(/[<>]/g, "").trim();
}

function must(value: string, label: string) {
  if (!value || !value.trim()) throw new Error(`Missing ${label}`);
  return value.trim();
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendResendEmail(env: Env, payload: any) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Resend error: ${res.status} ${txt}`);
  }
}

async function sendTwilioWhatsApp(
  env: Env,
  bodyText: string,
  templateVariables?: { fullName: string; programName: string; registrationId: string }
) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;
  const auth = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);

  const form = new URLSearchParams();
  form.set("From", env.TWILIO_WHATSAPP_FROM);
  form.set("To", env.WHATSAPP_TO);

  // Check if production template mode is enabled
  if (env.TWILIO_CONTENT_SID && env.TWILIO_CONTENT_SID.trim()) {
    // Mode B: Production Template Mode
    form.set("ContentSid", env.TWILIO_CONTENT_SID);

    if (templateVariables) {
      // Build ContentVariables JSON string
      const contentVars = JSON.stringify({
        1: templateVariables.fullName,
        2: templateVariables.programName,
        3: templateVariables.registrationId,
      });
      form.set("ContentVariables", contentVars);
    }
  } else {
    // Mode A: Sandbox Mode (free-text)
    form.set("Body", bodyText);
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "authorization": `Basic ${auth}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: form,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Twilio error: ${res.status} ${txt}`);
  }
}

async function sendWhatsAppNotification(env: Env, message: string) {
  if (!env.ENABLE_WHATSAPP_NOTIFICATIONS || env.ENABLE_WHATSAPP_NOTIFICATIONS === "false") {
    console.log("[WHATSAPP] WhatsApp disabled via flag");
    return;
  }

  console.log("[WHATSAPP] WhatsApp notification triggered");

  try {
    await sendTwilioWhatsApp(env, message);
    console.log("[WHATSAPP] ✅ WhatsApp notification sent");
  } catch (err: any) {
    console.error("[WHATSAPP] WhatsApp failed but registration continued:", err?.message || err);
  }
}

async function makeSignedUrl(env: Env, key: string) {
  // R2 signed URL valid for 48 hours
  const obj = await env.PAYMENTS.get(key);
  if (!obj) throw new Error("File not found for signing");

  const signed = await env.PAYMENTS.createSignedUrl(key, { expiresIn: 48 * 60 * 60 });
  return signed;
}

function formatAdminHtml(data: Record<string, string>, ip: string, ts: string, proofInfo: string, registrationId: string) {
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:8px 10px;border:1px solid #eee;"><b>${k}</b></td><td style="padding:8px 10px;border:1px solid #eee;">${v}</td></tr>`)
    .join("");

  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2 style="margin:0 0 12px; color: #d10a6c;">New E-WOMAN 2026 Registration</h2>
    <p style="margin:0 0 12px;color:#555;">
      <b>Registration ID:</b> ${registrationId}<br/>
      <b>Timestamp:</b> ${ts}<br/>
      <b>IP:</b> ${ip}
    </p>
    <h3 style="margin:18px 0 10px;">Form Details</h3>
    <table style="border-collapse:collapse;width:100%;max-width:760px;">${rows}</table>
    <h3 style="margin:18px 0 10px;">Proof of Payment</h3>
    <p style="margin:0;color:#555;">${proofInfo}</p>
  </div>`;
}

export default {
  async fetch(req: Request, env: Env) {
    const reqOrigin = req.headers.get("origin");
    const cors = corsHeaders(env.SITE_ORIGIN, reqOrigin);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(req.url);

    if (req.method !== "POST" || url.pathname !== "/register") {
      return json(404, { ok: false, message: "Not found" }, cors);
    }

    try {
      const ip = getClientIp(req);

      // Rate limiting
      if (!checkRateLimit(ip)) {
        return json(
          429,
          { ok: false, message: "Too many requests. Please try again later." },
          cors
        );
      }

      const ts = new Date().toISOString();
      const registrationId = crypto.randomUUID();

      console.log(`[REGISTRATION STARTED] ID: ${registrationId} | IP: ${ip} | Time: ${ts}`);

      const form = await req.formData();

      // Required fields
      const fullName = sanitize(must(String(form.get("fullName") || ""), "Full Name"));
      const email = sanitize(must(String(form.get("email") || ""), "Email"));
      const phone = sanitize(must(String(form.get("phone") || ""), "Phone"));
      const country = sanitize(must(String(form.get("country") || ""), "Country"));

      const paymentMethod = sanitize(must(String(form.get("paymentMethod") || ""), "Payment Method"));
      const transactionId = sanitize(must(String(form.get("transactionId") || ""), "Transaction ID"));

      const ticketType = sanitize(String(form.get("ticketType") || "General"));
      const notes = sanitize(String(form.get("notes") || ""));

      console.log(`[REGISTRATION ${registrationId}] Validating: ${fullName} (${email})`);

      if (!validateEmail(email)) {
        return json(400, { ok: false, message: "Invalid email address" }, cors);
      }

      // Proof file
      const proof = form.get("proof");
      if (!(proof instanceof File)) {
        return json(400, { ok: false, message: "Proof of payment file is required" }, cors);
      }

      // Validate MIME type
      if (!ALLOWED_MIME.has(proof.type)) {
        return json(400, { ok: false, message: "Invalid file type. Use JPG, PNG, or PDF." }, cors);
      }

      // Validate file size
      if (proof.size > MAX_FILE_BYTES) {
        return json(400, { ok: false, message: "File too large. Maximum size is 10MB." }, cors);
      }

      // Store to R2
      const ext =
        proof.type === "application/pdf" ? "pdf" :
        proof.type === "image/png" ? "png" :
        "jpg";

      const safeName = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const datePrefix = new Date().toISOString().slice(0, 10);
      const key = `registrations/${datePrefix}/${safeName}-${registrationId}.${ext}`;

      console.log(`[REGISTRATION ${registrationId}] Uploading file to R2: ${key}`);

      const arrBuf = await proof.arrayBuffer();
      try {
        await env.PAYMENTS.put(key, arrBuf, {
          httpMetadata: { contentType: proof.type },
          customMetadata: {
            registrationId,
            fullName,
            email,
            phone,
            country,
            paymentMethod,
            transactionId,
            ts,
            ip,
          },
        });
        console.log(`[REGISTRATION ${registrationId}] ✅ File uploaded successfully`);
      } catch (uploadErr: any) {
        console.error(`[REGISTRATION ${registrationId}] ❌ File upload failed:`, uploadErr);
        throw uploadErr;
      }

      // Email payload data
      const formDataForAdmin: Record<string, string> = {
        "Full Name": fullName,
        "Email": email,
        "Phone": phone,
        "Country": country,
        "Ticket Type": ticketType,
        "Payment Method": paymentMethod,
        "Transaction ID": transactionId,
        "Notes": notes || "-",
      };

      let proofInfo = `Stored in R2 as: <b>${key}</b>`;
      let attachments: any[] = [];

      if (proof.size <= ATTACH_THRESHOLD) {
        // Attach to admin email
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrBuf)));
        attachments = [
          {
            filename: `proof-${safeName}.${ext}`,
            content: base64,
          },
        ];
        proofInfo = `Attached to this email (also stored privately in R2 as <b>${key}</b>).`;
      } else {
        // Signed URL for admin
        const signed = await makeSignedUrl(env, key);
        proofInfo = `File is large; download securely here (valid 48 hours): <a href="${signed}">${signed}</a><br/>Also stored privately in R2 as <b>${key}</b>.`;
      }

      // Email notifications (optional - only if Resend is configured)
      if (env.RESEND_API_KEY && env.RESEND_API_KEY !== 're_placeholder_update_later') {
        try {
          console.log(`[REGISTRATION ${registrationId}] Sending email notifications...`);

          // 1) Admin email
          await sendResendEmail(env, {
            from: env.FROM_EMAIL,
            to: env.ADMIN_EMAIL,
            subject: `New E-WOMAN Registration — ${fullName} (${paymentMethod})`,
            html: formatAdminHtml(formDataForAdmin, ip, ts, proofInfo, registrationId),
            ...(attachments.length ? { attachments } : {}),
          });

          // 2) User auto-reply
          await sendResendEmail(env, {
            from: env.FROM_EMAIL,
            to: email,
            subject: "Your E-WOMAN Conference 2026 Registration",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
                <h2 style="margin:0 0 10px; color: #d10a6c;">Registration Received ✅</h2>
                <p style="margin:0 0 12px;color:#555;">
                  Hi <strong>${fullName}</strong>,<br/><br/>
                  Thank you for registering for <strong>E-WOMAN Conference 2026</strong>!
                </p>
                <p style="margin:0 0 12px;color:#555;">
                  We have received your registration and are currently verifying your payment. We will contact you shortly to confirm your seat.
                </p>
                <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0;">
                  <p style="margin:0 0 8px; font-size: 14px; color: #666;"><strong>Event Details:</strong></p>
                  <p style="margin:0 0 4px; font-size: 14px;">📅 March 13-14, 2026</p>
                  <p style="margin:0 0 4px; font-size: 14px;">📍 Hilton Hotel, Yaoundé, Cameroon</p>
                  <p style="margin:0 0 4px; font-size: 14px;">💳 Registration Fee: 50,000 FCFA</p>
                </div>
                <p style="margin:0 0 12px;color:#555;">
                  If you need urgent help or have questions, please contact us:
                </p>
                <p style="margin:0;color:#555;">
                  📱 WhatsApp: <strong>+237 6 97 31 77 37</strong><br/>
                  📧 Email: <strong>info@e-womanconference.online</strong>
                </p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
                <p style="margin:0; font-size: 12px; color: #999;">
                  E-WOMAN Conference 2026 — Celebrating the Elevated Woman<br/>
                  Hilton Hotel, Yaoundé, Cameroon
                </p>
              </div>
            `,
          });

          console.log(`[REGISTRATION ${registrationId}] ✅ Email notifications sent`);
        } catch (emailErr: any) {
          console.error(`[REGISTRATION ${registrationId}] ❌ Email failed (non-blocking):`, emailErr);
          // Continue - email failure should not block registration
        }
      } else {
        console.log(`[REGISTRATION ${registrationId}] ⚠️ Resend not configured - skipping email notifications`);
      }

      // 3) WhatsApp alert (short)
      const waMsg =
        `🎉 New E-WOMAN Registration\n\n` +
        `ID: ${registrationId}\n` +
        `Name: ${fullName}\n` +
        `Phone: ${phone}\n` +
        `Country: ${country}\n` +
        `Payment: ${paymentMethod}\n` +
        `Ref: ${transactionId}`;

      await sendWhatsAppNotification(env, waMsg);

      console.log(`[REGISTRATION ${registrationId}] ✅ COMPLETED SUCCESSFULLY`);
      return json(200, { ok: true, message: "Registration received successfully", registrationId }, cors);
    } catch (err: any) {
      console.error("Registration error:", err);
      return json(500, { ok: false, message: err?.message || "Server error. Please try again." }, cors);
    }
  },
};
