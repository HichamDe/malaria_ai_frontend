'use client'

import { AnalysisResult, getSeverityLabel } from '@/lib/mockData'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'

interface ScanHistoryProps {
  scans: AnalysisResult[]
}

export function ScanHistory({ scans }: ScanHistoryProps) {
  if (scans.length === 0) {
    return (
      <div className="p-8 rounded-xl border border-border bg-muted/30 text-center space-y-4">
        <p className="text-muted-foreground">No scans yet. Upload an image to get started.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="font-semibold text-lg">Recent Scans</h3>
        <p className="text-sm text-muted-foreground">View your analysis history</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                File Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                Detected Stage
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                Severity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => {
              const conf = scan.detectedStage
                ? scan.stageConfidence ?? 0
                : scan.infectionConfidence ?? 0
              const confPct = Math.round((conf <= 1 ? conf * 100 : conf))
              return (
              <tr key={index} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium">{scan.fileName || 'image.jpg'}</td>
                <td className="px-6 py-4 text-sm">
                  {scan.detectedStage ?? (scan.infected ? 'Infected' : 'Healthy')}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded h-1.5">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded"
                        style={{ width: `${confPct}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold">{confPct}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <Badge
                    variant={
                      scan.severity === 'critical'
                        ? 'destructive'
                        : scan.severity === 'high'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {getSeverityLabel(scan.severity)}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {format(new Date(scan.timestamp), 'MMM dd, HH:mm')}
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
