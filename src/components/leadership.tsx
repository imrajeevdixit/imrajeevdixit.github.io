"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { leadershipPhilosophy } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { Target, Lightbulb, Star } from "lucide-react"
import { useState, useEffect } from "react"

export default function Leadership() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const leadershipQuote =
    "Spearheaded high-performing engineering teams across global locations, cultivating a collaborative environment that prioritized continuous learning.";

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto relative z-10 overflow-hidden">
      {/* Animated background */}
      <div className={`absolute -top-40 -right-40 w-96 h-96 ${isDark ? 'bg-purple-500/5' : 'bg-purple-200/30'} rounded-full blur-[120px] animate-float`}></div>
      <div className={`absolute -bottom-40 -left-40 w-96 h-96 ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-200/30'} rounded-full blur-[120px] animate-float-delayed`}></div>

      <FadeInSection>
        <div className="max-w-6xl mx-auto relative">
          <div className={`p-8 md:p-12 rounded-2xl border ${isDark ? 'border-indigo-500/10 bg-gradient-to-br from-indigo-900/10 to-slate-950' : 'border-indigo-100 bg-gradient-to-br from-indigo-50 to-white shadow-sm'} transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 group/main overflow-hidden backdrop-blur-sm`}>

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover/main:opacity-100 transition-opacity duration-700"></div>

            {/* Header */}
            <div className="relative mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} animate-bounce-gentle`}>
                  <Target className="text-indigo-500" size={32} />
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} group-hover/main:scale-105 transition-transform duration-300`}>
                  Leadership & Engineering Philosophy
                </h3>
                <Lightbulb className="text-yellow-500 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 animate-pulse" size={28} />
              </div>
              <div className={`h-1 w-24 ${isDark ? 'bg-indigo-500/30' : 'bg-indigo-300'} rounded-full group-hover/main:w-full transition-all duration-1000`}></div>
            </div>

            {/* Philosophy cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {leadershipPhilosophy.map((item, idx) => (
                <FadeInSection key={idx} delay={idx * 50}>
                  <div
                    className={`group/card p-5 rounded-xl border ${
                      isDark
                        ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-indigo-500/30'
                        : 'bg-white/50 border-slate-100 hover:bg-white hover:border-indigo-200'
                    } backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 cursor-default relative overflow-hidden ${
                      hoveredIndex === idx ? 'scale-105' : ''
                    }`}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className={`text-lg font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'} group-hover/card:text-indigo-500 transition-colors duration-300 flex items-center gap-2`}>
                          <Star className={`w-5 h-5 ${hoveredIndex === idx ? 'text-yellow-500 animate-spin-slow' : 'text-indigo-500'} transition-colors duration-300`} />
                          {item.title}
                        </h4>
                        <span className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 text-xl animate-bounce-gentle">
                          ⚡
                        </span>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed group-hover/card:text-slate-300 transition-colors duration-300`}>
                        {item.desc}
                      </p>
                    </div>

                    {/* Animated border on hover */}
                    {hoveredIndex === idx && (
                      <div className="absolute inset-0 rounded-xl border-2 border-indigo-500/30 animate-pulse-glow"></div>
                    )}
                  </div>
                </FadeInSection>
              ))}
            </div>

            {/* Quote section */}
            <FadeInSection delay={600}>
              <div className={`mt-10 pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} relative`}>
                <div className="flex items-start gap-4">
                  <div className={`text-6xl ${isDark ? 'text-indigo-500/20' : 'text-indigo-300'} leading-none`}>&ldquo;</div>
                  <p className={`flex-1 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'} text-base italic hover:text-indigo-500 transition-colors duration-300 py-2`}>
                    {leadershipQuote}
                  </p>
                  <div className={`text-6xl ${isDark ? 'text-indigo-500/20' : 'text-indigo-300'} leading-none self-end`}>&rdquo;</div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
