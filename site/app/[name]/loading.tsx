export default function Loading() {
  return (
    <div className="min-h-screen bg-fd-background">
      <div className="border-b border-fd-border bg-fd-muted/20 animate-pulse">
        <div className="container mx-auto px-4 py-4">
          <div className="h-4 bg-fd-muted rounded w-1/3"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-fd-muted rounded-lg animate-pulse">
                <div className="w-8 h-8"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-fd-muted rounded w-2/3 animate-pulse"></div>
                <div className="h-4 bg-fd-muted rounded w-1/4 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-fd-card rounded-lg p-6 border border-fd-border mb-8 space-y-4">
            <div className="h-6 bg-fd-muted rounded w-1/3 animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 bg-fd-muted rounded animate-pulse"></div>
              <div className="h-4 bg-fd-muted rounded animate-pulse"></div>
              <div className="h-4 bg-fd-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
