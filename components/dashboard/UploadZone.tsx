'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload, FileImage } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  isLoading?: boolean
}

export function UploadZone({ onFileSelect, isLoading = false }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)

      const files = e.dataTransfer.files
      if (files && files[0]) {
        const file = files[0]
        if (file.type.startsWith('image/')) {
          onFileSelect(file)
        }
      }
    },
    [onFileSelect]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onFileSelect(e.target.files[0])
      }
    },
    [onFileSelect]
  )

  const handleClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-xl border-2 border-dashed transition-all duration-300 p-12 text-center ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoading}
        aria-label="Upload microscopy image"
      />

      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Upload Microscopy Image</h3>
          <p className="text-muted-foreground text-sm">
            Drag and drop your blood smear image here, or click to browse
          </p>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleClick} disabled={isLoading} className="gap-2">
            <FileImage className="h-4 w-4" />
            Select Image
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Single-cell crop · JPG, PNG or WebP · up to 20 MB
        </p>
      </div>
    </div>
  )
}
