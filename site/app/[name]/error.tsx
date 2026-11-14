'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Product page error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-fd-background">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-fd-muted-foreground mb-6">We encountered an error while loading this product page.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="px-4 py-2 bg-fd-primary text-fd-primary-foreground rounded-md hover:bg-fd-primary/90">
            Try again
          </button>
          <Link href="/" className="px-4 py-2 border border-fd-border rounded-md hover:bg-fd-muted">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
