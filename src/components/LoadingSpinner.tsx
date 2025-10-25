/**
 * LoadingSpinner - Animated loading indicator
 * Story 2.6: Error Handling and User Feedback
 */

interface LoadingSpinnerProps {
  text?: string;
}

/**
 * Animated spinner with pastel horror styling
 *
 * Features:
 * - Rotating circle animation with horror-coral border
 * - Customizable loading text (default: "Generating your vibe...")
 * - Accessible with aria-live announcement
 */
export function LoadingSpinner({ text = 'Generating your vibe...' }: LoadingSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-8"
      role="status"
      aria-live="polite"
    >
      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-horror-slate rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-horror-coral rounded-full animate-spin" />
      </div>

      {/* Loading text */}
      <p className="text-horror-shadow font-medium">
        {text}
      </p>

      {/* Screen reader text */}
      <span className="sr-only">Loading, please wait</span>
    </div>
  );
}
