# Majestic Fragrance — Luxury E-Commerce Website

A premium, fully responsive Next.js website for Majestic Fragrance, built
with WhatsApp-based ordering, a password-protected admin dashboard, and
optional Firebase integration for order/visitor logging.

---

## ✅ What's included

- **Homepage** — hero, best sellers, categories, combo packages, new
  arrivals, reviews, why-choose-us, Instagram gallery, FAQ, CTA
- **Shop page** — filterable/sortable product grid (category, gender,
  best sellers, new arrivals, price, rating)
- **Product detail pages** — gallery with zoom, fragrance notes,
  longevity/projection indicators, related products, SEO product schema
- **Combo Packages page** — Basic (10%), Standard (12%), Premium (15%)
- **About page**
- **WhatsApp ordering** — every "Order" button opens WhatsApp with a
  prefilled message (product, price, quantity) to **+234 903 492 7863**
- **Admin Dashboard** — hidden behind triple-clicking the copyright text
  in the footer, password-protected (default password: `majestic`)
- **SEO** — sitemap.xml, robots.txt, OpenGraph tags, product schema
- **Self-hosted fonts** (Cormorant Garamond + Manrope) — no external
  Google Fonts network call, so builds never fail due to font fetching
- **Firebase-ready** (optional) — order logging, newsletter signups,
  WhatsApp click tracking, and visitor stats, all completely optional

---

## 🗂 Project Structure

```
app/                  → Pages (homepage, shop, product, combos, about, admin)
components/           → All UI components, organized by feature
data/                 → products.ts (catalog), site-config.ts (contact info,
                         WhatsApp number, admin password), testimonials.ts
lib/                  → Firebase setup, WhatsApp link builder, tracking helpers
```

---

## ✏️ How to make everyday edits (no coding experience needed)

### Change a product price or add a new product
Open `data/products.ts` in any text editor (or directly on GitHub.com —
click the file, click the pencil/edit icon, make your change, commit).
Each product looks like this:

```ts
{
  id: "p1",
  slug: "confidence-eau-de-parfum",
  name: "Confidence",
  price: 28000,        // ← change this number to update the price
  compareAtPrice: 35000, // ← the "before discount" price (optional)
  image: "https://...", // ← paste any direct image URL here
  inStock: true,         // ← change to false to mark out of stock
  ...
}
```

To add a brand-new product, copy an existing product block (including the
curly braces `{ }`), paste it at the end of the list, give it a unique
`id` and `slug`, and fill in the details.

### Change contact info, WhatsApp number, or the admin password
Open `data/site-config.ts` — every field is labeled.

### After any edit
1. Save the file
2. Commit and push to GitHub (or use GitHub's web "Commit changes" button)
3. Vercel automatically redeploys — changes go live in ~1-2 minutes

---

## 🔐 Admin Dashboard

- Go to the website, scroll to the footer, and click the copyright line
  **three times quickly** (within 2 seconds)
- Enter the password: `majestic` (change it any time in
  `data/site-config.ts` → `adminPassword`)
- The dashboard shows orders, WhatsApp clicks, newsletter signups, and
  visitor stats — **once Firebase is connected** (see below). Without
  Firebase, it clearly tells you it's "not connected yet" rather than
  showing broken or fake data.

---

## 🔥 Connecting Firebase (optional, free)

The site works perfectly without this step. Connecting Firebase simply
turns on order/visitor/newsletter logging for the admin dashboard.

1. Go to **https://console.firebase.google.com** and create a free
   project (the free "Spark" plan needs no credit card)
2. In your project, go to **Build → Firestore Database → Create database**
   (start in test mode)
3. Go to **Project Settings (gear icon) → General**, scroll to "Your apps",
   click the **Web** icon (`</>`) to register a web app
4. Copy the config values shown (apiKey, authDomain, projectId, etc.)
5. In your Vercel project: **Settings → Environment Variables**, add each
   value from `.env.example` (e.g. `NEXT_PUBLIC_FIREBASE_API_KEY`)
6. Redeploy (Vercel → Deployments → click "..." → Redeploy)

That's it — orders, WhatsApp clicks, and newsletter signups will start
appearing in the admin dashboard automatically.

---

## 🚀 Deploying to Vercel

### Option A — Deploy via GitHub (recommended)

1. Create a free account at **https://github.com** if you don't have one
2. Create a new repository (e.g. `majestic-fragrance`)
3. Upload this entire project folder to that repository:
   - Easiest way: on the repository page, click **"Add file" → "Upload
     files"**, then drag in all the files/folders from this project
   - Or, if you're comfortable with git:
     ```
     cd majestic-fragrance
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/majestic-fragrance.git
     git push -u origin main
     ```
4. Go to **https://vercel.com** and sign up/log in (you can sign in
   directly with your GitHub account)
5. Click **"Add New..." → "Project"**
6. Select your `majestic-fragrance` repository and click **Import**
7. Vercel auto-detects Next.js — leave all settings as default
8. (Optional) Add Firebase environment variables here if you have them
   ready — see the Firebase section above
9. Click **Deploy**
10. Wait 1-2 minutes — you'll get a live URL like
    `majestic-fragrance.vercel.app`

**From now on:** any time you edit a file on GitHub (like updating a
product price) and commit the change, Vercel automatically rebuilds and
redeploys the site within a couple of minutes. No further manual steps.

### Option B — Deploy via Vercel CLI (for developers)

```bash
npm install -g vercel
cd majestic-fragrance
vercel
```

Follow the prompts. For production deployment:

```bash
vercel --prod
```

---

## 🌐 Custom Domain

Once deployed, go to your Vercel project → **Settings → Domains** → add
your domain (e.g. `majesticfragrance.com`) and follow Vercel's instructions
to point your domain's DNS to Vercel. Vercel issues a free SSL certificate
automatically.

---

## 🛠 Local Development (for developers)

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. To test a production build locally:

```bash
npm run build
npm run start
```

---

## 📋 Verified Before Delivery

- ✅ `npm run build` completes with **zero errors and zero warnings**
- ✅ `npx tsc --noEmit` (strict TypeScript check) passes clean
- ✅ All 20 routes generate successfully, including all 8 product pages
  pre-rendered as static HTML
- ✅ Fonts are self-hosted (no Google Fonts network dependency — immune
    to known Next.js 16.2.x Google Fonts build issues)
- ✅ WhatsApp number, product data, and combo pricing confirmed correctly
  embedded in the generated HTML output
- ✅ `/admin` is excluded from search engine indexing via `robots.txt`

---

## 📞 Project Contacts (as configured in `data/site-config.ts`)

- **WhatsApp:** +234 903 492 7863
- **Instagram:** @fragrancemajestic
- **Email:** afolabioluwaseunbeloved@gmail.com
- **Location:** FUTA, Gaga 340110, Ondo, Nigeria

---

## 🆕 Version 2 — Checkout, Order Tracking & Reviews

This version adds a full online ordering flow on top of the original
WhatsApp-only site.

### What's new

- **Shopping cart** — "Add to Cart" is now the primary action on product
  cards and product pages. The cart persists in the browser (localStorage)
  so it survives a page refresh.
- **Checkout (`/checkout`)** — customer reviews their cart, enters delivery
  details, sees your bank transfer details, and clicks **"I've Made
  Transfer"**. This creates a trackable order with a unique reference like
  `MF-2026-0001`.
- **Order tracking (`/track`)** — customer enters their order reference to
  see live status: Pending Verification → Payment Confirmed → Processing
  → Out for Delivery → Delivered. If they leave and come back, the site
  remembers their last reference automatically.
- **WhatsApp — now secondary** — the floating WhatsApp button and
  "Order on WhatsApp" buttons are smaller and more muted, since checkout
  is now the primary path. Customers can still order directly via
  WhatsApp, or send their order reference there after checking out.
- **Admin order management** — in the admin dashboard, every order shows
  up, with the ones awaiting payment verification flagged at the top.
  Click an order to see full details, and:
  - Update its status using the dropdown (this instantly updates what
    the customer sees on `/track`)
  - Click **"Send Confirmation Email"** — this opens your own email app
    with a pre-filled message addressed to the customer. You review and
    hit send yourself (no automated emails are sent).
- **Customer reviews** — every product page now has a "Write a Review"
  button. Reviews post immediately and show under the product.

### Important: this needs Firebase to actually work

Cart and checkout UI work without Firebase, but **orders won't be
saved or trackable, and reviews won't be stored**, until you connect
Firebase (see the Firebase section above). Until then, customers will
see a message asking them to also confirm their order on WhatsApp as a
backup, so nothing gets missed.

### Update your bank details

Open `data/site-config.ts` and find this block:

```ts
bankDetails: {
  bankName: "Your Bank Name Here",
  accountNumber: "0000000000",
  accountName: "Majestic Fragrance",
},
```

Replace these three values with your real bank details, then commit and
push — this is the only step needed to start accepting real transfers
through checkout. The same file already holds your WhatsApp number, email,
and admin password, so all your settings live in one place.
