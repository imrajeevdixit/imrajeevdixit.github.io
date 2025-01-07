"use client"

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NavLink = ({ href, children, onClick }: { 
  href: string
  children: React.ReactNode
  onClick?: () => void 
}) => {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  const isActive = pathname === href

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      
      // If we're not on the home page, navigate to home first
      if (pathname !== '/') {
        window.location.href = `/${href}`
      } else {
        // If we're already on home page, just scroll
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
      onClick?.()
    }
  }

  return (
    <Link 
      href={href.startsWith('#') && pathname !== '/' ? `/${href}` : href}
      className="relative text-sm group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <span className={`relative z-10 ${isActive ? 'text-foreground' : 'text-muted-foreground'} transition-colors duration-200 group-hover:text-foreground`}>
        {children}
      </span>
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-primary/60 to-primary w-0 group-hover:w-full"
        initial={false}
        animate={{
          width: isHovered || isActive ? "100%" : "0%",
          opacity: isHovered || isActive ? 1 : 0
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut"
        }}
      />
    </Link>
  )
}

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-8">
        <Link href="/" className="text-3xl font-bold">
          RD
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#about">ABOUT</NavLink>
          <NavLink href="/resume.pdf">RESUME</NavLink>
          <NavLink href="/blog">BLOG</NavLink>
          <NavLink href="#contact">CONTACT</NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-background border-b border-border/40 md:hidden"
            >
              <nav className="flex flex-col items-center py-4 gap-4">
                <NavLink href="#about" onClick={closeMenu}>ABOUT</NavLink>
                <NavLink href="/resume.pdf" onClick={closeMenu}>RESUME</NavLink>
                <NavLink href="/blog" onClick={closeMenu}>BLOG</NavLink>
                <NavLink href="#contact" onClick={closeMenu}>CONTACT</NavLink>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header

