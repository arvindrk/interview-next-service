import { NextRequest, NextResponse } from 'next/server'
import { promptService } from '@/lib/prompt-service'
import { savePromptRequestSchema } from '@/lib/validations'

// GET - Return prompt to agent
export async function GET() {
  try {
    const content = await promptService.getPromptContent()
    return NextResponse.json({ prompt: content })
  } catch (error) {
    console.error('Error fetching prompt:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prompt' },
      { status: 500 }
    )
  }
}

// POST - Save prompt from UI
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    const result = savePromptRequestSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid prompt', details: result.error.issues },
        { status: 400 }
      )
    }

    const saved = await promptService.savePrompt(result.data.prompt)
    
    return NextResponse.json({
      success: true,
      metadata: saved.metadata
    })
  } catch (error) {
    console.error('Error saving prompt:', error)
    return NextResponse.json(
      { error: 'Failed to save prompt' },
      { status: 500 }
    )
  }
}

