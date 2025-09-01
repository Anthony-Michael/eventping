/**
 * Purpose: Minimal shell layout wrapping routed pages with a header and outlet.
 * Inputs: React Router Outlet children
 * Outputs: Page frame with navigation
 * Assumptions: Tailwind available; Header handles navigation
 * Side effects: none
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../shared/Header.js';

export function AppLayout(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
