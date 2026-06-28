'use client'

import {
  AnalysisResult as AnalysisResultType,
  STAGE_INFO,
  getSeverityColor,
  getSeverityLabel,
} from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { Download, AlertCircle, CheckCircle, ShieldCheck, Bug } from 'lucide-react'

interface AnalysisResultProps {
  result: AnalysisResultType
  onReset?: () => void
}

function pct(v: number | null | undefined) {
  if (v == null) return 0
  // Accept either 0..1 (model output) or already-scaled 0..100.
  const scaled = v <= 1 ? v * 100 : v
  return Math.max(0, Math.min(100, scaled))
}

function ConfidenceBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function AnalysisResult({ result, onReset }: AnalysisResultProps) {
  const infectionPct = pct(result.infectionConfidence)
  const stagePct = pct(result.stageConfidence)
  const stageInfo = result.detectedStage
    ? STAGE_INFO[result.detectedStage as keyof typeof STAGE_INFO]
    : null

  const displayImage = result.overlayUrl || result.imageUrl

  const handleDownload = () => {
    const href = result.overlayUrl || result.imageUrl
    if (!href) return
    const a = document.createElement('a')
    a.href = href
    a.download = `malaria-overlay-${result.fileName ?? 'result'}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Infection status banner */}
      <div
        className={`p-6 rounded-xl border-2 flex items-start justify-between gap-4 ${
          result.infected
            ? 'text-red-500 bg-red-500/10 border-red-500/30'
            : 'text-green-600 bg-green-500/10 border-green-500/30'
        }`}
      >
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-80">Infection Status</p>
          <h2 className="text-3xl font-bold">
            {result.infectionLabel || (result.infected ? 'Infected' : 'Healthy')}
          </h2>
          <p className="text-sm opacity-80">
            {infectionPct.toFixed(1)}% confidence
          </p>
        </div>
        {result.infected ? (
          <Bug className="h-8 w-8 shrink-0" />
        ) : (
          <ShieldCheck className="h-8 w-8 shrink-0" />
        )}
      </div>

      {result.infected ? (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Annotated overlay image */}
          <div className="space-y-3">
            <h4 className="font-semibold">Annotated Detection</h4>
            <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30">
              {displayImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayImage}
                  alt="Annotated parasite overlay"
                  className="w-full h-auto object-contain"
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                  No overlay returned
                </div>
              )}
            </div>
            {result.detection && (
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  Segmentation backend:{' '}
                  <span className="font-medium uppercase">{result.detection.backend}</span>
                </p>
                {result.detection.box && (
                  <p>
                    Box: x={result.detection.box.x}, y={result.detection.box.y},{' '}
                    {result.detection.box.width}×{result.detection.box.height}px · area{' '}
                    {result.detection.areaPx}px²
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Stage + confidence */}
          <div className="space-y-4">
            <div
              className={`p-6 rounded-xl border-2 ${getSeverityColor(
                result.severity
              )} space-y-4`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground mb-2">
                    Detected Parasite Stage
                  </h2>
                  <h3 className="text-3xl font-bold">
                    {result.detectedStage ?? 'Not staged'}
                  </h3>
                </div>
                {result.severity === 'critical' || result.severity === 'high' ? (
                  <AlertCircle className="h-6 w-6" />
                ) : (
                  <CheckCircle className="h-6 w-6" />
                )}
              </div>
              {stageInfo && <p className="text-sm">{stageInfo.description}</p>}
              <div className="pt-4 border-t border-current/20">
                <p className="text-xs uppercase tracking-wide font-semibold opacity-75 mb-2">
                  Severity
                </p>
                <p className="text-lg font-bold">{getSeverityLabel(result.severity)}</p>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card space-y-4">
              <h4 className="font-semibold">Model Confidence</h4>
              <ConfidenceBar label="Infection (Phase 1)" value={infectionPct} />
              {result.stageConfidence != null && (
                <ConfidenceBar label="Stage (Phase 4)" value={stagePct} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h4 className="font-semibold">Uploaded Cell</h4>
            <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30">
              {displayImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayImage}
                  alt="Uploaded cell"
                  className="w-full h-auto object-contain"
                />
              ) : null}
            </div>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h4 className="font-semibold">No parasite detected</h4>
            <p className="text-sm text-muted-foreground">
              Phase 1 classified this cell as healthy, so segmentation and staging
              were skipped.
            </p>
            <ConfidenceBar label="Healthy confidence" value={infectionPct} />
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="p-6 rounded-xl border border-border bg-muted/20 space-y-4">
        <h4 className="font-semibold">Analysis Details</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Analysis Time</p>
            <p className="font-medium">{new Date(result.timestamp).toLocaleString()}</p>
          </div>
          {result.imageSize && (
            <div>
              <p className="text-muted-foreground mb-1">Image Size</p>
              <p className="font-medium">
                {result.imageSize[0]} × {result.imageSize[1]}px
              </p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground mb-1">Recommended Action</p>
            <p className="font-medium">
              {result.severity === 'critical' || result.severity === 'high'
                ? 'Urgent consultation required'
                : result.infected
                ? 'Further review recommended'
                : 'No action required'}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {displayImage && (
          <Button className="gap-2" variant="default" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download Overlay
          </Button>
        )}
        {onReset && (
          <Button variant="outline" onClick={onReset}>
            New Analysis
          </Button>
        )}
      </div>
    </div>
  )
}
