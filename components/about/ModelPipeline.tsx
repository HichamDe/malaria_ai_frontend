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
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Parasite Stages</h2>
        <p className="text-lg text-muted-foreground">
          The staging model classifies the four major stages of the Plasmodium
          life cycle in infected red blood cells.
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
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Infection classifier:</span> ResNet50
          </p>
          <p>
            <span className="font-semibold text-foreground">Segmentation:</span> YOLOv8 (optional) or OpenCV stain mask
          </p>
          <p>
            <span className="font-semibold text-foreground">Stage classifier:</span> EfficientNet-B0
          </p>
          <p>
            <span className="font-semibold text-foreground">Framework:</span> PyTorch / TorchVision
          </p>
          <p>
            <span className="font-semibold text-foreground">Serving:</span> FastAPI, CPU inference
          </p>
          <p>
            <span className="font-semibold text-foreground">Input:</span> single-cell thin-smear crop
          </p>
        </div>
      </div>
    </section>
  )
}
