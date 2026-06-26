// === FIREBASE SETUP ===
// This app is "Firebase-ready" but ships with NO live project connected.
// To activate order logging + visitor tracking:
//
// 1. Create a free Firebase project at https://console.firebase.google.com
//    (the free "Spark" plan needs no credit card)
// 2. Enable Firestore Database (in test mode is fine to start)
// 3. Copy your config values into a `.env.local` file in the project root,
//    using the variable names in `.env.example`
// 4. Redeploy (push to GitHub, Vercel rebuilds automatically) — also add
//    the same env vars in your Vercel project settings so production works.
//
// Until you do this, the site works completely fine — orders simply won't
// be logged to a database, and the admin dashboard will show "Not connected".

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

if (isFirebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);

  if (typeof window !== "undefined") {
    isSupported()
      .then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      })
      .catch(() => {
        // Analytics unsupported in this environment (e.g. SSR, some browsers) — safe to ignore.
      });
  }
}

export { app, db, analytics };
