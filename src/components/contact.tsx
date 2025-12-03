"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { socialLinks } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { Mail, Phone } from "lucide-react"
import { useState, useEffect } from "react"

export default function Contact() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer id="contact" className={`py-12 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} relative z-10`}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeInSection>
          <h2 className={`text-3xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-6`}>Ready to scale your engineering?</h2>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} mb-8`}>Let&apos;s connect and discuss how I can help drive growth and technical excellence.</p>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <a href="mailto:rajeevdixit05@outlook.com" className={`flex items-center gap-2 px-6 py-3 ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white hover:bg-slate-50 shadow-sm border border-slate-200'} rounded-lg ${isDark ? 'text-slate-300' : 'text-slate-600'} hover:text-indigo-500 transition-all hover:scale-105 hover:shadow-lg`}>
              <Mail size={18} /> rajeevdixit05@outlook.com
            </a>
            <a href="tel:+919460121450" className={`flex items-center gap-2 px-6 py-3 ${isDark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-white hover:bg-slate-50 shadow-sm border border-slate-200'} rounded-lg ${isDark ? 'text-slate-300' : 'text-slate-600'} hover:text-indigo-500 transition-all hover:scale-105 hover:shadow-lg`}>
              <Phone size={18} /> +91-9460121450
            </a>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className={`flex justify-center gap-6 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className="hover:text-indigo-500 transition-all hover:scale-125 hover:-translate-y-1" target="_blank" rel="noreferrer">
                <link.icon size={20} />
              </a>
            ))}
          </div>

          <div className={`mt-12 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            © {new Date().getFullYear()} Rajeev Dixit. All rights reserved.
          </div>
        </FadeInSection>
      </div>
    </footer>
  )
}

