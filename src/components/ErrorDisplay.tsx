/**
 * ErrorDisplay - Error message display with retry button
 * Story 2.6: Error Handling and User Feedback
 */

import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

/**
 * Error message display with retry functionality
 *
 * Features:
 * - Warning icon (⚠️) with error message
 * - Retry button with callback
 * - Pastel horror warning colors (coral/warning)
 * - Accessible with role="alert"
 */
export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div
      className="w-full max-w-2xl mx-auto p-6 rounded-lg bg-horror-coral/20 border-2 border-horror-coral space-y-4"
      role="alert"
      aria-live="assertive"
    >
      {/* Error message with icon */}
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0" aria-hidden="true">
          ⚠️
        </span>
        <p className="text-horror-charcoal font-medium leading-relaxed">
          {message}
        </p>
      </div>

      {/* Retry button */}
      <Button
        onClick={onRetry}
        className="w-full bg-horror-warning text-horror-charcoal hover:bg-horror-coral border-2 border-horror-rust shadow-md hover:shadow-lg transition-all font-semibold h-11"
      >
        Try Again
      </Button>
    </div>
  );
}
