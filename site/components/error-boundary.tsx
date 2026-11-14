'use client'

import { useEffect } from 'react'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // In production, send to monitoring service (e.g., Sentry, Datadog)
    // Do NOT use console.error in production to avoid exposing sensitive details
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to monitoring service
      // Example: Sentry.captureException(error)
      // For now, silently handle the error
    } else {
      // Full error details in development for debugging
      console.error('Error boundary caught:', error)
    }
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div role="alert" aria-live="assertive" className="rounded-lg border border-fd-border bg-fd-card p-8 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-fd-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Error icon">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-fd-foreground">Something went wrong</h2>
        <p className="text-fd-muted-foreground mb-6">We encountered an error while loading this page. Please try again.</p>
        {error.digest && <p className="text-sm text-fd-muted-foreground/60 mb-4">Error ID: {error.digest}</p>}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 font-medium transition-colors"
          >
            Try Again
          </button>
          <a href="/" className="inline-flex items-center px-6 py-3 rounded-lg border border-fd-border hover:bg-fd-accent font-medium transition-colors">
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}
