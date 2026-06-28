'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImagePreviewProps {
  file: File
  onRemove: () => void
}

export function ImagePreview({ file, onRemove }: ImagePreviewProps) {
  const previewUrl = URL.createObjectURL(file)

  return (
    <div className="relative space-y-4">
      <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30">
        <div className="relative w-full h-80">
          <Image
            src={previewUrl}
            alt="Preview of uploaded microscopy image"
            fill
            className="object-contain"
          />
        </div>

        {/* Overlay gradient for effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>

      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border">
        <div className="flex-1">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
