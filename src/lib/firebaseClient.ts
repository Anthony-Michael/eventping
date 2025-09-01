/**
 * Purpose: Initialize Firebase client app and Firestore, connect emulator in dev.
 * Inputs: PUBLIC_* env vars via getEnv(); window location for emulator detection
 * Outputs: initialized Firebase app and Firestore db; helpers
 * Assumptions: Firebase web SDK installed; emulator host/port fixed
 * Side effects: initializes Firebase app; may connect to emulator
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore';
import { getEnv } from './env.js';

export function isLocalEmulator(): boolean {
  return typeof window !== 'undefined' && window.location.hostname === 'localhost';
}

const app: FirebaseApp = initializeApp(getEnv());
const db: Firestore = getFirestore(app);

if (isLocalEmulator()) {
  connectFirestoreEmulator(db, '127.0.0.1', 8085);
}

export { app, db };
