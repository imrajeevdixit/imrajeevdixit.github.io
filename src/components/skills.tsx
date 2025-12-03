"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { skillsData } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { Briefcase, Zap, Cloud, Terminal } from "lucide-react"
import { useState, useEffect } from "react"

export default function Skills() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const categoryIcons: Record<string, typeof Briefcase> = {
    "Strategic AI Leadership": Briefcase,
    "Gen AI & LLM Stack": Zap,
    "Architecture & Cloud": Cloud,
    "Core Tech & Data": Terminal
  };

  const categoryColors: Record<string, string> = {
    "Strategic AI Leadership": "text-indigo-500",
    "Gen AI & LLM Stack": "text-yellow-500",
    "Architecture & Cloud": "text-blue-500",
    "Core Tech & Data": "text-green-500"
  };

  return (
    <section id="skills" className={`py-24 ${isDark ? 'bg-slate-900/50' : 'bg-slate-100/50'} relative z-10`}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeInSection>
          <div className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-4`}>Technical & Strategic Arsenal</h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Deep expertise in building scalable solutions, leading organizations, and next-gen AI systems.</p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, skills], idx) => {
            const Icon = categoryIcons[category];
            const iconColor = categoryColors[category];

            return (
              <FadeInSection key={category} delay={idx * 100}>
                <div className={`${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} p-8 rounded-2xl border hover:border-slate-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'} mb-6 flex items-center gap-2`}>
                    {Icon && <Icon className={iconColor} size={20} />}
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 text-sm ${isDark ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'} rounded-md border hover:text-indigo-500 hover:border-indigo-500/30 transition-all duration-300 cursor-default hover:scale-105`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  )
}
