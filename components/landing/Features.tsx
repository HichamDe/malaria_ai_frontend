import { Microscope, ScanSearch, Layers, FileImage } from 'lucide-react'

interface Phase {
  step: string
  icon: React.ReactNode
  title: string
  description: string
  model: string
}

const phases: Phase[] = [
  {
    step: '01',
    icon: <Microscope className="h-5 w-5" />,
    title: 'Infection screening',
    description:
      'Each cell crop is first classified as healthy or infected. Healthy cells short-circuit the pipeline.',
    model: 'ResNet50',
  },
  {
    step: '02',
    icon: <ScanSearch className="h-5 w-5" />,
    title: 'Parasite localization',
    description:
      'Infected cells are segmented to produce a bounding box and a binary parasite mask.',
    model: 'YOLOv8 / OpenCV stain',
  },
  {
    step: '03',
    icon: <Layers className="h-5 w-5" />,
    title: 'Life-cycle staging',
    description:
      'The cropped parasite is classified into ring, trophozoite, schizont or gametocyte.',
    model: 'EfficientNet-B0',
  },
  {
    step: '04',
    icon: <FileImage className="h-5 w-5" />,
    title: 'Annotated report',
    description:
      'Results are returned as JSON with confidences, plus an overlay PNG drawing the box, mask and labels.',
    model: 'Overlay renderer',
  },
]

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-primary mb-3">The pipeline</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Four phases, from cell image to staged result
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Inputs are single-cell thin-smear crops in the NIH cell-images format
            the models were trained on. Each phase is a dedicated model with a
            documented role.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl border border-border bg-border overflow-hidden">
          {phases.map((phase) => (
            <div
              key={phase.step}
              className="bg-card p-6 flex flex-col gap-4 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  {phase.icon}
                </span>
                <span className="text-xs font-mono text-muted-foreground">{phase.step}</span>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold">{phase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </div>
              <div className="mt-auto pt-3 border-t border-border">
                <span className="text-xs font-medium text-foreground">{phase.model}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
