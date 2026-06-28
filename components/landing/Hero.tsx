'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border">
      {/* Subtle clinical grid backdrop */}
      <div className="clinical-grid absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — value proposition */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Blood-smear analysis pipeline
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
              Malaria screening and staging from a{' '}
              <span className="text-primary">single-cell image</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Upload a thin-smear cell crop and the pipeline returns infection
              status, localizes the parasite with a box and mask, and classifies
              its life-cycle stage — with an annotated overlay for review.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Open Detector
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  How it works
                </Button>
              </Link>
            </div>

            {/* Honest, pipeline-grounded facts (not marketing metrics) */}
            <dl className="grid grid-cols-3 gap-6 pt-6 border-t border-border max-w-md">
              <div>
                <dt className="text-xs text-muted-foreground">Pipeline</dt>
                <dd className="text-lg font-semibold text-foreground">4 phases</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Stages</dt>
                <dd className="text-lg font-semibold text-foreground">Ring–Gam.</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Output</dt>
                <dd className="text-lg font-semibold text-foreground">Box + mask</dd>
              </div>
            </dl>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Research &amp; educational tool — not a medical diagnostic device.
            </p>
          </div>

          {/* Right — sample report preview (mirrors the real result UI) */}
          <ReportPreview />
        </div>
      </div>
    </section>
  )
}

function ReportPreview() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-destructive/70" />
          <span className="text-sm font-medium text-foreground">Analysis report</span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">cell_0427.png</span>
      </div>

      <div className="p-4 space-y-4">
        {/* Status row */}
        <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Infection status</p>
            <p className="text-lg font-semibold text-destructive">Infected</p>
          </div>
          <span className="text-sm font-semibold text-destructive">97%</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Mock overlay */}
          <div className="relative aspect-square rounded-lg border border-border bg-muted/40 overflow-hidden">
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-20 w-20 rounded-full bg-accent/15" />
            </div>
            {/* detection box */}
            <div className="absolute left-[34%] top-[32%] h-[34%] w-[34%] rounded-sm border-2 border-warning" />
            <div className="absolute left-[34%] top-[24%] rounded bg-warning px-1 text-[9px] font-semibold text-background">
              parasite
            </div>
          </div>

          {/* Stage + confidences */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Detected stage</p>
              <p className="text-base font-semibold text-foreground">Schizont</p>
            </div>
            <ConfRow label="Infection" value={97} />
            <ConfRow label="Stage" value={61} />
            <p className="text-[11px] text-muted-foreground pt-1">
              Box 50,50 · 30×30px · backend opencv
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
