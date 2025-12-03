"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { socialLinks } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { Mail, Phone, Send, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function Contact() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer id="contact" className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} relative z-10 overflow-hidden`}>
      {/* Animated background elements */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-200/30'} rounded-full blur-[120px] animate-float`}></div>
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${isDark ? 'bg-purple-500/5' : 'bg-purple-200/30'} rounded-full blur-[120px] animate-float-delayed`}></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative">
        <FadeInSection>
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Send className="text-indigo-500 animate-bounce-gentle" size={36} />
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} hover:scale-105 transition-transform duration-300 cursor-default`}>
                Ready to scale your engineering?
              </h2>
              <Sparkles className="text-yellow-500 animate-spin-slow" size={32} />
            </div>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg hover:text-indigo-500 transition-colors duration-300`}>
              Let&apos;s connect and discuss how I can help drive growth and technical excellence.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <a
              href="mailto:rajeevdixit05@outlook.com"
              className={`group relative flex items-center gap-3 px-8 py-4 ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700' : 'bg-white hover:bg-slate-50 shadow-sm border-slate-200'
              } rounded-xl border hover:text-indigo-500 transition-all hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/20 overflow-hidden`}
            >
              <Mail size={20} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className={`relative z-10 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'} group-hover:text-indigo-500`}>
                rajeevdixit05@outlook.com
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>

            <a
              href="tel:+919460121450"
              className={`group relative flex items-center gap-3 px-8 py-4 ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700' : 'bg-white hover:bg-slate-50 shadow-sm border-slate-200'
              } rounded-xl border hover:text-indigo-500 transition-all hover:scale-110 hover:shadow-2xl hover:shadow-indigo-500/20 overflow-hidden`}
            >
              <Phone size={20} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className={`relative z-10 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'} group-hover:text-indigo-500`}>
                +91-9460121450
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className={`flex justify-center gap-8 mb-12 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="relative group"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                aria-label={link.label}
              >
                <div className="relative">
                  <link.icon
                    size={24}
                    className={`text-indigo-500 hover:text-indigo-400 transition-all duration-300 ${
                      hoveredLink === index ? 'scale-125 -translate-y-2 rotate-12' : ''
                    }`}
                  />
                  {/* Animated glow on hover */}
                  {hoveredLink === index && (
                    <>
                      <span className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl animate-ping"></span>
                      <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-md animate-spin-slow"></span>
                    </>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className={`relative inline-block ${isDark ? 'text-slate-500' : 'text-slate-400'} text-sm`}>
            <div className={`px-6 py-3 rounded-full ${isDark ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${isDark ? 'border-slate-800' : 'border-slate-200'} hover:scale-105 transition-all duration-300 cursor-default`}>
              © {new Date().getFullYear()} Rajeev Dixit. All rights reserved.
            </div>
          </div>
        </FadeInSection>

        {/* Decorative elements */}
        <div className="absolute bottom-4 left-4 opacity-20">
          <Sparkles className="text-indigo-500 animate-float-icon" size={20} />
        </div>
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="text-purple-500 animate-float-icon" size={20} style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </footer>
  )
}

