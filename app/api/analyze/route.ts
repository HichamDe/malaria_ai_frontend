import { NextRequest, NextResponse } from 'next/server'
import { mapPrediction, PredictResponse } from '@/lib/api'

/**
 * Proxies the uploaded image to the Malaria Detection FastAPI backend
 * (`POST /predict`) and returns a UI-friendly result. Proxying server-side
 * avoids CORS and keeps the backend URL out of the browser bundle.
 */
const API_BASE = (process.env.MALARIA_API_URL ?? 'http://localhost:8000').replace(/\/$/, '')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Keep the original image so the UI can show it next to the overlay.
    const buffer = await file.arrayBuffer()
    const imageUrl = `data:${file.type || 'image/png'};base64,${Buffer.from(buffer).toString('base64')}`

    // Forward the file to the FastAPI backend.
    const upstream = new FormData()
    upstream.append('file', new Blob([buffer], { type: file.type || 'image/png' }), file.name)

    let res: Response
    try {
      res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        body: upstream,
        // Inference can take a few seconds; allow generous time.
        signal: AbortSignal.timeout(120_000),
      })
    } catch (err) {
      console.error('Backend unreachable:', err)
      return NextResponse.json(
        {
          error: `Cannot reach the detection server at ${API_BASE}. Is it running (docker compose up)?`,
        },
        { status: 502 }
      )
    }

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      return NextResponse.json(
        { error: `Detection server returned ${res.status}`, detail },
        { status: res.status === 400 ? 400 : 502 }
      )
    }

    const prediction = (await res.json()) as PredictResponse
    const data = mapPrediction(prediction, {
      imageUrl,
      fileName: file.name,
      fileSize: file.size,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 })
  }
}
