/**
 * Purpose: Home page with link to the protected app shell.
 * Inputs: none
 * Outputs: page UI
 * Assumptions: Router available
 * Side effects: none
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage(): React.JSX.Element {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to EventPing</h1>
      <p className="text-gray-700">Start by exploring the app shell.</p>
      <Link
        to="/app"
        className="inline-flex items-center rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Go to App
      </Link>
    </section>
  );
}
