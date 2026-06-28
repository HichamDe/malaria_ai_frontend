import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl border border-border bg-card px-8 py-12 md:px-12 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Analyze a blood-smear cell
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Drop in a single-cell crop and review the infection status,
                segmentation overlay and life-cycle stage in one pass.
              </p>
            </div>
            <Link href="/dashboard" className="shrink-0">
              <Button size="lg" className="gap-2 w-full md:w-auto">
                Open Detector
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
