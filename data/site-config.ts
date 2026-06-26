// === SITE CONFIGURATION ===
// Edit this file to update contact details, social links, and admin settings.
// After editing, commit and push to GitHub — Vercel will redeploy automatically.

export const siteConfig = {
  brandName: "Majestic Fragrance",
  tagline: "Wear Confidence. Leave a Lasting Impression.",

  // WhatsApp number orders are sent to (international format, no + or spaces for the link)
  whatsappNumber: "2349034927863",
  whatsappDisplay: "+234 903 492 7863",

  // Social
  instagram: "https://instagram.com/fragrancemajestic",
  instagramHandle: "@fragrancemajestic",

  // Contact
  email: "afolabioluwaseunbeloved@gmail.com",

  // Location
  address: "FUTA, Gaga 340110, Ondo, Nigeria",
  deliveryNote: "Delivery available around FUTA and its environs. Other locations by arrangement.",

  // Admin — change this password any time. No Firebase Auth is used for the
  // admin area; this is a simple shared password gate.
  adminPassword: "majestic",

  // Payment
  paymentMethod: "Bank transfer only. Paystack / card payment is not available at this time.",
  bankDetails: {
    bankName: "Your Bank Name Here",
    accountNumber: "0000000000",
    accountName: "Majestic Fragrance",
  },
};

export type SiteConfig = typeof siteConfig;
