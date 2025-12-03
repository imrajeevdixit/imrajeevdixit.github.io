"use client"

import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { navLinks } from '@/data/portfolio-data'
import { useState, useEffect } from 'react'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const themeClasses = {
    navBg: isDark ? 'bg-slate-950/90' : 'bg-white/90',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    textHeader: isDark ? 'text-slate-100' : 'text-slate-900',
    textMain: isDark ? 'text-slate-300' : 'text-slate-600',
    bgSecondary: isDark ? 'bg-slate-900' : 'bg-white',
    accentHover: isDark ? 'hover:text-indigo-400' : 'hover:text-indigo-600',
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? `${themeClasses.navBg} backdrop-blur-md border-b ${themeClasses.border} py-4` : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div
          className={`text-2xl font-bold ${themeClasses.textHeader} tracking-tight cursor-pointer hover:scale-105 transition-transform duration-300`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Rajeev Dixit<span className="text-indigo-500">.</span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium ${themeClasses.accentHover} transition-colors relative group`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}

          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-full transition-all duration-300 hover:rotate-12 ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className={`px-4 py-2 text-sm font-medium text-indigo-500 border border-indigo-500/30 rounded-full ${isDark ? 'hover:bg-indigo-500/10' : 'hover:bg-indigo-50'} transition-all hover:scale-105 active:scale-95`}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-full transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={themeClasses.textHeader}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full ${themeClasses.bgSecondary} border-b ${themeClasses.border} p-6 flex flex-col gap-4 shadow-xl`}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`text-left text-lg font-medium ${themeClasses.textMain} ${themeClasses.accentHover}`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Header

