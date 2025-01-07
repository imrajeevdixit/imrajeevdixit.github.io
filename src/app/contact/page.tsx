"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen pt-32 px-8 sm:px-16 lg:px-32 flex items-center justify-center">
      <motion.div 
        className="max-w-screen-xl mx-auto w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">GET IN TOUCH</h1>
        
        {submitted ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-zinc-400"
          >
            Thank you for your message. I&apos;ll get back to you soon.
          </motion.p>
        ) : (
          <form 
            action="https://formspree.io/f/your-formspree-endpoint"
            method="POST"
            onSubmit={() => setSubmitted(true)}
            className="max-w-md mx-auto space-y-8"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-muted-foreground block text-center">NAME</label>
              <Input
                id="name"
                name="name"
                required
                className="bg-zinc-900/50 border-zinc-800 focus:border-white transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-muted-foreground block text-center">EMAIL</label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-zinc-900/50 border-zinc-800 focus:border-white transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm text-muted-foreground block text-center">MESSAGE</label>
              <Textarea
                id="message"
                name="message"
                required
                className="bg-zinc-900/50 border-zinc-800 focus:border-white transition-colors min-h-[150px]"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-zinc-200 transition-colors"
            >
              Send Message
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

