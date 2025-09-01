/**
 * Purpose: Minimal Firestore security rules tests using the emulator.
 * Inputs: simulated auth contexts and reads/writes
 * Outputs: assertions on allow/deny
 * Assumptions: Firebase emulator running; uses @firebase/rules-unit-testing
 * Side effects: writes to emulator only
 */

import { beforeAll, afterAll, describe, it } from 'vitest';
import type { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { doc, getDoc, setDoc } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  const rules = readFileSync(resolve(process.cwd(), 'firestore.rules'), 'utf8');
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-eventping',
    firestore: { rules },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Firestore security rules', () => {
  it('allow: authed user reading docs under their own orgId', async () => {
    const ctx = testEnv.authenticatedContext('userA', { orgId: 'org1' });
    const db = ctx.firestore();
    const ref = doc(db, 'orgs/org1/members/member1');
    await testEnv.withSecurityRulesDisabled(async (ctx2) => {
      await setDoc(doc(ctx2.firestore(), 'orgs/org1/members/member1'), { role: 'admin' });
    });
    await assertSucceeds(getDoc(ref));
  });

  it("deny: authed user reading other org's docs", async () => {
    const ctx = testEnv.authenticatedContext('userA', { orgId: 'org1' });
    const db = ctx.firestore();
    const ref = doc(db, 'orgs/org2/members/member1');
    await testEnv.withSecurityRulesDisabled(async (ctx2) => {
      await setDoc(doc(ctx2.firestore(), 'orgs/org2/members/member1'), { role: 'viewer' });
    });
    await assertFails(getDoc(ref));
  });

  it('deny: client writes to protected collections', async () => {
    const ctx = testEnv.authenticatedContext('userA', { orgId: 'org1' });
    const db = ctx.firestore();
    await assertFails(setDoc(doc(db, 'orgs/org1/members/member2'), { role: 'editor' }));
    await assertFails(setDoc(doc(db, 'orgs/org1/events/event1'), { name: 'x' }));
    await assertFails(setDoc(doc(db, 'orgs/org1/sends/send1'), { ok: true }));
  });

  it('allow: reading events where visibility == "public"', async () => {
    const ctx = testEnv.unauthenticatedContext();
    const db = ctx.firestore();
    await testEnv.withSecurityRulesDisabled(async (ctx2) => {
      const adb = ctx2.firestore();
      await setDoc(doc(adb, 'events/pub1'), { visibility: 'public', startAt: 1 });
      await setDoc(doc(adb, 'events/private1'), { visibility: 'private', startAt: 2 });
    });
    await assertSucceeds(getDoc(doc(db, 'events/pub1')));
    await assertFails(getDoc(doc(db, 'events/private1')));
  });
});
