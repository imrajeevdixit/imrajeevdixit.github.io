import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    // Get the generative model (using Gemini 2.5 Flash)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Create the prompt with context
    const prompt = `You are an AI assistant that helps people learn about Rajeev Dixit's professional experience, skills, and achievements.

Use the following information to answer questions:

${KNOWLEDGE_BASE}

User Question: ${message}

Provide a helpful, accurate, and concise response based on the information above. If the question is not related to Rajeev's profile, politely redirect the conversation back to his professional experience. Be conversational and friendly.

Response:`

    // Generate response
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    return NextResponse.json({
      response: text
    })

  } catch (error) {
    console.error('Error in AI chat:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
