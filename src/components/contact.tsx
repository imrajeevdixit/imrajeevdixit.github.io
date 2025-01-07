"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SectionWrapper } from "./section-wrapper"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('https://formspree.io/f/meooprya', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionWrapper index={2}>
      <motion.section 
        id="contact"
        className="h-screen flex items-center px-8 sm:px-16 lg:px-32"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="max-w-screen-xl mx-auto w-full text-center">
          <h2 className="text-3xl font-bold mb-12">GET IN TOUCH</h2>
          
          {submitted ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-muted-foreground"
            >
              Thank you for your message. I&apos;ll get back to you soon.
            </motion.p>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              className="max-w-md mx-auto space-y-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-muted-foreground block text-center">NAME</label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="bg-background/50 border-muted focus:border-foreground transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-muted-foreground block text-center">EMAIL</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-background/50 border-muted focus:border-foreground transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-muted-foreground block text-center">MESSAGE</label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  className="bg-background/50 border-muted focus:border-foreground transition-colors min-h-[150px]"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-muted-foreground transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </motion.form>
          )}
        </div>
      </motion.section>
    </SectionWrapper>
  )
}

