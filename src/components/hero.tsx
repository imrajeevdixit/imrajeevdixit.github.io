"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { socialLinks } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <section id="about" className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-[90vh] z-10">
      {isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>
      )}

      <div className="flex flex-col items-start justify-center">
        <FadeInSection>
          <div className={`inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-indigo-500 uppercase ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'} rounded-full border border-indigo-500/20 hover:scale-105 transition-transform duration-300 cursor-default`}>
            AI. Tech. Leadership
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <h1 className={`text-5xl md:text-7xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-6 leading-tight`}>
            Building Smarter Systems. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:300%_300%] animate-gradient">
              Empowering Stronger Teams.
            </span>
          </h1>
        </FadeInSection>

        <FadeInSection delay={200}>
          <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-2xl mb-10 leading-relaxed`}>
            Over a decade of experience bridging the gap between resilient distributed systems and the future of Generative AI and Autonomous Workflows. I align technical strategy with business velocity to build the next generation of platforms.
          </p>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('contact')} className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95">
              Get in Touch
            </button>
            <button onClick={() => scrollToSection('experience')} className={`px-8 py-3 ${isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-white text-slate-700 border-slate-200 shadow-sm'} rounded-lg font-medium hover:opacity-90 transition-all border hover:scale-105 active:scale-95`}>
              View Work
            </button>
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className={`mt-16 flex gap-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-500 hover:text-indigo-400 transition-all hover:-translate-y-1 hover:scale-110"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

