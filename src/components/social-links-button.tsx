"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Users2, Github, Linkedin, X as XIcon } from 'lucide-react'

export function SocialLinksButton() {
  const [isOpen, setIsOpen] = useState(false)

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/rajeevdixit05',
      color: 'bg-[#333333] hover:bg-[#24292e]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/rajeevdixit05',
      color: 'bg-[#0077b5] hover:bg-[#006399]'
    },
    {
      name: 'X',
      icon: XIcon,
      href: 'https://x.com/imrajeevd',
      color: 'bg-black hover:bg-[#111111]'
    }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 border-none relative z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XIcon className="h-5 w-5 text-white" />
        ) : (
          <Users2 className="h-5 w-5 text-white" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[calc(100%+0.5rem)] right-0 flex flex-col-reverse gap-3 items-center"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center h-10 w-10 rounded-full shadow-lg ${link.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }}
                exit={{ 
                  opacity: 0,
                  y: 20,
                  transition: {
                    duration: 0.2,
                    delay: (socialLinks.length - 1 - index) * 0.05
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5 text-white" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 