import admin from "firebase-admin";
import { getApps, getApp, initializeApp } from "firebase-admin/app";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!getApps().length) {
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  getApp(); // if already initialized, use that one
}

const adminDb = admin.firestore();
export { adminDb };
