/**
 * Purpose: Display local dev/debug info about Firebase environment and emulator.
 * Inputs: none
 * Outputs: read-only page content
 * Assumptions: client-side render; Firebase env present
 * Side effects: none
 */

import React from 'react';
import { isLocalEmulator } from '../lib/firebaseClient.js';
import { getEnv } from '../lib/env.js';

export function DevInfo(): React.JSX.Element {
  const emulator = isLocalEmulator();
  const env = getEnv();
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Developer Info</h1>
      <div className="grid grid-cols-1 gap-2">
        <div>
          <span className="font-medium">Emulator mode:</span> {emulator ? 'Yes' : 'No'}
        </div>
        <div>
          <span className="font-medium">Project ID:</span> {env.projectId || 'N/A'}
        </div>
        <div>
          <span className="font-medium">Firestore emulator:</span>{' '}
          {emulator ? '127.0.0.1:8085' : 'N/A'}
        </div>
      </div>
    </section>
  );
}
