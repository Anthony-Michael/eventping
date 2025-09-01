/**
 * Purpose: Simple header with navigation links.
 * Inputs: none
 * Outputs: navigation bar
 * Assumptions: React Router is present
 * Side effects: none
 */

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export function Header(): React.JSX.Element {
  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link to="/" className="font-semibold">
          EventPing
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/app"
            className={({ isActive }) =>
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }
          >
            App
          </NavLink>
          <NavLink
            to="/dev-info"
            className={({ isActive }) =>
              isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }
          >
            Dev Info
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
