/**
 * Purpose: Placeholder for a protected application shell.
 * Inputs: none
 * Outputs: page UI
 * Assumptions: auth to be added later; here we show a stub
 * Side effects: none
 */

import React from 'react';

export function AppShellPage(): React.JSX.Element {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">App Shell</h1>
      <p className="text-gray-700">Protected area placeholder. Implement auth guard later.</p>
    </section>
  );
}
