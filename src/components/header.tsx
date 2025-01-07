"use client"

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  const isActive = pathname === href

  return (
    <Link 
      href={href}
      className="relative text-sm group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-8">
        <div 
          className="relative w-[200px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href="/" className="text-3xl font-bold block relative whitespace-nowrap">
            <motion.span
              className="block"
              animate={{
                opacity: isHovered ? 0 : 1,
                x: isHovered ? -10 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              RD
            </motion.span>
            <motion.span
              className="absolute left-0 top-0 whitespace-nowrap"
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
            >
              Rajeev Dixit
            </motion.span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-8">
          <NavLink href="/about">ABOUT</NavLink>
          <NavLink href="/resume.pdf">RESUME</NavLink>
          <NavLink href="/blog">BLOG</NavLink>
          <NavLink href="/contact">CONTACT</NavLink>
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
      </div>
    </motion.header>
  )
}

export default Header

