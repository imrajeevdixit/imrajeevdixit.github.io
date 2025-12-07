import { Linkedin, Github, Mail, Phone } from 'lucide-react';
import { BeehiivIcon } from '@/components/beehiiv-icon';

export const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/imrajeevdixit/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/imrajeevdixit", label: "Github" },
  { icon: BeehiivIcon, href: "https://theheuristicreport.beehiiv.com/", label: "Newsletter" },
  { icon: Mail, href: "mailto:rajeevdixit05@outlook.com", label: "Email" },
  { icon: Phone, href: "tel:+919460121450", label: "Phone" },
];

export const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Contact', id: 'contact' },
];

export const skillsData = {
  "Strategic AI Leadership": [
    "AI Transformation Strategy", "Responsible AI Frameworks", "AI Governance & Compliance",
    "Tech Strategy & Roadmapping", "Org Design & Hiring", "OKRs & KPI Management",
    "Cost Optimization (FinOps)"
  ],
  "Gen AI & LLM Stack": [
    "Agentic Workflows", "RAG Pipelines", "Multi-Agent Orchestration (LangGraph)",
    "Model Fine-tuning (LoRA/PEFT)", "Guardrails & Safety (NeMo/LlamaGuard)",
    "Prompt Engineering", "Evaluation Frameworks (RAGAS)"
  ],
  "Architecture & Cloud": [
    "Distributed Systems", "Event-Driven Architecture", "Microservices Patterns",
    "Azure OpenAI / AI Search", "AWS / GCP / Azure", "Docker / Kubernetes",
    "Apache Kafka", "CI/CD Pipelines", "High-Scale System Design"
  ],
  "Programming & Frameworks": [
    "Python", "Go", "Java", "JavaScript / TypeScript", "Node.js / Express.js",
    "React.js / Next.js", "Spring Boot / Dropwizard", "FastAPI / Flask"
  ],
  "Data & Storage": [
    "PostgreSQL", "MongoDB", "Redis", "Aerospike", "ElasticSearch",
    "Vector DBs (Pinecone/Weaviate)", "SQL / NoSQL", "Data Pipelines"
  ]
};

export const experienceData = [
  {
    company: "ClearRoute",
    companyUrl: "https://www.clearroute.io/",
    role: "Cloud Architect",
    period: "Mar 2025 - Present",
    desc: "Driving Cloud, Platform Engineering, and Developer Experience initiatives. Guiding teams through large-scale modernization at a global platform engineering consultancy."
  },
  {
    company: "Truworth Wellness",
    companyUrl: "https://www.truworthwellness.com/",
    role: "Engineering Manager",
    period: "Oct 2024 - Mar 2025",
    desc: "Led Health & Wellness Platform engineering, focusing on scalable architecture, performance management, and observability pipelines."
  },
  {
    company: "PhonePe",
    companyUrl: "https://www.phonepe.com/",
    role: "Engineering Lead / Manager",
    period: "Sep 2022 - Sep 2024",
    desc: "Managed Payment Gateway & Insurance Aggregator Platform initiatives."
  },
  {
    company: "Myntra",
    companyUrl: "https://www.myntra.com/",
    role: "Technical Lead",
    period: "Nov 2019 - Sep 2022",
    desc: "Led backend engineering and cross-functional teams building scalable microservices at India's leading fashion e-commerce platform."
  },
  {
    company: "Citrix R&D",
    companyUrl: "https://www.citrix.com/",
    role: "Software Engineer",
    period: "Apr 2016 - Oct 2019",
    desc: "Developed full-stack features and backend services for Enterprise Mobility Management Platform."
  },
  {
    company: "UrbanPro.com",
    companyUrl: "https://www.urbanpro.com/",
    role: "Software Developer",
    period: "Jun 2015 - Apr 2016",
    desc: "Developed user interfaces and robust APIs for mobile application development."
  }
];

export const leadershipPhilosophy = [
  { title: "Responsible AI & Ethics", desc: "Embedding safety, fairness, bias mitigation, and data privacy checks into the core of the development lifecycle." },
  { title: "AI-Augmented Productivity", desc: "Leveraging GenAI coding assistants and automated reasoning to reduce toil and accelerate the SDLC." },
  { title: "Psychological Safety", desc: "Building trust for teams to experiment with non-deterministic AI outcomes without fear of failure." },
  { title: "Strategic AI Vision", desc: "Distinguishing transformative AI utility from hype to drive real business value and sustainable adoption." },
  { title: "Data-First Culture", desc: "Treating data quality, lineage, and governance as the primary citizen in the AI engineering stack." },
  { title: "Operational Resilience", desc: "Designing probabilistic AI systems with robust fallbacks, guardrails, and human-in-the-loop safeguards." },
  { title: "Continuous AI Upskilling", desc: "Preparing the engineering workforce for the AI shift through active learning and tool adoption." },
  { title: "Tech Debt & Governance", desc: "Balancing feature velocity with the unique technical debt accrued by ML models and rapid prototyping." },
  { title: "User-Centric Innovation", desc: "Bridging the gap between complex model capabilities and tangible user value." }
];
