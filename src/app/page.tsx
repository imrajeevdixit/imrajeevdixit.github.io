"use client"

import About from "@/components/about"
import Contact from "@/components/contact"
import Hero from "@/components/hero"
import { SocialLinksButton } from "@/components/social-links-button"

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <main>
        <div className="snap-start">
          <Hero />
        </div>
        <div className="snap-start">
          <About />
        </div>
        <div className="snap-start">
          <Contact />
        </div>
      </main>

      <footer className="py-8 px-8 sm:px-16 lg:px-32">
        <div className="max-w-screen-xl mx-auto w-full text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Rajeev Dixit. All rights reserved.
        </div>
      </footer>

      <SocialLinksButton />
    </div>
  )
}

