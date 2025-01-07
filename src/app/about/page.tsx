"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="min-h-screen pt-32 px-8 sm:px-16 lg:px-32">
      <motion.div 
        className="max-w-screen-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">ABOUT</h1>
        
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6 text-zinc-400">
            <p>
              With over a decade of experience in software development and team leadership, 
              I specialize in building and scaling engineering teams that deliver exceptional results.
            </p>
            <p>
              My approach combines technical expertise with strong leadership skills, 
              focusing on fostering innovation, mentoring talent, and driving organizational growth.
            </p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">EXPERTISE</h2>
              <ul className="grid grid-cols-2 gap-2 text-zinc-400">
                <li>Team Leadership</li>
                <li>Technical Strategy</li>
                <li>Agile Methodologies</li>
                <li>System Architecture</li>
                <li>Cloud Technologies</li>
                <li>Performance Optimization</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">CURRENT FOCUS</h2>
              <p className="text-zinc-400">
                Leading engineering initiatives that drive innovation and technical excellence, 
                while mentoring the next generation of engineering leaders.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

