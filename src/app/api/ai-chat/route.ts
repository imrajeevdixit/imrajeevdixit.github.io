import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base'
import { logger } from '@/lib/server-logger'

// Configure runtime for Vercel
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  logger.info('CORS preflight request received')
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: NextRequest) {
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const startTime = Date.now()
  
  logger.info('AI Chat API - Request received', { requestId })
  
  try {
    const { message } = await request.json()
    logger.info('User message received', { 
      requestId, 
      messagePreview: message?.substring(0, 100),
      messageLength: message?.length 
    })

    if (!message) {
      logger.warn('Validation failed: Empty message', { requestId })
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      logger.error('Configuration error: GEMINI_API_KEY not found', { requestId })
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    logger.info('API key validated', { requestId })
    logger.info('Initializing Gemini model: gemini-2.5-flash', { requestId })

    // Get the generative model (using Gemini 2.5 Flash)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Create the prompt with context
    const prompt = `You are an AI assistant that helps people learn about Rajeev Dixit's professional experience, skills, and achievements.

Use the following information to answer questions:

${KNOWLEDGE_BASE}

User Question: ${message}

IMPORTANT - Response Style Guide:
- Keep answers SHORT and CONCISE (3-5 sentences max for simple questions)
- Be CONVERSATIONAL and FRIENDLY - write like you're chatting with a friend
- Use SIMPLE, SHORT words - avoid flowery language
- NO excessive enthusiasm ("It's clear...", "really impressive!", "extensive experience!")
- Use simple formatting: lists for multiple items, plain text otherwise
- Avoid markdown bold (**) unless absolutely necessary for emphasis
- Just state facts directly without over-explaining
- If listing skills/companies, use simple bullet points with minimal description
- Don't repeat the question in your answer
- Skip filler phrases like "Here's a breakdown" or "In essence"

Examples of good style:
- "He worked at PhonePe, Myntra, and Citrix R&D."
- "He has experience with RAG pipelines, agentic workflows, and LangGraph."
- "His focus is on responsible AI, data governance, and building resilient systems."

If the question is not related to Rajeev's profile, politely redirect back to his professional experience.

Response:`

    logger.info('Sending prompt to Gemini', { 
      requestId, 
      promptLength: prompt.length 
    })
    
    // Generate response
    const geminiStartTime = Date.now()
    const result = await model.generateContent(prompt)
    const geminiDuration = Date.now() - geminiStartTime
    
    const response = result.response
    const text = response.text()
    
    logger.info('Gemini response received', { 
      requestId, 
      geminiDuration: `${geminiDuration}ms`,
      responseLength: text.length,
      responsePreview: text.substring(0, 150)
    })

    const totalDuration = Date.now() - startTime
    logger.info('Request completed successfully', { 
      requestId, 
      totalDuration: `${totalDuration}ms`,
      geminiDuration: `${geminiDuration}ms`
    })

    return NextResponse.json(
      { response: text },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'X-Request-Id': requestId,
          'X-Response-Time': `${totalDuration}ms`,
        },
      }
    )

  } catch (error) {
    const totalDuration = Date.now() - startTime
    logger.error('Error in AI chat', {
      requestId,
      totalDuration: `${totalDuration}ms`,
      errorName: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    })
    
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        requestId, // Include request ID for debugging
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'X-Request-Id': requestId,
        },
      }
    )
  }
}
