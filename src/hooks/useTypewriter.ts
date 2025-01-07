"use client"

import { useState, useEffect } from 'react'

interface TypewriterOptions {
  speed?: number
  delay?: number
  deleteSpeed?: number
  pauseTime?: number
  repeat?: boolean
}

export function useTypewriter(
  text: string, 
  { speed = 50, delay = 0, deleteSpeed = 30, pauseTime = 2000, repeat = false }: TypewriterOptions = {}
) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let timeout: NodeJS.Timeout

    if (!isDeleting && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1))
      }, deleteSpeed)
    } else if (isDeleting && displayText.length === 0) {
      if (repeat) {
        timeout = setTimeout(() => {
          setIsDeleting(false)
          setCurrentIndex(0)
        }, pauseTime)
      }
    } else if (!isDeleting && currentIndex === text.length && repeat) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, speed, text, started, isDeleting, displayText, deleteSpeed, pauseTime, repeat])

  return displayText
} 