"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { useTheme } from "next-themes"
import { useState, useEffect, useRef } from "react"
import { Bot, Send, Sparkles, Brain, Loader2, User } from "lucide-react"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SUGGESTED_QUESTIONS = [
  "What's Rajeev's experience with AI and GenAI?",
  "Tell me about his leadership philosophy",
  "What major companies has he worked for?",
  "What are his technical skills?",
]

export default function AIWorkbench() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isDark = theme === 'dark'

  useEffect(() => {
    setMounted(true)
    // Welcome message
    setMessages([{
      role: 'assistant',
      content: "Hello! I'm an AI assistant powered by Gemini, trained on Rajeev's portfolio and experience. Ask me anything about his background, skills, leadership philosophy, or achievements!",
      timestamp: new Date()
    }])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!mounted) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input.trim() })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <section id="ai-workbench" className={`py-24 px-6 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'} relative z-10 overflow-hidden`}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/3 left-1/3 w-96 h-96 ${isDark ? 'bg-cyan-500/5' : 'bg-cyan-200/30'} rounded-full blur-[120px] animate-float-slow`}></div>
        <div className={`absolute bottom-1/3 right-1/3 w-96 h-96 ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-200/30'} rounded-full blur-[120px] animate-float-delayed`}></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <FadeInSection>
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="text-cyan-500 animate-pulse" size={32} />
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} hover:scale-105 transition-transform duration-300 cursor-default`}>
                AI Workbench
              </h2>
              <Sparkles className="text-indigo-500 animate-spin-slow" size={32} />
            </div>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-2xl mx-auto hover:text-indigo-500 transition-colors duration-300`}>
              Chat with an AI assistant powered by Google Gemini, trained on my portfolio and experience
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className={`${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-xl'} rounded-2xl border transition-all duration-500 overflow-hidden backdrop-blur-sm`}>
            {/* Chat Messages */}
            <div className={`h-[500px] overflow-y-auto p-6 space-y-4 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 animate-float-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {message.role === 'assistant' && (
                    <div className={`p-2 rounded-full ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} h-fit`}>
                      <Bot className="text-indigo-500" size={20} />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? `${isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white'}`
                      : `${isDark ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-800 shadow-sm'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-indigo-100' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className={`p-2 rounded-full ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} h-fit`}>
                      <User className="text-indigo-500" size={20} />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start animate-pulse">
                  <div className={`p-2 rounded-full ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} h-fit`}>
                    <Bot className="text-indigo-500" size={20} />
                  </div>
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'} border`}>
                    <Loader2 className="animate-spin text-indigo-500" size={20} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className={`px-6 py-4 border-t ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-3`}>
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className={`text-xs px-3 py-2 rounded-lg ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'} border transition-all hover:scale-105 hover:border-indigo-500/50`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className={`p-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Rajeev's experience..."
                  className={`flex-1 px-4 py-3 rounded-lg ${isDark ? 'bg-slate-800 text-slate-200 border-slate-700 focus:border-indigo-500' : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-500'} border outline-none transition-all`}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Send size={20} />
                      Send
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </FadeInSection>

        {/* Powered by Gemini Badge */}
        <FadeInSection delay={200}>
          <div className="mt-6 flex justify-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} rounded-full border text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <Sparkles className="text-indigo-500" size={16} />
              Powered by Google Gemini
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
