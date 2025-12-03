"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { experienceData } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Briefcase, ExternalLink } from "lucide-react"

export default function Experience() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto relative z-10 overflow-hidden">
      {/* Animated background gradient */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-100/50'} rounded-full blur-[100px] animate-pulse-glow`}></div>

      <FadeInSection>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-100'} animate-bounce-gentle`}>
                <Briefcase className="text-indigo-500" size={28} />
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} hover:scale-105 transition-transform duration-300 cursor-default`}>
                Professional Journey
              </h2>
            </div>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xl hover:text-indigo-500 transition-colors duration-300`}>
              A decade of leadership in engineering, from hands-on development to managing high-impact teams at PhonePe and Myntra.
            </p>
          </div>
        </div>
      </FadeInSection>

      <div className={`relative border-l-2 ${isDark ? 'border-slate-800' : 'border-slate-200'} ml-3 md:ml-6 space-y-12`}>
        {experienceData.map((job, index) => (
          <FadeInSection key={index} delay={index * 100}>
            <div
              className={`relative pl-8 md:pl-12 group transition-all duration-500 ${
                hoveredIndex === index ? 'transform translate-x-2' : ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated timeline dot */}
              <div className={`absolute -left-[9px] top-2 w-[19px] h-[19px] rounded-full bg-indigo-500 ring-4 ${isDark ? 'ring-slate-950' : 'ring-slate-50'} group-hover:scale-150 group-hover:rotate-180 transition-all duration-500 shadow-lg shadow-indigo-500/50`}>
                <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-75"></div>
              </div>

              {/* Glowing line on hover */}
              {hoveredIndex === index && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent animate-gradient"></div>
              )}

              <div className={`p-6 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-indigo-500/30' : 'bg-white/50 border-slate-200 hover:bg-white hover:border-indigo-200'} backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-indigo-500/10 ${hoveredIndex === index ? 'scale-105' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} group-hover:text-indigo-500 transition-colors duration-300 flex items-center gap-2`}>
                      {job.role}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-float">
                        ✨
                      </span>
                    </h3>
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg text-indigo-500 hover:text-indigo-400 transition-all duration-300 underline decoration-indigo-500/30 hover:decoration-indigo-400 inline-flex items-center gap-2 group/link"
                      >
                        {job.company}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all duration-300" />
                      </a>
                    ) : (
                      <div className="text-lg text-indigo-500">{job.company}</div>
                    )}
                  </div>
                  <div className={`text-sm font-mono ${isDark ? 'text-slate-400 bg-slate-800/50 border-slate-700' : 'text-slate-500 bg-slate-50 border-slate-200'} px-4 py-2 rounded-full border w-fit group-hover:scale-105 group-hover:border-indigo-500/50 transition-all duration-300 shadow-sm`}>
                    {job.period}
                  </div>
                </div>

                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} italic leading-relaxed group-hover:text-slate-300 transition-colors duration-300`}>
                  {job.desc}
                </p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
