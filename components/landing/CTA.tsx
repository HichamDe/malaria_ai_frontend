'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5"></div>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-xl p-12 md:p-16 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Ready to Transform Diagnostics</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Start Detecting Malaria Today
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of medical professionals using AI-powered malaria detection. Fast, accurate, and built for the real world.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Schedule Demo
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-sm text-muted-foreground pt-4">
            No credit card required. Start free today.
          </p>
        </div>
      </div>
    </section>
  )
}
