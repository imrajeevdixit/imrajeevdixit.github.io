"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { skillsData } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { Briefcase, Zap, Cloud, Code, Database, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function Skills() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const categoryIcons: Record<string, typeof Briefcase> = {
    "Strategic AI Leadership": Briefcase,
    "Gen AI & LLM Stack": Zap,
    "Architecture & Cloud": Cloud,
    "Programming & Frameworks": Code,
    "Data & Storage": Database
  };

  const categoryColors: Record<string, string> = {
    "Strategic AI Leadership": "text-indigo-500",
    "Gen AI & LLM Stack": "text-yellow-500",
    "Architecture & Cloud": "text-blue-500",
    "Programming & Frameworks": "text-purple-500",
    "Data & Storage": "text-emerald-500"
  };

  const categoryGradients: Record<string, string> = {
    "Strategic AI Leadership": "from-indigo-500/10 to-purple-500/10",
    "Gen AI & LLM Stack": "from-yellow-500/10 to-orange-500/10",
    "Architecture & Cloud": "from-blue-500/10 to-cyan-500/10",
    "Programming & Frameworks": "from-purple-500/10 to-pink-500/10",
    "Data & Storage": "from-emerald-500/10 to-green-500/10"
  };

  return (
    <section id="skills" className={`py-24 ${isDark ? 'bg-slate-900/50' : 'bg-slate-100/50'} relative z-10 overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-purple-500/5' : 'bg-purple-200/30'} rounded-full blur-[120px] animate-float-slow`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-blue-500/5' : 'bg-blue-200/30'} rounded-full blur-[120px] animate-float-delayed`}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <FadeInSection>
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="text-indigo-500 animate-spin-slow" size={32} />
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} hover:scale-105 transition-transform duration-300 cursor-default`}>
                Technical & Strategic Arsenal
              </h2>
              <Sparkles className="text-purple-500 animate-spin-slow" size={32} style={{ animationDelay: '1s' }} />
            </div>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-2xl mx-auto hover:text-indigo-500 transition-colors duration-300`}>
              Deep expertise in building scalable solutions, leading organizations, and next-gen AI systems.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsData).map(([category, skills], idx) => {
            const Icon = categoryIcons[category];
            const iconColor = categoryColors[category];
            const gradient = categoryGradients[category];

            return (
              <FadeInSection key={category} delay={idx * 100}>
                <div
                  className={`relative ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} p-8 rounded-2xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden ${
                    hoveredCategory === category ? 'scale-105 border-indigo-500/50' : ''
                  }`}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {/* Animated gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Animated border glow */}
                  {hoveredCategory === category && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-indigo-500/30 animate-pulse-glow"></div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'} flex items-center gap-3 group-hover:scale-105 transition-transform duration-300`}>
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-slate-100'} group-hover:rotate-12 transition-transform duration-300`}>
                          {Icon && <Icon className={`${iconColor} group-hover:scale-110 transition-transform duration-300`} size={24} />}
                        </div>
                        {category}
                      </h3>
                      <div className={`${iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce-gentle`}>
                        ✨
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, skillIdx) => (
                        <span
                          key={skill}
                          className={`relative px-3 py-1.5 text-sm ${isDark ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-600 border-slate-200'} rounded-md border hover:text-indigo-500 hover:border-indigo-500/50 transition-all duration-300 cursor-default hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20 animate-float-in group/skill`}
                          style={{
                            animationDelay: `${idx * 100 + skillIdx * 30}ms`,
                            animationFillMode: 'both'
                          }}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {hoveredSkill === skill && (
                            <span className="absolute inset-0 bg-indigo-500/10 rounded-md animate-pulse"></span>
                          )}
                          <span className="relative z-10">{skill}</span>
                        </span>
                      ))}
                    </div>
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
