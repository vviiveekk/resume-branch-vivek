"use client"

interface ErrorState {
  message: string
  canRetry: boolean
}

interface ErrorPageProps {
  error: ErrorState | null
  onRetry: () => void
  onReset: () => void
}

const AlertTriangleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
    />
  </svg>
)

export function ErrorPage({ error, onRetry, onReset }: ErrorPageProps) {
  if (!error) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 text-white p-8">
      <div className="text-center max-w-2xl animate-apple-scale-in">
        <AlertTriangleIcon className="w-16 h-16 mx-auto mb-8 animate-apple-pulse" />
        <h2 className="text-4xl font-light mb-6 animate-apple-slide-up">Oops! Something went wrong</h2>
        <p className="text-xl mb-12 opacity-90 animate-apple-slide-up-delay">{error.message}</p>
        <div className="flex gap-4 justify-center">
          {error.canRetry && (
            <button
              onClick={onRetry}
              className="px-8 py-4 apple-glass border border-white/30 rounded-full text-lg font-medium apple-button-hover apple-interactive animate-apple-slide-up-delay"
            >
              Try Again
            </button>
          )}
          <button
            onClick={onReset}
            className="px-8 py-4 bg-white/10 border border-white/20 rounded-full text-lg font-medium apple-button-hover apple-interactive animate-apple-slide-up-delay"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  )
}
