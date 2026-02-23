# E-WOMAN Conference Registration System - Deployment Guide

This guide covers the complete deployment of the custom registration system for E-WOMAN Conference 2026.

---

## 📦 System Architecture

**Frontend:** Vite/React static site → Cloudflare Pages
**Backend:** Cloudflare Worker → `api.e-womanconference.online`
**Storage:** Cloudflare R2 (private bucket for payment proofs)
**Email:** Resend API
**WhatsApp:** Twilio WhatsApp API

---

## 🔧 Prerequisites

1. **Cloudflare Account** (free tier is sufficient)
2. **Resend Account** (free tier: 100 emails/day)
3. **Twilio Account** (with WhatsApp enabled)
4. **Node.js** v18+ and npm
5. **Wrangler CLI** (Cloudflare's deployment tool)

---

## Part 1: Setup R2 Bucket (Storage)

### Step 1: Create R2 Bucket

```bash
# Login to Cloudflare
npx wrangler login

# Create production bucket
npx wrangler r2 bucket create ewoman-registrations

# Create preview bucket (for testing)
npx wrangler r2 bucket create ewoman-registrations-preview
```

**Important:** R2 buckets are **private by default** (good for security).

### Step 2: Verify Bucket Creation

```bash
npx wrangler r2 bucket list
```

You should see both buckets listed.

---

## Part 2: Setup Email (Resend)

### Step 1: Sign up for Resend

1. Go to https://resend.com
2. Create a free account
3. Verify your email address

### Step 2: Add Your Domain

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter: `e-womanconference.online`
4. Follow DNS verification steps:
   - Add the provided TXT, MX, and DKIM records to your domain's DNS

### Step 3: Create API Key

1. Go to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Name: `E-WOMAN Registration API`
4. Permission: **Sending access**
5. Copy the API key (starts with `re_...`)
6. **Save it securely** - you'll need it later

### Step 4: Verify Sender Email

You can send from any email at your domain once verified:
- `noreply@e-womanconference.online` (automated emails)
- `admin@e-womanconference.online` (admin notifications)

---

## Part 3: Setup WhatsApp (Twilio)

### Step 1: Sign up for Twilio

1. Go to https://www.twilio.com
2. Create a free trial account (includes WhatsApp sandbox)
3. Verify your phone number

### Step 2: Enable WhatsApp Sandbox

1. In Twilio Console, go to **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Follow instructions to join the sandbox:
   - Send `join <your-code>` to the Twilio WhatsApp number
   - From your phone: **+237 6 97 31 77 37**

### Step 3: Get Credentials

1. Go to **Account** → **API Keys & Tokens**
2. Copy these values:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click "view" to reveal)
3. Note your **WhatsApp Sandbox Number** (e.g., `whatsapp:+14155238886`)

### Step 4: Production WhatsApp (Optional)

For production, you need:
- A Twilio WhatsApp Business Number (paid)
- Submit your WhatsApp template for approval
- For now, sandbox works for testing

---

## Part 4: Deploy Cloudflare Worker

### Step 1: Install Dependencies

```bash
cd worker
npm install
```

### Step 2: Set Environment Secrets

```bash
# Resend API Key
npx wrangler secret put RESEND_API_KEY
# Paste your Resend API key when prompted

# Twilio Account SID
npx wrangler secret put TWILIO_ACCOUNT_SID
# Paste your Twilio Account SID

# Twilio Auth Token
npx wrangler secret put TWILIO_AUTH_TOKEN
# Paste your Twilio Auth Token

# Twilio WhatsApp From Number
npx wrangler secret put TWILIO_WHATSAPP_FROM
# Example: whatsapp:+14155238886
```

**Note:** Secrets are encrypted and never exposed in code or logs.

### Step 3: Update wrangler.toml (if needed)

Edit `worker/wrangler.toml` to ensure:

```toml
[vars]
SITE_ORIGIN = "https://www.e-womanconference.online"
ADMIN_EMAIL = "admin@e-womanconference.online"
FROM_EMAIL = "noreply@e-womanconference.online"
WHATSAPP_TO = "whatsapp:+237697317737"
```

### Step 4: Test Locally

```bash
cd worker
npm run dev
```

This starts a local server at `http://localhost:8787`

**Test with curl:**

```bash
curl -X POST http://localhost:8787/register \
  -F "fullName=Test User" \
  -F "email=test@example.com" \
  -F "phone=+237612345678" \
  -F "country=Cameroon" \
  -F "paymentMethod=MTN" \
  -F "transactionId=TEST123456" \
  -F "proof=@/path/to/test-image.jpg"
```

**Check for:**
- ✅ Email sent to admin
- ✅ Email sent to user
- ✅ WhatsApp message received
- ✅ File uploaded to R2

### Step 5: Deploy to Production

```bash
cd worker
npm run deploy
```

You'll get a URL like: `https://ewoman-registration-api.YOUR-SUBDOMAIN.workers.dev`

### Step 6: Add Custom Domain

1. Go to Cloudflare Dashboard → **Workers & Pages**
2. Click your worker: `ewoman-registration-api`
3. Go to **Settings** → **Domains & Routes**
4. Click **Add Custom Domain**
5. Enter: `api.e-womanconference.online`
6. Click **Add Domain**

Cloudflare will automatically:
- Create DNS records
- Issue SSL certificate
- Route traffic to your worker

**Final API URL:** `https://api.e-womanconference.online/register`

---

## Part 5: Deploy Frontend

### Step 1: Build Frontend

```bash
# From project root
npm run build
```

This creates the `dist/` folder.

### Step 2: Deploy to Cloudflare Pages

**Option A: Cloudflare Dashboard**

1. Go to **Pages** in Cloudflare Dashboard
2. Click **Create a project**
3. Connect your Git repository (GitHub/GitLab)
4. Configure build:
   - Build command: `npm run build`
   - Build output: `dist`
5. Click **Deploy**

**Option B: Wrangler CLI**

```bash
npx wrangler pages deploy dist --project-name ewoman-conference
```

### Step 3: Add Custom Domain

1. In Cloudflare Pages project settings
2. Go to **Custom domains**
3. Add: `www.e-womanconference.online`
4. Cloudflare handles SSL automatically

---

## Part 6: Testing & Verification

### Test Checklist

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open `https://www.e-womanconference.online/register` | Form loads with 3 steps |
| 2 | Fill Step 1 (Personal Info) | Can proceed to Step 2 |
| 3 | Fill Step 2 (Payment Info) | Can proceed to Step 3 |
| 4 | Upload a valid JPG/PNG/PDF | File accepted, no error |
| 5 | Try uploading 15MB file | Error: "File too large" |
| 6 | Try uploading .exe file | Error: "Invalid file type" |
| 7 | Submit form with all fields | Success screen appears |
| 8 | Check admin email | Email received with attachment/link |
| 9 | Check user email | Confirmation email received |
| 10 | Check WhatsApp (+237 6 97 31 77 37) | Alert received |
| 11 | Submit again from same IP | Works (within rate limit) |
| 12 | Submit 4th time in 1 hour | Error: "Too many requests" |

---

## Part 7: Monitoring & Logs

### View Worker Logs

```bash
cd worker
npm run tail
```

This shows real-time logs from your worker.

### Check R2 Storage

```bash
npx wrangler r2 object list ewoman-registrations --prefix registrations/
```

### Resend Dashboard

Check email delivery status at: https://resend.com/emails

### Twilio Dashboard

Check WhatsApp message status at: https://console.twilio.com/monitor/logs

---

## 🔐 Security Checklist

- ✅ R2 bucket is private (not public)
- ✅ CORS only allows your domain
- ✅ Rate limiting enabled (3 requests/hour per IP)
- ✅ File type validation (server-side)
- ✅ File size validation (10MB max)
- ✅ All inputs sanitized
- ✅ Secrets stored in Cloudflare (encrypted)
- ✅ HTTPS enforced on all endpoints
- ✅ Email attachments only for files <9MB
- ✅ Signed URLs expire in 48 hours

---

## 🛠 Troubleshooting

### Issue: CORS errors in browser

**Solution:** Ensure `SITE_ORIGIN` in `wrangler.toml` matches your frontend domain exactly:
```toml
SITE_ORIGIN = "https://www.e-womanconference.online"
```

### Issue: Emails not sending

**Checklist:**
1. Verify Resend domain DNS records
2. Check Resend API key is correct: `npx wrangler secret list`
3. Check Resend dashboard for error logs
4. Ensure `FROM_EMAIL` uses verified domain

### Issue: WhatsApp not sending

**Checklist:**
1. Ensure you joined Twilio sandbox (send `join <code>`)
2. Verify `WHATSAPP_TO` format: `whatsapp:+237697317737`
3. Check Twilio credentials are correct
4. For production, upgrade to Twilio WhatsApp Business

### Issue: File upload fails

**Checklist:**
1. Verify R2 bucket exists: `npx wrangler r2 bucket list`
2. Check R2 binding in `wrangler.toml`
3. Ensure file is <10MB and correct type (JPG/PNG/PDF)
4. Check worker logs: `npm run tail`

### Issue: Rate limit too aggressive

**Solution:** Edit `worker/index.ts`:
```typescript
const RATE_LIMIT_MAX_REQUESTS = 5; // Increase from 3 to 5
```

Then redeploy: `npm run deploy`

---

## 💰 Cost Estimates (Free Tier)

| Service | Free Tier | Expected Usage | Cost |
|---------|-----------|----------------|------|
| **Cloudflare Workers** | 100,000 requests/day | ~500 registrations/month | $0 |
| **Cloudflare R2** | 10GB storage, 1M reads | ~500 files (5GB) | $0 |
| **Cloudflare Pages** | Unlimited bandwidth | Static hosting | $0 |
| **Resend** | 100 emails/day | ~1000 emails/month | $0 |
| **Twilio (Sandbox)** | Limited messages | Testing only | $0 |
| **Twilio (Production)** | $0.005/message | ~500 messages/month | ~$2.50 |

**Total Monthly Cost (Production):** ~$2.50 USD

---

## 📞 Support & Contact

**E-WOMAN Conference 2026**
- WhatsApp: +237 6 97 31 77 37
- Email: admin@e-womanconference.online

**Technical Issues:**
- Cloudflare Support: https://support.cloudflare.com
- Resend Support: https://resend.com/support
- Twilio Support: https://support.twilio.com

---

## 🔄 Updates & Maintenance

### To update the Worker:

```bash
cd worker
# Edit index.ts
npm run deploy
```

### To update the Frontend:

```bash
npm run build
npx wrangler pages deploy dist --project-name ewoman-conference
```

### To backup R2 data:

```bash
npx wrangler r2 object list ewoman-registrations > backup-$(date +%Y%m%d).txt
```

---

## ✅ Deployment Complete!

Your registration system is now live at:
- **Frontend:** https://www.e-womanconference.online/register
- **API:** https://api.e-womanconference.online/register

Test thoroughly before announcing to attendees!
