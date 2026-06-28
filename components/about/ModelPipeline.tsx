'use client'

import { PARASITE_STAGES, STAGE_INFO } from '@/lib/mockData'

export function ModelPipeline() {
  const stages = Object.entries(PARASITE_STAGES).map(([key, value]) => ({
    name: value,
    key,
    info: STAGE_INFO[value as keyof typeof STAGE_INFO],
  }))

  return (
    <section className="py-16 space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold">Parasite Stages</h2>
        <p className="text-lg text-muted-foreground">
          The AI model can identify all major stages of malaria parasites in the Plasmodium lifecycle
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {stages.map((stage) => (
          <div
            key={stage.key}
            className="p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg ${stage.info.color} opacity-20`}></div>
                <div>
                  <h3 className="text-xl font-semibold">{stage.name}</h3>
                  <p className="text-sm text-muted-foreground">Severity: {stage.info.severity}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{stage.info.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Technical Details */}
      <div className="p-8 rounded-xl border border-border bg-muted/30 space-y-4">
        <h3 className="font-semibold text-lg">Technical Architecture</h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Model Type:</span> Convolutional Neural Network (CNN)
          </p>
          <p>
            <span className="font-semibold text-foreground">Training Data:</span> 50,000+ labeled blood smear images
          </p>
          <p>
            <span className="font-semibold text-foreground">Accuracy:</span> 98% on validation dataset
          </p>
          <p>
            <span className="font-semibold text-foreground">Processing Time:</span> &lt;1 second per image
          </p>
          <p>
            <span className="font-semibold text-foreground">Model Framework:</span> TensorFlow/Keras with optimization
          </p>
        </div>
      </div>
    </section>
  )
}
