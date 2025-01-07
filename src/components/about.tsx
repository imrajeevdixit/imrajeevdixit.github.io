"use client"

import { motion } from 'framer-motion'
import { SectionWrapper } from "./section-wrapper"
import { useTypewriter } from "@/hooks/useTypewriter"
import { cn } from "@/lib/utils"

const colors = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-pink-400",
  "from-yellow-500 to-orange-400",
  "from-green-500 to-emerald-400",
  "from-rose-500 to-red-400",
  "from-indigo-500 to-violet-400",
  "from-teal-500 to-cyan-400",
]

export default function About() {
  const skills = [
    "System Design Guru",
    "Building for Scale",
    "Architecting Solutions",
    "Harnessing the Cloud",
    "Data-Driven Insights",
    "Guiding Future Engineers",
    "Mentorship & Growth"
  ]

  const focusText = useTypewriter(
    "Leading engineering initiatives that drive innovation and technical excellence, while mentoring the next generation of engineering leaders.",
    { speed: 30, delay: 500 }
  )

  return (
    <SectionWrapper index={1}>
      <motion.section 
        className="min-h-screen flex items-center px-8 sm:px-16 lg:px-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">WHAT I DO</h2>
            <motion.p 
              className="text-xl text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {focusText}
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.button
                key={skill}
                className={cn(
                  "relative p-4 rounded-xl overflow-hidden group",
                  "bg-gradient-to-r",
                  colors[index]
                )}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute inset-0 bg-white dark:bg-black opacity-90 group-hover:opacity-80 transition-opacity"
                />
                <motion.span 
                  className="relative text-lg font-medium"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {skill}
                </motion.span>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r w-0 group-hover:w-full transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${colors[index].split(' ')[0].replace('from-', '')}, ${colors[index].split(' ')[1].replace('to-', '')})`
                  }}
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </SectionWrapper>
  )
}

