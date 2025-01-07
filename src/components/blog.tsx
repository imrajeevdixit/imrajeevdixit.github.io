"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Blog = () => {
  const posts = [
    {
      title: "The Future of AI in Software Development",
      description: "Exploring how artificial intelligence is reshaping the landscape of software engineering.",
      date: "June 15, 2023"
    },
    {
      title: "Building Scalable Microservices Architecture",
      description: "A deep dive into designing and implementing robust microservices for large-scale applications.",
      date: "May 22, 2023"
    },
    {
      title: "The Importance of Emotional Intelligence in Tech Leadership",
      description: "How EQ plays a crucial role in effective engineering management and team dynamics.",
      date: "April 10, 2023"
    }
  ]

  return (
    <motion.section 
      id="blog"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-6">Blog</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{post.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Blog

