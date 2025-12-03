"use client"

import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { navLinks } from '@/data/portfolio-data'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  // Hide header on resume page
  if (pathname === '/resume') return null

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

          <a href="/resume" className={`px-4 py-2 text-sm font-medium text-indigo-500 border border-indigo-500/30 rounded-full ${isDark ? 'hover:bg-indigo-500/10' : 'hover:bg-indigo-50'} transition-all hover:scale-105 active:scale-95`}>
            Resume
          </a>

          <div className="relative w-12 h-12 ml-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-md animate-pulse"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-lg hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/profile.png"
                alt="Rajeev Dixit"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
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
        <div className={`md:hidden absolute top-full left-0 w-full ${themeClasses.bgSecondary} border-b ${themeClasses.border} p-6 flex flex-col gap-4 shadow-xl backdrop-blur-md`}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className={`text-left text-lg font-medium ${themeClasses.textMain} ${themeClasses.accentHover} transition-colors`}
            >
              {link.name}
            </button>
          ))}
          
          {/* Resume Link */}
          <a 
            href="/resume" 
            className={`text-left text-lg font-medium text-indigo-500 border-t ${themeClasses.border} pt-4 ${themeClasses.accentHover} transition-colors flex items-center gap-2`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span>Resume</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500">View</span>
          </a>
        </div>
      )}
    </nav>
  )
}

export default Header

