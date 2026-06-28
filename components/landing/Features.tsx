'use client'

import { CheckCircle, Zap, Shield, BarChart3 } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: 'High Accuracy',
    description: 'Detects malaria parasites across all lifecycle stages with 98% accuracy using advanced neural networks.',
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Lightning Fast',
    description: 'Get results in under 1 second. Real-time analysis powered by optimized AI models.',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Secure & Private',
    description: 'Your medical data is encrypted and processed with HIPAA-compliant infrastructure.',
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Detailed Analytics',
    description: 'Comprehensive reports with confidence scores, stage identification, and medical recommendations.',
  },
]

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powerful Features for <span className="gradient-text">Medical Professionals</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge AI to provide accurate, fast, and reliable malaria detection.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 p-8 rounded-xl border border-border bg-muted/30 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <p className="text-sm text-muted-foreground">Images Analyzed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <p className="text-sm text-muted-foreground">Hospitals Using</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
