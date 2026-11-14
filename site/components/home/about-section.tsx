export function AboutSection() {
  return (
    <div className="border-t border-fd-border bg-fd-muted/30">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">About GS1 GPC</h2>
        <div className="prose prose-fd-default max-w-none">
          <p className="text-fd-muted-foreground mb-4">
            The GS1 Global Product Classification (GPC) is a hierarchical system that groups products into categories based on their essential characteristics.
            It provides a consistent way to classify products across industries and markets worldwide.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-lg bg-fd-card border border-fd-border">
              <h3 className="font-semibold mb-2 text-fd-foreground">Hierarchy Levels</h3>
              <ul className="space-y-2 text-sm text-fd-muted-foreground">
                <li>
                  <strong>Segment</strong> - Top-level categories (40)
                </li>
                <li>
                  <strong>Family</strong> - Related classes (400+)
                </li>
                <li>
                  <strong>Class</strong> - Related products (1,500+)
                </li>
                <li>
                  <strong>Brick</strong> - Specific types (48,000+)
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-fd-card border border-fd-border">
              <h3 className="font-semibold mb-2 text-fd-foreground">Use Cases</h3>
              <ul className="space-y-2 text-sm text-fd-muted-foreground">
                <li>E-commerce product categorization</li>
                <li>Supply chain management</li>
                <li>Inventory organization</li>
                <li>Data analytics and reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
