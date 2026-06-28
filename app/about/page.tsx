import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HowItWorks } from '@/components/about/HowItWorks'
import { ModelPipeline } from '@/components/about/ModelPipeline'
import { Disclaimer } from '@/components/about/Disclaimer'

export const metadata = {
  title: 'About - Malaria Stage Detector',
  description: 'Learn about our AI-powered malaria detection system, how it works, and important medical information.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 space-y-4">
            <h1 className="text-5xl font-bold">About Malaria Detection</h1>
            <p className="text-xl text-muted-foreground">
              Understanding our AI-powered diagnostic support system designed for medical professionals
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-16 p-8 rounded-xl border border-border bg-muted/30 space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Malaria remains a significant public health challenge affecting millions worldwide. Our AI system is designed to support medical professionals in quickly identifying malaria parasite stages from blood smear microscopy images. By leveraging advanced neural networks trained on thousands of labeled images, we provide fast, accurate, and accessible diagnostic support that helps medical professionals make informed clinical decisions.
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
