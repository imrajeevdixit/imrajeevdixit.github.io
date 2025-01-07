"use client"

import About from "@/components/about"
import Contact from "@/components/contact"
import Hero from "@/components/hero"
import { Github, Linkedin, Twitter } from 'lucide-react'
import { Element } from "react-scroll"

export default function Home() {
  return (
    <div className="min-h-screen">

      <main>
        <Element name="hero">
          <Hero />
        </Element>
        <Element name="about">
          <About />
        </Element>
        <Element name="contact">
          <Contact />
        </Element>
      </main>

      <footer className="py-8 px-8 sm:px-16 lg:px-32">
        <div className="max-w-screen-xl mx-auto w-full flex justify-center sm:justify-start gap-6">
          <a href="https://github.com/rajeevdixit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/rajeevdixit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://twitter.com/rajeevdixit" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Twitter className="w-5 h-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </footer>
    </div>
  )
}

