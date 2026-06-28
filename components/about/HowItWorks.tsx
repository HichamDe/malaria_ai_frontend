'use client'

const steps = [
  {
    title: 'Upload',
    description: 'Submit a single-cell thin-smear crop (JPG, PNG or WebP).',
  },
  {
    title: 'Screen',
    description: 'A ResNet50 classifier flags the cell as healthy or infected.',
  },
  {
    title: 'Localize & stage',
    description:
      'Infected cells are segmented (box + mask), then the parasite is staged with EfficientNet-B0.',
  },
  {
    title: 'Report',
    description:
      'Confidences are returned as JSON alongside an annotated overlay for review.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">How it works</h2>
        <p className="text-lg text-muted-foreground">
          From a cell crop to a staged result in four steps.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-px rounded-xl border border-border bg-border overflow-hidden">
        {steps.map((step, index) => (
          <div key={index} className="bg-card p-6 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-sm font-semibold text-primary">
              {index + 1}
            </div>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
