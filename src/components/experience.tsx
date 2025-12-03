"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { experienceData } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Experience() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
      <FadeInSection>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-4`}>Professional Journey</h2>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xl`}>
              A decade of leadership in engineering, from hands-on development to managing high-impact teams at PhonePe and Myntra.
            </p>
          </div>
        </div>
      </FadeInSection>

      <div className={`relative border-l ${isDark ? 'border-slate-800' : 'border-slate-200'} ml-3 md:ml-6 space-y-12`}>
        {experienceData.map((job, index) => (
          <FadeInSection key={index} delay={index * 100}>
            <div className="relative pl-8 md:pl-12 group">
              <div className={`absolute -left-[5px] top-2 w-[11px] h-[11px] rounded-full bg-indigo-500 ring-4 ${isDark ? 'ring-slate-950' : 'ring-slate-50'} group-hover:scale-125 transition-transform duration-300`}></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} group-hover:text-indigo-500 transition-colors`}>{job.role}</h3>
                  <div className="text-lg text-indigo-500">{job.company}</div>
                </div>
                <div className={`text-sm font-mono ${isDark ? 'text-slate-400 bg-slate-900 border-slate-800' : 'text-slate-500 bg-slate-100 border-slate-200'} px-3 py-1 rounded-full border w-fit`}>
                  {job.period}
                </div>
              </div>

              <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} italic`}>{job.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
