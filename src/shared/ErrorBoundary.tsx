/**
 * Purpose: Global error boundary to catch render errors.
 * Inputs: children (ReactNode)
 * Outputs: fallback UI and logged error
 * Assumptions: logger available; errors safe to log
 * Side effects: logs errors via src/lib/log
 */

import React from 'react';
import { log } from '../lib/log.js';

type Props = { children?: React.ReactNode };

type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: unknown, errorInfo: unknown): void {
    log.error('React render error', {
      error: String(error),
      info: JSON.stringify(errorInfo) as unknown as string,
    });
  }

  override render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl p-6 text-center">
          <h1 className="mb-2 text-2xl font-semibold">Something went wrong.</h1>
          <p className="text-gray-600">Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
