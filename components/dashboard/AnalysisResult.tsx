'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AnalysisResult as AnalysisResultType, STAGE_INFO, getSeverityColor, getSeverityLabel } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { Download, AlertCircle, CheckCircle } from 'lucide-react'

interface AnalysisResultProps {
  result: AnalysisResultType
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  const stageInfo = STAGE_INFO[result.detectedStage as keyof typeof STAGE_INFO]
  const chartData = Object.entries(result.confidences).map(([stage, confidence]) => ({
    stage: stage.replace(' Stage', '').substring(0, 3),
    confidence,
  }))

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Main Result Card */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left - Detected Stage */}
        <div className="space-y-4">
          <div className={`p-6 rounded-xl border-2 ${getSeverityColor(result.severity)} space-y-4`}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-2">Detected Parasite Stage</h2>
                <h3 className="text-3xl font-bold">{result.detectedStage}</h3>
              </div>
              {result.severity === 'critical' ? (
                <AlertCircle className="h-6 w-6" />
              ) : (
                <CheckCircle className="h-6 w-6" />
              )}
            </div>
            <p className="text-sm">{stageInfo.description}</p>
            <div className="pt-4 border-t border-current/20">
              <p className="text-xs uppercase tracking-wide font-semibold opacity-75 mb-2">Severity</p>
              <p className="text-lg font-bold">{getSeverityLabel(result.severity)}</p>
            </div>
          </div>

          {/* Confidence Percentage */}
          <div className="p-6 rounded-xl border border-border bg-card space-y-4">
            <h4 className="font-semibold">Confidence Score</h4>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-primary">
                {Math.round(result.confidences[result.detectedStage])}%
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${result.confidences[result.detectedStage]}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                High confidence detection based on image analysis
              </p>
            </div>
          </div>
        </div>

        {/* Right - Chart */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <h4 className="font-semibold mb-4">Stage Probability Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.5rem',
                }}
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
              <Bar
                dataKey="confidence"
                fill="url(#colorGradient)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clinical Information */}
      <div className="p-6 rounded-xl border border-border bg-muted/20 space-y-4">
        <h4 className="font-semibold">Clinical Information</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Analysis Time</p>
            <p className="font-medium">{new Date(result.timestamp).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Recommended Action</p>
            <p className="font-medium">
              {result.severity === 'critical' ? 'Urgent consultation required' : 'Further review recommended'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="gap-2" variant="default">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline">
          New Analysis
        </Button>
      </div>
    </div>
  )
}
