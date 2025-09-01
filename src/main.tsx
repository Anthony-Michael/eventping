/**
 * Purpose: App bootstrap; renders React tree with Router and ErrorBoundary.
 * Inputs: DOM root, environment variables (PUBLIC_APP_URL)
 * Outputs: Mounted React app
 * Assumptions: #root exists in index.html; Tailwind CSS loaded
 * Side effects: DOM rendering
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { AppLayout } from './pages/_layout/AppLayout.js';
import { HomePage } from './pages/Home.js';
import { AppShellPage } from './pages/AppShell.js';
import { DevInfo } from './pages/DevInfo.js';
import { ErrorBoundary } from './shared/ErrorBoundary.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'app', element: <AppShellPage /> },
      { path: 'dev-info', element: <DevInfo /> },
    ],
  },
]);

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Missing #root element');
const root = createRoot(rootEl);
root.render(<RouterProvider router={router} />);
