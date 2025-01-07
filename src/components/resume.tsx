"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const Resume = () => {
  const experiences = [
    {
      title: "Engineering Manager",
      company: "Tech Innovators Inc.",
      period: "2019 - Present",
      description: "Leading a team of 15 engineers, overseeing multiple product lines, and driving technical strategy."
    },
    {
      title: "Senior Software Engineer",
      company: "Future Systems Ltd.",
      period: "2015 - 2019",
      description: "Architected and implemented scalable cloud solutions, mentored junior developers, and contributed to open-source projects."
    },
    {
      title: "Software Engineer",
      company: "CodeCrafters Co.",
      period: "2012 - 2015",
      description: "Developed robust backend services and RESTful APIs, collaborated with cross-functional teams to deliver high-quality software products."
    }
  ]

  return (
    <motion.section 
      id="resume"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-6">Resume</h2>
      <div className="space-y-6 mb-8">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">{exp.title}</h3>
            <p className="text-muted-foreground">{exp.company} | {exp.period}</p>
            <p className="mt-2">{exp.description}</p>
          </motion.div>
        ))}
      </div>
      <Button asChild>
        <a href="/path-to-your-resume.pdf" target="_blank" rel="noopener noreferrer">Download Full Resume</a>
      </Button>
    </motion.section>
  )
}

export default Resume

