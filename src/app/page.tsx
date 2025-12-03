"use client"

import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Leadership from "@/components/leadership"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 transition-colors duration-300 overflow-x-hidden">
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Leadership />
      </main>
      <Contact />
    </div>
  )
}

