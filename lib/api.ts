/**
 * Types and mapping for the Malaria Detection FastAPI backend.
 *
 * The backend (`POST /predict`) returns the shape documented below. We map it
 * into the UI-friendly `AnalysisResult` used across the dashboard components.
 */
import {
  AnalysisResult,
  STAGE_LABELS,
  STAGE_INFO,
  PARASITE_STAGES,
} from '@/lib/mockData'

// ---- Raw server response shape (POST /predict) ----------------------------

export interface DetectionBox {
  x: number
  y: number
  width: number
  height: number
}

export interface PredictResponse {
  filename: string
  image_size: [number, number]
  infected: boolean
  infection: { label: string; confidence: number } // confidence in 0..1
  detection: {
    found: boolean
    backend: string
    box: DetectionBox | null
    area_px: number
  } | null
  stage: { label: string; confidence: number } | null // confidence in 0..1
  overlay_png_b64: string | null
  mask_png_b64: string | null
  timings_ms: Record<string, number>
}

// ---- Health endpoint ------------------------------------------------------

export interface HealthResponse {
  status?: string
  device?: string
  [k: string]: unknown
}

// ---- Mapping --------------------------------------------------------------

function b64ToDataUrl(b64: string | null | undefined): string | undefined {
  if (!b64) return undefined
  // Already a data URL? pass through.
  if (b64.startsWith('data:')) return b64
  return `data:image/png;base64,${b64}`
}

/**
 * Convert a raw backend `/predict` response into the UI `AnalysisResult`.
 * `imageUrl` is the original uploaded image (data URL), passed in by the caller.
 */
export function mapPrediction(
  res: PredictResponse,
  extras: { imageUrl?: string; fileName?: string; fileSize?: number } = {}
): AnalysisResult {
  const stageLabel = res.stage
    ? STAGE_LABELS[res.stage.label.toLowerCase()] ?? res.stage.label
    : null

  const severity =
    stageLabel && STAGE_INFO[stageLabel as keyof typeof STAGE_INFO]
      ? STAGE_INFO[stageLabel as keyof typeof STAGE_INFO].severity
      : 'none'

  return {
    infected: res.infected,
    infectionLabel: res.infection?.label ?? (res.infected ? 'Infected' : 'Healthy'),
    infectionConfidence: res.infection?.confidence ?? 0,

    detectedStage: stageLabel,
    stageConfidence: res.stage ? res.stage.confidence : null,

    detection: res.detection
      ? {
          found: res.detection.found,
          backend: res.detection.backend,
          box: res.detection.box,
          areaPx: res.detection.area_px,
        }
      : null,

    severity,
    imageSize: res.image_size,
    overlayUrl: b64ToDataUrl(res.overlay_png_b64),
    maskUrl: b64ToDataUrl(res.mask_png_b64),
    imageUrl: extras.imageUrl,
    fileName: extras.fileName ?? res.filename,
    fileSize: extras.fileSize,
    timingsMs: res.timings_ms,
    timestamp: new Date().toISOString(),
  }
}

// Re-export so consumers can reach stage constants from one place.
export { PARASITE_STAGES, STAGE_INFO, STAGE_LABELS }
