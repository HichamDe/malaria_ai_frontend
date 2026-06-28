'use client'

import { Upload, Zap, Brain, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: 'Upload Image',
    description: 'Upload a blood smear microscopy image in JPG, PNG, or WebP format.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Preprocessing',
    description: 'The system processes and normalizes the image for optimal analysis.',
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'AI Analysis',
    description: 'Advanced neural networks identify parasite stages and characteristics.',
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Results',
    description: 'Get detailed analysis with confidence scores and clinical recommendations.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <p className="text-lg text-muted-foreground">
          Our AI-powered system identifies malaria parasites in 4 simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 left-[calc(50%+32px)] right-[calc(-50%-32px)] h-0.5 bg-gradient-to-r from-primary to-accent"></div>
            )}

            {/* Step Card */}
            <div className="relative space-y-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
