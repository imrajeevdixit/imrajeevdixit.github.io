"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTypewriter } from "@/hooks/useTypewriter"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, FileText } from "lucide-react"
import Link from "next/link"
import { SectionWrapper } from "./section-wrapper"

const BackgroundGradient = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 animate-gradient" />
    <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
  </div>
)

const highlightGradient = "bg-gradient-to-r from-yellow-500 via-yellow-500/80 to-yellow-500/50 dark:from-yellow-500 dark:via-yellow-500/80 dark:to-yellow-500/50 bg-clip-text text-transparent font-bold"

export default function Hero() {
  const greeting = useTypewriter("Hello there!", {
    speed: 50,
    delay: 0,
    repeat: true,
    pauseTime: 3000
  })

  const line1 = useTypewriter(
    "I'm a software engineer who builds high-impact products and leads high-performing teams.",
    { speed: 30, delay: 1000 }
  )

  return (
    <SectionWrapper index={0}>
      <div className="relative min-h-[80vh] pt-32 px-8 sm:px-16 lg:px-32 flex items-center overflow-hidden">
        <BackgroundGradient />
        
        <motion.div 
          className="max-w-screen-xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              👋🏻 <span className={highlightGradient}>{greeting}</span>
            </h1>
            
            <div className="space-y-6">
              <motion.p 
                className="text-xl text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {line1}
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button asChild className="group">
                  <a href="public/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    My Resume
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact" className="group">
                    Get in Touch
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <motion.div 
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse" />
              <motion.div 
                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/20"
                animate={{ 
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="public/images/profile1.png"
                  alt="Rajeev Dixit"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

