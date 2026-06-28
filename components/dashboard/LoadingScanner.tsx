'use client'

import { Microscope } from 'lucide-react'

export function LoadingScanner() {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="relative h-32 w-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin"></div>

          {/* Middle ring */}
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-primary/50 animate-spin"
            style={{ animationDirection: 'reverse' }}
          ></div>

          {/* Center circle */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
            <Microscope className="h-8 w-8 text-primary" />
          </div>

          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 animate-scan bg-gradient-to-b from-primary/30 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold">Analyzing image</h3>
        <p className="text-muted-foreground">Running the detection pipeline…</p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}
