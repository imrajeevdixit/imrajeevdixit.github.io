"use client"

import { useTheme } from "next-themes"
import { useState, useEffect, useRef } from "react"
import { Bot, Send, X, Sparkles, Loader2, User, Minimize2, Maximize2 } from "lucide-react"

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

export default function AIWorkbenchFloater() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isDark = (resolvedTheme || theme) === 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message immediately when opened
      setTimeout(() => {
        setMessages([{
          role: 'assistant',
          content: "Hello! I'm an AI assistant. Ask me anything about Rajeev!",
          timestamp: new Date()
        }])
      }, 100) // Small delay to ensure rendering
    }
  }, [isOpen, messages.length])

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
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-3 sm:p-4 rounded-full ${isDark ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-110 active:scale-95 z-50 group animate-bounce-gentle`}
          aria-label="Open AI Chat"
        >
          <Bot size={24} className="sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && mounted && (
        <div 
          key="chatbot-window"
          className={`fixed ${
            isMinimized 
              ? 'bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-80 sm:bottom-6 sm:right-6' 
              : 'bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[420px]'
          } ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'} rounded-2xl border shadow-2xl z-50 transition-all duration-300`}
          style={{
            maxHeight: isMinimized ? '60px' : 'calc(100vh - 2rem)',
            overflow: 'hidden'
          }}
        >
          {/* Header - Always visible */}
          <div className={`flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b ${isDark ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-slate-50'} flex-shrink-0`}>
            <div className="flex items-center gap-2 sm:gap-3 flex-1 pr-2 min-w-0">
              <div className={`p-1.5 sm:p-2 rounded-full ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} flex-shrink-0`}>
                <Bot className="text-indigo-500" size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className={`font-semibold text-xs sm:text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  AI Assistant
                </h3>
                <p className={`text-[10px] sm:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Powered by Gemini
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 ml-2 sm:ml-3">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className={`p-1.5 sm:p-2 rounded-lg ${isDark ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'} transition-all hover:scale-110 active:scale-95 shadow-sm`}
                aria-label={isMinimized ? "Maximize" : "Minimize"}
                title={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 size={16} strokeWidth={2.5} /> : <Minimize2 size={16} strokeWidth={2.5} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 sm:p-2 rounded-lg ${isDark ? 'bg-slate-800 text-slate-100 hover:bg-red-900 hover:text-red-300' : 'bg-slate-100 text-slate-900 hover:bg-red-100 hover:text-red-600'} transition-all hover:scale-110 active:scale-95 shadow-sm`}
                aria-label="Close"
                title="Close"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className={`h-[280px] sm:h-[340px] overflow-y-auto p-3 sm:p-4 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
                <div className={`${messages.length <= 2 ? 'flex flex-col justify-center min-h-full' : ''} space-y-3`}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-1.5 sm:gap-2 animate-float-in ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {message.role === 'assistant' && (
                      <div className={`p-1 sm:p-1.5 rounded-full ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} h-fit`}>
                        <Bot className="text-indigo-500" size={14} />
                      </div>
                    )}
                    <div className={`max-w-[80%] sm:max-w-[75%] p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm ${
                      message.role === 'user'
                        ? `${isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white'}`
                        : `${isDark ? 'bg-slate-800 text-slate-200' : 'bg-white text-slate-800 shadow-sm'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                      <p className={`text-[10px] sm:text-xs mt-1 sm:mt-1.5 ${message.role === 'user' ? 'text-indigo-100' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className={`p-1 sm:p-1.5 rounded-full ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} h-fit`}>
                        <User className="text-indigo-500" size={14} />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 justify-start animate-pulse">
                    <div className={`p-1.5 rounded-full ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} h-fit`}>
                      <Bot className="text-indigo-500" size={16} />
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'} border`}>
                      <Loader2 className="animate-spin text-indigo-500" size={16} />
                    </div>
                  </div>
                )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions - Compact */}
              {messages.length === 1 && (
                <div className={`px-3 sm:px-4 py-2 border-t ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'} max-h-32 sm:max-h-24 overflow-y-auto`}>
                  <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'} mb-1.5`}>
                    Quick asks:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className={`text-xs px-2 py-1 rounded-md ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700' : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'} border transition-all hover:border-indigo-500/50 text-left break-words max-w-full`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className={`p-2.5 sm:p-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className="flex gap-1.5 sm:gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className={`flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg ${isDark ? 'bg-slate-800 text-slate-200 border-slate-700 focus:border-indigo-500' : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-500'} border outline-none transition-all`}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      <Send size={14} />
                    )}
                  </button>
                </div>
              </form>

              {/* Powered by Badge */}
              <div className={`px-3 sm:px-4 py-1.5 sm:py-2 border-t ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'} flex justify-center`}>
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500">
                  <Sparkles className="text-indigo-500" size={10} />
                  Powered by Google Gemini
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

