import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HowItWorks } from '@/components/about/HowItWorks'
import { ModelPipeline } from '@/components/about/ModelPipeline'
import { Disclaimer } from '@/components/about/Disclaimer'

export const metadata = {
  title: 'About — MalariaScope',
  description: 'How the MalariaScope blood-smear analysis pipeline works, the models behind it, and important medical information.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">About MalariaScope</h1>
            <p className="text-xl text-muted-foreground">
              A blood-smear analysis pipeline for malaria screening and parasite staging.
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-16 p-8 rounded-xl border border-border bg-muted/30 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Purpose</h2>
            <p className="text-muted-foreground leading-relaxed">
              Malaria diagnosis from blood-smear microscopy is labor-intensive and
              depends on trained microscopists. MalariaScope chains four dedicated
              models — infection screening, parasite localization, and life-cycle
              staging — to produce a structured, reviewable result from a single-cell
              image. It is intended to support, not replace, expert review and
              laboratory confirmation.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-16 border-b border-border pb-16">
            <HowItWorks />
          </div>

          {/* Model Pipeline */}
          <div className="mb-16 border-b border-border pb-16">
            <ModelPipeline />
          </div>

          {/* Disclaimer */}
          <div>
            <Disclaimer />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
