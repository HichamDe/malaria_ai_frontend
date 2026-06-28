'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Microscope } from 'lucide-react'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="neural-network absolute inset-0"></div>
      </div>

      <div className="mx-auto max-w-6xl w-full">
        <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <Microscope className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Detection</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Detect Malaria <span className="gradient-text">Parasite Stages</span> Instantly
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Advanced AI technology identifies malaria parasites at every stage. Fast, accurate, and accessible diagnostic support for medical professionals.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2">
                  Start Detection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">98%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">&lt;1s</div>
                <p className="text-sm text-muted-foreground">Detection Time</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4</div>
                <p className="text-sm text-muted-foreground">Parasite Stages</p>
              </div>
            </div>
          </div>

          {/* Right Visual - Image Placeholder with glass effect */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 rounded-2xl border border-primary/20 glass-dark flex items-center justify-center">
              <div className="text-center">
                <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent/50 opacity-50 animate-pulse"></div>
                <p className="text-primary font-semibold">Microscopy Image Analysis</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-8 right-8 h-16 w-16 rounded-lg bg-white/10 backdrop-blur border border-white/20 animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute bottom-12 left-8 h-12 w-12 rounded-full bg-primary/20 backdrop-blur border border-primary/30 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
