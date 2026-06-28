export const PARASITE_STAGES = {
  RING: 'Ring Stage',
  TROPHOZOITE: 'Trophozoite',
  SCHIZONT: 'Schizont',
  GAMETOCYTE: 'Gametocyte',
} as const

/** Map backend stage labels (lowercase) → display labels used in STAGE_INFO. */
export const STAGE_LABELS: Record<string, string> = {
  ring: PARASITE_STAGES.RING,
  trophozoite: PARASITE_STAGES.TROPHOZOITE,
  schizont: PARASITE_STAGES.SCHIZONT,
  gametocyte: PARASITE_STAGES.GAMETOCYTE,
}

export const STAGE_INFO = {
  [PARASITE_STAGES.RING]: {
    description: 'Early stage of parasite development, ring-shaped appearance',
    color: 'bg-blue-500',
    severity: 'low',
  },
  [PARASITE_STAGES.TROPHOZOITE]: {
    description: 'Growing parasite stage, feeds on host RBC',
    color: 'bg-yellow-500',
    severity: 'medium',
  },
  [PARASITE_STAGES.SCHIZONT]: {
    description: 'Advanced stage, preparing for reproduction',
    color: 'bg-orange-500',
    severity: 'high',
  },
  [PARASITE_STAGES.GAMETOCYTE]: {
    description: 'Sexual stage, transmissible to mosquito',
    color: 'bg-red-500',
    severity: 'critical',
  },
} as const

export interface AnalysisResult {
  /** Phase 1 — infection status */
  infected: boolean
  infectionLabel: string
  infectionConfidence: number // 0..1

  /** Phase 4 — life-cycle stage (null when healthy / not staged) */
  detectedStage: string | null
  stageConfidence: number | null // 0..1

  /** Phase 2 — parasite localization (null when healthy / not segmented) */
  detection: {
    found: boolean
    backend: string
    box: { x: number; y: number; width: number; height: number } | null
    areaPx: number
  } | null

  severity: string
  timestamp: string

  imageSize?: [number, number]
  /** Annotated overlay PNG (box + mask + labels), as a data URL. */
  overlayUrl?: string
  /** Binary parasite mask PNG, as a data URL. */
  maskUrl?: string
  /** Original uploaded image, as a data URL. */
  imageUrl?: string
  fileName?: string
  fileSize?: number
  timingsMs?: Record<string, number>
}

export function getSeverityColor(severity: string) {
  switch (severity) {
    case 'critical':
      return 'text-red-500 bg-red-500/10'
    case 'high':
      return 'text-orange-500 bg-orange-500/10'
    case 'medium':
      return 'text-yellow-500 bg-yellow-500/10'
    case 'low':
      return 'text-blue-500 bg-blue-500/10'
    default:
      return 'text-gray-500 bg-gray-500/10'
  }
}

export function getSeverityLabel(severity: string) {
  return severity.charAt(0).toUpperCase() + severity.slice(1)
}
