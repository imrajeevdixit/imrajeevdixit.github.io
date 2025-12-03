"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { leadershipPhilosophy } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { Target } from "lucide-react"
import { useState, useEffect } from "react"

export default function Leadership() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto relative z-10">
      <FadeInSection>
        <div className="max-w-6xl mx-auto">
          <div className={`p-8 md:p-12 rounded-2xl border ${isDark ? 'border-indigo-500/10 bg-gradient-to-br from-indigo-900/10 to-slate-950' : 'border-indigo-100 bg-gradient-to-br from-indigo-50 to-white shadow-sm'} transition-all duration-500 hover:shadow-xl`}>
            <h3 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-8 flex items-center gap-3`}>
              <Target className="text-indigo-500" />
              Leadership & Engineering Philosophy
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipPhilosophy.map((item, idx) => (
                <div key={idx} className="group p-4 rounded-lg hover:bg-indigo-500/5 transition-colors duration-300">
                  <h4 className={`text-lg font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'} mb-2 group-hover:text-indigo-500 transition-colors`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} leading-relaxed group-hover:text-slate-500`}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className={`mt-10 pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} text-center ${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm italic`}>
              "Spearheaded high-performing engineering teams across global locations, cultivating a collaborative environment that prioritized continuous learning."
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
