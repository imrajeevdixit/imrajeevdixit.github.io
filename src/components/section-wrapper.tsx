"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  index?: number
}

export function SectionWrapper({ children, className, index = 0 }: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative min-h-screen w-full overflow-hidden",
        "before:absolute before:inset-0 before:z-0 before:bg-background/80 before:backdrop-blur-sm",
        "after:absolute after:inset-0 after:-skew-y-3 after:origin-top-right after:z-[-1] after:bg-background",
        className
      )}
      style={{
        zIndex: 10 - index,
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  )
} 