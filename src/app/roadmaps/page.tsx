import Roadmaps from "@/components/roadmaps"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Career Roadmaps | Rajeev Dixit",
  description: "Comprehensive learning paths and resources to guide your journey into AI careers. Explore roadmaps for AI Engineer, ML Engineer, Data Scientist, and AI Generalist roles.",
}

export default function RoadmapsPage() {
  return <Roadmaps />
}
