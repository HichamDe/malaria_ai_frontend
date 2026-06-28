import { NextRequest, NextResponse } from 'next/server'
import { generateMockPrediction } from '@/lib/mockData'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Simulate processing time (1-3 seconds)
    const processingTime = 1000 + Math.random() * 2000
    await new Promise((resolve) => setTimeout(resolve, processingTime))

    // Generate mock prediction
    const prediction = generateMockPrediction()

    // Convert file to base64 for storage
    const buffer = await file.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    const imageUrl = `data:${file.type};base64,${base64}`

    return NextResponse.json({
      success: true,
      data: {
        ...prediction,
        imageUrl,
        fileName: file.name,
        fileSize: file.size,
      },
    })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    )
  }
}
