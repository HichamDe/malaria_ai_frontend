export const PARASITE_STAGES = {
  RING: 'Ring Stage',
  TROPHOZOITE: 'Trophozoite',
  SCHIZONT: 'Schizont',
  GAMETOCYTE: 'Gametocyte',
} as const

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

export function generateMockPrediction() {
  // Generate realistic confidence scores
  const stages = Object.values(PARASITE_STAGES)
  const confidences: Record<string, number> = {}

  // Create a weighted distribution
  const random = Math.random()
  if (random < 0.3) {
    // Ring stage dominant
    confidences[PARASITE_STAGES.RING] = 35 + Math.random() * 20
    confidences[PARASITE_STAGES.TROPHOZOITE] = 20 + Math.random() * 20
    confidences[PARASITE_STAGES.SCHIZONT] = 15 + Math.random() * 15
    confidences[PARASITE_STAGES.GAMETOCYTE] = Math.random() * 10
  } else if (random < 0.6) {
    // Trophozoite dominant
    confidences[PARASITE_STAGES.RING] = 15 + Math.random() * 15
    confidences[PARASITE_STAGES.TROPHOZOITE] = 35 + Math.random() * 20
    confidences[PARASITE_STAGES.SCHIZONT] = 20 + Math.random() * 20
    confidences[PARASITE_STAGES.GAMETOCYTE] = 10 + Math.random() * 10
  } else if (random < 0.85) {
    // Schizont dominant
    confidences[PARASITE_STAGES.RING] = 10 + Math.random() * 10
    confidences[PARASITE_STAGES.TROPHOZOITE] = 20 + Math.random() * 20
    confidences[PARASITE_STAGES.SCHIZONT] = 40 + Math.random() * 20
    confidences[PARASITE_STAGES.GAMETOCYTE] = 5 + Math.random() * 10
  } else {
    // Gametocyte dominant
    confidences[PARASITE_STAGES.RING] = Math.random() * 10
    confidences[PARASITE_STAGES.TROPHOZOITE] = 10 + Math.random() * 15
    confidences[PARASITE_STAGES.SCHIZONT] = 15 + Math.random() * 20
    confidences[PARASITE_STAGES.GAMETOCYTE] = 30 + Math.random() * 25
  }

  // Normalize to 100
  const total = Object.values(confidences).reduce((a, b) => a + b, 0)
  Object.keys(confidences).forEach((key) => {
    confidences[key] = Math.round((confidences[key] / total) * 100 * 10) / 10
  })

  // Find dominant stage
  const dominantStage = Object.entries(confidences).sort(([, a], [, b]) => b - a)[0][0]

  return {
    detectedStage: dominantStage,
    confidences,
    severity: STAGE_INFO[dominantStage as keyof typeof STAGE_INFO].severity,
    timestamp: new Date().toISOString(),
  }
}

export interface AnalysisResult {
  detectedStage: string
  confidences: Record<string, number>
  severity: string
  timestamp: string
  imageUrl?: string
  fileName?: string
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
