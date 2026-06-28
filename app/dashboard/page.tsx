'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { UploadZone } from '@/components/dashboard/UploadZone'
import { ImagePreview } from '@/components/dashboard/ImagePreview'
import { LoadingScanner } from '@/components/dashboard/LoadingScanner'
import { AnalysisResult as AnalysisResultComponent } from '@/components/dashboard/AnalysisResult'
import { ScanHistory } from '@/components/dashboard/ScanHistory'
import { Button } from '@/components/ui/button'
import { AnalysisResult } from '@/lib/mockData'

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [scanHistory, setScanHistory] = useState<AnalysisResult[]>([])

  // Load scan history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('malariaScans')
    if (saved) {
      setScanHistory(JSON.parse(saved))
    }
  }, [])

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setResult(null)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      const newResult = data.data as AnalysisResult

      setResult(newResult)

      // Add to history
      const updated = [newResult, ...scanHistory].slice(0, 10) // Keep last 10
      setScanHistory(updated)
      localStorage.setItem('malariaScans', JSON.stringify(updated))
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to analyze image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Detector</h1>
            <p className="text-lg text-muted-foreground">
              Upload a single-cell blood-smear image to screen for infection, localize the parasite, and classify its life-cycle stage.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Upload and Preview */}
            <div className="lg:col-span-2 space-y-8">
              {!selectedFile && !result && (
                <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading} />
              )}

              {selectedFile && !result && (
                <>
                  <ImagePreview file={selectedFile} onRemove={handleRemoveFile} />
                  <Button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    size="lg"
                    className="w-full"
                  >
                    {isLoading ? 'Analyzing...' : 'Analyze Image'}
                  </Button>
                </>
              )}

              {isLoading && <LoadingScanner />}

              {result && (
                <AnalysisResultComponent result={result} onReset={handleRemoveFile} />
              )}
            </div>

            {/* Right Column - History and Stats */}
            <div className="lg:col-span-1 space-y-8">
              {/* Quick Stats */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Statistics</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border border-border bg-primary/5">
                    <p className="text-sm text-muted-foreground">Total Scans</p>
                    <p className="text-2xl font-bold text-primary">{scanHistory.length}</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-accent/5">
                    <p className="text-sm text-muted-foreground">Recent Detection</p>
                    <p className="text-sm font-medium">
                      {(() => {
                        const r = result ?? scanHistory[0]
                        if (!r) return 'No data'
                        return r.detectedStage ?? (r.infected ? 'Infected' : 'Healthy')
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              {/* History */}
              {scanHistory.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Scan History</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {scanHistory.map((scan, i) => {
                      const conf = scan.detectedStage
                        ? scan.stageConfidence ?? 0
                        : scan.infectionConfidence ?? 0
                      const confPct = Math.round(conf <= 1 ? conf * 100 : conf)
                      return (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-border bg-muted/30 text-sm hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <p className="font-medium truncate">
                          {scan.detectedStage ?? (scan.infected ? 'Infected' : 'Healthy')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {confPct}% confidence
                        </p>
                      </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed History Table */}
          {scanHistory.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Analysis History</h2>
              <ScanHistory scans={scanHistory} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
