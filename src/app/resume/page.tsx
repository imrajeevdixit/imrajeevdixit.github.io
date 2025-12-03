"use client"

import { experienceData, skillsData } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Download, Mail, Phone, Linkedin, Github, Rss, Sun, Moon } from "lucide-react"

export default function ResumePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  const handleDownloadPDF = () => {
    window.print()
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'} py-8 px-4`}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center print:hidden">
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-3 rounded-full transition-all duration-300 hover:rotate-12 ${isDark ? 'hover:bg-slate-800 text-slate-400 bg-slate-900' : 'hover:bg-slate-100 text-slate-600 bg-white shadow-sm'}`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg"
          >
            <Download size={20} />
            Download as PDF
          </button>
        </div>

        <div id="resume-content" className={`${isDark ? 'bg-slate-900' : 'bg-white'} shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none`}>
          <div className={`${isDark ? 'bg-gradient-to-r from-indigo-900/20 to-purple-900/20' : 'bg-gradient-to-r from-indigo-50 to-purple-50'} p-12 print-header`}>
            <h1 className={`text-5xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-2`}>
              Rajeev Dixit
            </h1>
            <p className={`text-xl ${isDark ? 'text-indigo-400' : 'text-indigo-600'} mb-6 font-medium subtitle`}>
              Cloud Architect | Engineering Manager | AI & Platform Engineering Leader
            </p>

            <div className={`flex flex-wrap gap-4 ${isDark ? 'text-slate-300' : 'text-slate-600'} text-sm`}>
              <a href="mailto:rajeevdixit05@outlook.com" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                <Mail size={16} />
                rajeevdixit05@outlook.com
              </a>
              <a href="tel:+919460121450" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                <Phone size={16} />
                +91-9460121450
              </a>
              <a href="https://www.linkedin.com/in/imrajeevdixit/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                <Linkedin size={16} />
                linkedin.com/in/imrajeevdixit
              </a>
              <a href="https://github.com/imrajeevdixit" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
                <Github size={16} />
                github.com/imrajeevdixit
              </a>
              <a
                href="https://theheuristicreport.beehiiv.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-indigo-500 transition-colors"
              >
                <Rss size={16} />
                theheuristicreport.beehiiv.com
              </a>
            </div>
          </div>

          <div className="p-12 print-compact space-y-10 print-spacing">
            <section className="print-section-spacing">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-4 pb-2 border-b-2 ${isDark ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                Professional Summary
              </h2>
              <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                Accomplished Cloud Architect and Engineering Manager with over a decade of experience bridging resilient distributed systems and next-generation AI platforms. Proven track record of leading high-performing teams at scale across PhonePe, Myntra, and Citrix. Expert in aligning technical strategy with business velocity, driving AI transformation, and building scalable cloud-native architectures.
              </p>
            </section>

            <section className="print-section-spacing">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-6 pb-2 border-b-2 ${isDark ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                Professional Experience
              </h2>
              <div className="space-y-8 print-grid">
                {experienceData.map((job, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-indigo-500 experience-item">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                    <div className="mb-2">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                        {job.role}
                      </h3>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-500 font-medium hover:text-indigo-400 transition-colors underline decoration-indigo-500/30 hover:decoration-indigo-400 print:no-underline"
                          >
                            {job.company}
                          </a>
                        ) : (
                          <p className="text-indigo-500 font-medium">{job.company}</p>
                        )}
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} font-mono`}>
                          {job.period}
                        </p>
                      </div>
                    </div>
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
                      {job.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="print-section-spacing">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-6 pb-2 border-b-2 ${isDark ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                Technical & Strategic Skills
              </h2>
              <div className="grid md:grid-cols-2 gap-6 print-grid">
                {Object.entries(skillsData).map(([category, skills]) => (
                  <div key={category}>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'} mb-3`}>
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 text-xs ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'} rounded-md border skill-tag`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="print-section-spacing">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-4 pb-2 border-b-2 ${isDark ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                Key Achievements
              </h2>
              <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>Spearheaded high-performing engineering teams across global locations</li>
                <li>Led AI transformation initiatives and platform engineering modernization</li>
                <li>Architected and delivered scalable cloud-native solutions serving millions of users</li>
                <li>Established engineering best practices and cultivated continuous learning culture</li>
                <li>Drove cost optimization initiatives while maintaining system reliability and performance</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          @page {
            margin: 0.4in;
            size: letter;
          }
          .print-compact {
            padding: 1.5rem !important;
          }
          .print-header {
            padding: 1.5rem !important;
          }
          .print-spacing {
            margin-bottom: 1.5rem !important;
          }
          .print-section-spacing {
            margin-bottom: 1rem !important;
          }
          .print-grid {
            gap: 0.75rem !important;
          }
          .print-leadership {
            gap: 0.5rem !important;
          }
          h1 {
            font-size: 2rem !important;
            margin-bottom: 0.25rem !important;
          }
          h2 {
            font-size: 1.25rem !important;
            margin-bottom: 0.75rem !important;
            padding-bottom: 0.25rem !important;
          }
          h3 {
            font-size: 1.1rem !important;
          }
          h4 {
            font-size: 0.95rem !important;
            margin-bottom: 0.25rem !important;
          }
          p, li, a, span {
            font-size: 0.85rem !important;
            line-height: 1.4 !important;
          }
          .subtitle {
            font-size: 1.1rem !important;
            margin-bottom: 1rem !important;
          }
          .experience-item {
            margin-bottom: 1rem !important;
            padding-left: 1.25rem !important;
          }
          .leadership-item {
            padding: 0.5rem !important;
          }
          .skill-tag {
            padding: 0.15rem 0.5rem !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  )
}
