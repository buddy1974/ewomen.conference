# E-WOMAN Conference Registration Worker

Cloudflare Worker API for handling conference registrations with file uploads, email notifications, and WhatsApp alerts.

## Quick Start

```bash
# Install dependencies
npm install

# Test locally
npm run dev

# Deploy to production
npm run deploy
```

## Required Environment Variables

Set these using `npx wrangler secret put <NAME>`:

- `RESEND_API_KEY` - Resend email API key
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_WHATSAPP_FROM` - Twilio WhatsApp number (e.g., `whatsapp:+14155238886`)

Public variables (set in `wrangler.toml`):
- `SITE_ORIGIN` - Frontend domain
- `ADMIN_EMAIL` - Admin notification email
- `FROM_EMAIL` - Sender email address
- `WHATSAPP_TO` - WhatsApp notification number

## Endpoint

**POST /register**

Accepts `multipart/form-data` with:
- `fullName` (required)
- `email` (required)
- `phone` (required)
- `country` (required)
- `paymentMethod` (required): "MTN" or "Orange"
- `transactionId` (required)
- `proof` (required): File upload (JPG/PNG/PDF, max 10MB)
- `notes` (optional)
- `ticketType` (optional): defaults to "General"

Returns JSON:
```json
{
  "ok": true,
  "message": "Registration received successfully"
}
```

## Features

- ✅ File upload validation (type, size)
- ✅ R2 storage with metadata
- ✅ Admin email with attachment or signed URL
- ✅ User confirmation email
- ✅ WhatsApp alert via Twilio
- ✅ Rate limiting (3 requests/hour per IP)
- ✅ CORS protection
- ✅ Input sanitization

## Documentation

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup and deployment instructions.
