"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Blog = () => {
  const posts = [
    {
      title: "The Future of AI in Software Development",
      description: "Exploring how artificial intelligence is reshaping the landscape of software engineering.",
      date: "January 1, 2025"
    },
    {
      title: "Building Scalable Microservices Architecture",
      description: "A deep dive into designing and implementing robust microservices for large-scale applications.",
      date: "January 7, 2025"
    },
    {
      title: "The Importance of Emotional Intelligence in Tech Leadership",
      description: "How EQ plays a crucial role in effective engineering management and team dynamics.",
      date: "December 22, 2024"
    }
  ]

  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-12">Blog</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Blog

