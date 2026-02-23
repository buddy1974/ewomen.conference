# PROJECT STATE — E-WOMAN CONFERENCE 2026

Last Updated: 2026-02-22

---

## 1. Hosting

Frontend:
- Vite + React 18 (SPA)
- Hosted on Cloudflare Pages

Backend:
- Cloudflare Worker (separate /worker directory)

Deployment Platform:
- GitHub → Cloudflare Pages (frontend)
- Wrangler deploy (Worker)

---

## 2. Canonical Domain

Production URL:
https://www.e-womanconference.online

API Base (must be canonical — choose ONE):
https://api.e-womanconference.online

⚠ Frontend must call the same canonical endpoint.

---

## 3. Backend Architecture

Framework:
Cloudflare Worker

Primary Endpoint:

POST /register

Responsibilities:
- Rate limiting (3 per IP/hour)
- File upload to Cloudflare R2
- Email admin (Resend)
- Email registrant (Resend)
- WhatsApp admin alert (Twilio)

No database persistence (Supabase not connected).

---

## 4. Environment Variables (Worker Secrets Required)

Must be set via:

wrangler secret put

Required:

RESEND_API_KEY
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_FROM

Worker Variables (wrangler.toml):

SITE_ORIGIN
ADMIN_EMAIL
FROM_EMAIL
WHATSAPP_TO
ENABLE_WHATSAPP_NOTIFICATIONS

R2 Binding:
PAYMENTS bucket (ewoman-registrations)

---

## 5. Messaging

WhatsApp:
- Twilio API
- Outbound notification only
- No inbound support routing implemented

Email:
- Resend API
- Confirmation email + admin email

---

## 6. Payments

Payment Method:
- Manual Mobile Money (MTN / Orange)

Validation:
- Transaction ID submitted by user
- No server-side verification yet
- No webhook

---

## 7. Database

Provider:
None

⚠ No Supabase integration.
Registrations stored only in:
- R2 (proof files)
- Email inbox
- WhatsApp notifications

---

## 8. Security Status

CORS:
Restricted to production domain + localhost

Rate Limiting:
Implemented (IP-based)

Webhook:
Not applicable (no external webhook)

Secrets:
Must be deployed via Wrangler

---

## 9. Known Issues

- API endpoint URL must be canonicalized
- Worker secrets must be verified in production
- Press page documents array empty
- Some unused frontend dependencies
- Console logs in Register.tsx

---

## 10. Next Architectural Step

1. Canonicalize API endpoint
2. Confirm Worker secrets in production
3. Optional: integrate Supabase for registration persistence
4. Later: add inbound WhatsApp support routing