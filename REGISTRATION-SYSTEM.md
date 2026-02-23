# E-WOMAN Conference 2026 - Custom Registration System

## 🎯 System Overview

Complete serverless registration system replacing Google Forms with custom solution.

**Live URLs:**
- Frontend: `https://www.e-womanconference.online/register`
- API: `https://api.e-womanconference.online/register`

---

## 📋 What Was Built

### Frontend (`/src/pages/Register.tsx`)

**Multi-step registration form with:**
- ✅ Step 1: Personal Information (Name, Email, Phone, Country)
- ✅ Step 2: Payment Information (Method, Transaction ID, Proof Upload)
- ✅ Step 3: Review & Confirmation
- ✅ File upload with validation (JPG/PNG/PDF, max 10MB)
- ✅ Real-time form validation
- ✅ Animated success state
- ✅ Error handling with user-friendly messages
- ✅ Branded design (pink gradient, white card)
- ✅ Fully responsive (mobile, tablet, desktop)

**Tech Stack:**
- React with TypeScript
- Tailwind CSS for styling
- Lucide React icons
- FormData API for file uploads

### Backend (`/worker/index.ts`)

**Cloudflare Worker with:**
- ✅ Form data validation (required fields, email format)
- ✅ File validation (MIME type, size limit)
- ✅ R2 storage (private bucket, with metadata)
- ✅ Rate limiting (3 requests/hour per IP)
- ✅ CORS protection (allows only your domain)
- ✅ Admin email notification (with attachment or signed URL)
- ✅ User confirmation email (branded HTML)
- ✅ WhatsApp alert via Twilio (+237 6 97 31 77 37)
- ✅ Error handling and logging
- ✅ Input sanitization

**Tech Stack:**
- Cloudflare Workers (serverless)
- Cloudflare R2 (object storage)
- Resend API (email delivery)
- Twilio WhatsApp API (instant notifications)

---

## 📂 Project Structure

```
ewomen.conference/
├── src/
│   └── pages/
│       └── Register.tsx          ← New custom registration form
│
├── worker/                        ← NEW: Backend worker
│   ├── index.ts                   ← Worker code
│   ├── wrangler.toml              ← Cloudflare configuration
│   ├── package.json               ← Worker dependencies
│   ├── tsconfig.json              ← TypeScript config
│   ├── DEPLOYMENT.md              ← Complete deployment guide
│   └── README.md                  ← Worker documentation
│
├── public/
│   ├── images/
│   └── content.json               ← Site content (includes new phone)
│
└── dist/                          ← Built frontend (deploy to Pages)
```

---

## 🔐 Security Features

| Feature | Implementation |
|---------|----------------|
| **Rate Limiting** | Max 3 registrations per IP per hour |
| **File Validation** | Server-side MIME type + size checks |
| **CORS Protection** | Only allows requests from your domain |
| **Private Storage** | R2 bucket not publicly accessible |
| **Input Sanitization** | All user inputs cleaned server-side |
| **Signed URLs** | Large files get 48-hour expiring links |
| **HTTPS Only** | All endpoints enforce SSL/TLS |
| **Secret Management** | API keys stored in Cloudflare (encrypted) |

---

## 📧 Email Templates

### Admin Notification

**Subject:** `New E-WOMAN Registration — [Full Name] (MTN/Orange)`

**Contains:**
- Full registration details table
- Timestamp and IP address
- Payment method and transaction ID
- Proof of payment (attached if <9MB, link if larger)
- Stored R2 key for reference

### User Confirmation

**Subject:** `Your E-WOMAN Conference 2026 Registration`

**Contains:**
- Personalized greeting
- Confirmation message
- Event details (date, location, fee)
- Contact information (WhatsApp, Email)
- Professional branding

### WhatsApp Alert

**Sent to:** +237 6 97 31 77 37

**Format:**
```
🎉 New E-WOMAN Registration

Name: [Full Name]
Phone: [Phone]
Country: [Country]
Payment: [MTN/Orange]
Ref: [Transaction ID]
```

---

## 🚀 Deployment Steps

### Frontend (Cloudflare Pages)

```bash
# Build
npm run build

# Deploy
npx wrangler pages deploy dist --project-name ewoman-conference
```

### Backend (Cloudflare Worker)

```bash
cd worker

# Install dependencies
npm install

# Set secrets
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TWILIO_ACCOUNT_SID
npx wrangler secret put TWILIO_AUTH_TOKEN
npx wrangler secret put TWILIO_WHATSAPP_FROM

# Deploy
npm run deploy

# Add custom domain: api.e-womanconference.online
```

**Full instructions:** See `worker/DEPLOYMENT.md`

---

## 🧪 Testing Checklist

### Local Testing

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start worker
cd worker && npm run dev
```

Update frontend API URL temporarily to `http://localhost:8787` for testing.

### Production Testing

| Test | Expected Result |
|------|-----------------|
| Load form | Shows step 1 with proper styling |
| Invalid email | Shows error message |
| File too large | Shows "File too large" error |
| Wrong file type | Shows "Invalid file type" error |
| Valid submission | Shows success screen |
| Admin email | Receives notification with proof |
| User email | Receives confirmation |
| WhatsApp | Alert sent to +237 6 97 31 77 37 |
| Rate limit | 4th submission in 1 hour blocked |

---

## 🔧 Configuration

### Environment Variables (Worker)

**Secrets** (via `wrangler secret put`):
- `RESEND_API_KEY` - From resend.com
- `TWILIO_ACCOUNT_SID` - From twilio.com
- `TWILIO_AUTH_TOKEN` - From twilio.com
- `TWILIO_WHATSAPP_FROM` - Twilio WhatsApp number

**Public** (in `wrangler.toml`):
- `SITE_ORIGIN` = `https://www.e-womanconference.online`
- `ADMIN_EMAIL` = `admin@e-womanconference.online`
- `FROM_EMAIL` = `noreply@e-womanconference.online`
- `WHATSAPP_TO` = `whatsapp:+237697317737`

### Frontend API Endpoint

Update in `Register.tsx` (line ~164):
```typescript
const response = await fetch("https://api.e-womanconference.online/register", {
  method: "POST",
  body: formPayload,
});
```

---

## 📊 Monitoring

### View Worker Logs

```bash
cd worker
npm run tail
```

### Check R2 Files

```bash
npx wrangler r2 object list ewoman-registrations --prefix registrations/
```

### Email Delivery

Dashboard: https://resend.com/emails

### WhatsApp Messages

Dashboard: https://console.twilio.com/monitor/logs

---

## 💡 Key Features

1. **No external redirects** - Everything on your domain
2. **Professional UX** - Multi-step wizard with progress indicator
3. **Instant notifications** - Email + WhatsApp immediately
4. **Secure uploads** - Files stored privately in R2
5. **Rate limiting** - Prevents spam/abuse
6. **Mobile optimized** - Works perfectly on all devices
7. **Error handling** - Clear, helpful error messages
8. **Branding** - Matches conference visual identity
9. **Scalable** - Serverless architecture handles any load
10. **Cost effective** - Free tier covers expected traffic

---

## 🎨 Design System

**Colors:**
- Primary: `#d10a6c` (magenta)
- Accent: `#fe55aa` (magenta-light)
- Background: Pink gradient
- Card: White with shadow

**Typography:**
- Headings: Playfair Display
- Body: Outfit (system-ui fallback)

**Animations:**
- Fade-in on load
- Step transitions
- Success screen reveal
- Button hover effects

---

## 📞 Support Contacts

**Technical Issues:**
- Backend logs: `cd worker && npm run tail`
- Frontend rebuild: `npm run build`

**User Support:**
- WhatsApp: +237 6 97 31 77 37
- Email: info@e-womanconference.online

**Service Providers:**
- Cloudflare Dashboard: https://dash.cloudflare.com
- Resend Dashboard: https://resend.com
- Twilio Dashboard: https://console.twilio.com

---

## ✅ System Status

| Component | Status | URL |
|-----------|--------|-----|
| Frontend Form | ✅ Built | `/register` |
| Backend API | ✅ Ready | Needs deployment |
| R2 Storage | ⚙️ Setup Required | Create buckets |
| Email (Resend) | ⚙️ Setup Required | Add domain + API key |
| WhatsApp (Twilio) | ⚙️ Setup Required | Get credentials |

**Next Steps:**
1. Follow `worker/DEPLOYMENT.md` for complete setup
2. Test locally before production deployment
3. Deploy frontend to Cloudflare Pages
4. Deploy worker and bind custom domain
5. Test end-to-end with real submission

---

## 🎉 Benefits Over Google Forms

| Feature | Google Forms | Custom System |
|---------|--------------|---------------|
| Branding | ❌ Google branding | ✅ Full custom design |
| File Storage | ❌ Google Drive | ✅ Private R2 bucket |
| Notifications | ❌ Email only | ✅ Email + WhatsApp |
| User Experience | ❌ Generic | ✅ Multi-step wizard |
| Mobile | ⚠️ Basic | ✅ Optimized |
| Security | ⚠️ Limited control | ✅ Full control |
| Rate Limiting | ❌ None | ✅ Built-in |
| Cost | ✅ Free | ✅ Free (99% cases) |
| Domain | ❌ forms.google.com | ✅ Your domain |
| Automation | ❌ Manual | ✅ Instant processing |

---

## 🔄 Future Enhancements (Optional)

- [ ] Admin dashboard to view all registrations
- [ ] Export registrations to CSV
- [ ] Payment verification webhook
- [ ] QR code ticket generation
- [ ] SMS confirmation (in addition to WhatsApp)
- [ ] Multi-language support (English/French)
- [ ] Google Calendar integration
- [ ] Automated reminder emails before event

---

**System designed and implemented by Claude Code**
**E-WOMAN Conference 2026 — Celebrating the Elevated Woman**
