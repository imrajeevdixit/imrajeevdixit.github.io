import Roadmaps from "@/components/roadmaps"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Career Roadmaps | Rajeev Dixit",
  description: "Comprehensive learning paths for AI careers in the Indian tech ecosystem - 2025 Edition. Explore roadmaps for AI Engineer, ML Engineer, Data Scientist, and AI Generalist roles.",
}

export default function RoadmapsPage() {
  return <Roadmaps />
}
