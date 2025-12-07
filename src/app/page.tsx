"use client"

import { useEffect } from "react"
import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Leadership from "@/components/leadership"
import AIWorkbenchFloater from "@/components/ai-workbench-floater"
import Contact from "@/components/contact"

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when coming from another page
    const hash = window.location.hash
    if (hash) {
      // Remove the # from the hash
      const id = hash.substring(1)
      // Wait for the DOM to be ready, then scroll to the section
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-300 overflow-x-hidden">
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Leadership />
      </main>
      <Contact />
      <AIWorkbenchFloater />
    </div>
  )
}

