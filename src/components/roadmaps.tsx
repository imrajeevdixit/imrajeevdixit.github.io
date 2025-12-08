"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FadeInSection } from '@/components/fade-in-section'
import {
  BookOpen, Brain, Cpu, Rocket, Briefcase,
  TrendingUp, Layers, Terminal, Database,
  Cloud, Activity, ChevronRight, Book, MonitorPlay,
  ExternalLink, Sparkles
} from 'lucide-react'

// --- Data Constants ---

const ARCHETYPES = {
  'ai-engineer': {
    id: 'ai-engineer',
    title: 'AI Engineer',
    icon: Brain,
    focus: 'End-to-End Intelligent Systems',
    desc: 'Builds comprehensive AI solutions (chatbots, vision systems) simulating human intelligence.',
    tools: ["PyTorch", "LangChain", "OpenCV", "GPT APIs"],
    color: 'border-purple-500/50',
    iconColor: 'text-purple-400',
    projections: 'Junior AI Engineer → Senior AI Engineer → Principal AI Engineer'
  },
  'ml-engineer': {
    id: 'ml-engineer',
    title: 'ML Engineer',
    icon: Cpu,
    focus: 'Model Optimization & Scale',
    desc: 'Focuses on productionizing models, MLOps, and ensuring scalability and performance.',
    tools: ["TensorFlow", "Docker", "Kubernetes", "AWS SageMaker"],
    color: 'border-blue-500/50',
    iconColor: 'text-blue-400',
    projections: 'Junior ML Engineer → ML Architect → Engineering Manager'
  },
  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    icon: Activity,
    focus: 'Insights & Math',
    desc: 'Extracts actionable insights from data using statistical methods and ML algorithms.',
    tools: ["Pandas", "Scikit-learn", "Tableau", "SQL"],
    color: 'border-emerald-500/50',
    iconColor: 'text-emerald-400',
    projections: 'Data Analyst → Data Scientist → Chief Data Scientist'
  },
  'ai-generalist': {
    id: 'ai-generalist',
    title: 'AI Generalist',
    icon: Layers,
    focus: 'Applied AI & Strategy',
    desc: 'Leverages pre-built tools and APIs to solve business problems without deep model building.',
    tools: ["Prompt Eng.", "RAG", "No-Code AI", "Zapier"],
    color: 'border-orange-500/50',
    iconColor: 'text-orange-400',
    projections: 'AI Consultant → AI Product Manager → Solutions Architect'
  }
}

const RESOURCES = {
  foundation: [
    { type: 'Course', name: "Andrew Ng's Machine Learning Specialization", link: "Coursera", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
    { type: 'Platform', name: "DataCamp Python Skill Track", link: "DataCamp", url: "https://www.datacamp.com/tracks/python-fundamentals" },
    { type: 'Math', name: "Khan Academy (Linear Algebra/Calc)", link: "Khan Academy", url: "https://www.khanacademy.org/math/linear-algebra" }
  ],
  core: [
    { type: 'Course', name: "Fast.ai Practical Deep Learning", link: "Fast.ai", url: "https://course.fast.ai/" },
    { type: 'Docs', name: "Scikit-Learn User Guide", link: "Scikit-learn.org", url: "https://scikit-learn.org/stable/user_guide.html" },
    { type: 'Library', name: "OpenCV for Computer Vision", link: "OpenCV.org", url: "https://opencv.org/" }
  ],
  mlops: [
    { type: 'Course', name: "DeepLearning.AI MLOps Specialization", link: "Coursera", url: "https://www.coursera.org/specializations/mlops-machine-learning-engineering" },
    { type: 'Guide', name: "IBM MLOps Guide", link: "IBM", url: "https://www.ibm.com/topics/mlops" },
    { type: 'Tool', name: "Docker & Kubernetes Basics", link: "Docker Docs", url: "https://docs.docker.com/get-started/" }
  ],
  specialization: [
    { type: 'Course', name: "Hugging Face NLP Course", link: "Hugging Face", url: "https://huggingface.co/learn/nlp-course/chapter1/1" },
    { type: 'Docs', name: "LangChain Documentation", link: "LangChain", url: "https://python.langchain.com/docs/get_started/introduction" },
    { type: 'Paper', name: "Attention Is All You Need", link: "Arxiv", url: "https://arxiv.org/abs/1706.03762" }
  ]
}

const ROADMAPS = {
  'ai-engineer': [
    {
      phase: "Phase 1: Foundations",
      time: "6-10 Weeks",
      title: "Math & Code Proficiency",
      subtitle: "Master Python, Linear Algebra, and Calculus.",
      details: ["Python (OOP, Debugging)", "NumPy & Pandas Mastery", "Linear Algebra (Vectors/Matrices)", "Git & GitHub"],
      resources: RESOURCES.foundation,
      icon: BookOpen,
      color: "bg-purple-500"
    },
    {
      phase: "Phase 2: Core AI",
      time: "10-14 Weeks",
      title: "Deep Learning & Neural Nets",
      subtitle: "Build the engines of intelligence.",
      details: ["Neural Networks (CNNs, RNNs)", "PyTorch Ecosystem", "Computer Vision (OpenCV)", "NLP Basics"],
      resources: RESOURCES.core,
      icon: Brain,
      color: "bg-purple-600"
    },
    {
      phase: "Phase 3: Production",
      time: "8-12 Weeks",
      title: "MLOps & Deployment",
      subtitle: "Moving from notebook to API.",
      details: ["FastAPI for Model Serving", "Docker Containerization", "Cloud Basics (AWS/GCP)", "Model Monitoring"],
      resources: RESOURCES.mlops,
      icon: Cloud,
      color: "bg-purple-700"
    },
    {
      phase: "Phase 4: Specialization",
      time: "12-16 Weeks",
      title: "GenAI & LLMs",
      subtitle: "The cutting edge of 2025.",
      details: ["Transformers Architecture", "RAG Pipelines", "LangChain & Vector DBs", "Fine-tuning LLMs"],
      resources: RESOURCES.specialization,
      icon: Rocket,
      color: "bg-purple-800"
    }
  ],
  'ml-engineer': [
    {
      phase: "Phase 1: Foundations",
      time: "6-10 Weeks",
      title: "Software Engineering Core",
      subtitle: "Strong CS fundamentals are key.",
      details: ["Python & C++ Basics", "Data Structures & Algorithms", "SQL & Database Design", "Linux/Bash Scripting"],
      resources: RESOURCES.foundation,
      icon: Terminal,
      color: "bg-blue-500"
    },
    {
      phase: "Phase 2: Model Logic",
      time: "10-12 Weeks",
      title: "Machine Learning Internals",
      subtitle: "Understanding how models learn and fail.",
      details: ["Supervised vs Unsupervised", "Gradient Descent Optimization", "Feature Engineering", "Model Evaluation Metrics"],
      resources: RESOURCES.core,
      icon: Cpu,
      color: "bg-blue-600"
    },
    {
      phase: "Phase 3: MLOps Heavy",
      time: "12-16 Weeks",
      title: "CI/CD for ML",
      subtitle: "Automating the lifecycle.",
      details: ["MLFlow / Weights & Biases", "Kubernetes Orchestration", "TFX (TensorFlow Extended)", "Automated Retraining Pipelines"],
      resources: RESOURCES.mlops,
      icon: Cloud,
      color: "bg-blue-700"
    },
    {
      phase: "Phase 4: Scale",
      time: "8-12 Weeks",
      title: "Distributed Training",
      subtitle: "Handling massive datasets.",
      details: ["Distributed Systems", "Spark / Databricks", "Cloud Architecture Patterns", "Latency Optimization"],
      resources: RESOURCES.specialization,
      icon: Database,
      color: "bg-blue-800"
    }
  ],
  'data-scientist': [
    {
      phase: "Phase 1: Foundations",
      time: "8-12 Weeks",
      title: "Statistical Bedrock",
      subtitle: "Math is your primary tool.",
      details: ["Probability Distributions", "Hypothesis Testing", "Descriptive Statistics", "Python for Data Analysis"],
      resources: RESOURCES.foundation,
      icon: Activity,
      color: "bg-emerald-500"
    },
    {
      phase: "Phase 2: Analytics",
      time: "8-10 Weeks",
      title: "Data Wrangling & Viz",
      subtitle: "Turning raw data into stories.",
      details: ["Advanced SQL & Window Functions", "Tableau/PowerBI", "Exploratory Data Analysis (EDA)", "Data Cleaning Pipelines"],
      resources: RESOURCES.core,
      icon: TrendingUp,
      color: "bg-emerald-600"
    },
    {
      phase: "Phase 3: Modeling",
      time: "10-14 Weeks",
      title: "Predictive Algorithms",
      subtitle: "Forecasting the future.",
      details: ["Scikit-Learn Mastery", "Regression & Time Series", "Clustering Algorithms", "Feature Selection"],
      resources: RESOURCES.core,
      icon: Brain,
      color: "bg-emerald-700"
    },
    {
      phase: "Phase 4: Strategy",
      time: "Ongoing",
      title: "Business Intelligence",
      subtitle: "Driving decisions.",
      details: ["A/B Testing", "Causal Inference", "Stakeholder Communication", "Domain Expertise"],
      resources: RESOURCES.specialization,
      icon: Briefcase,
      color: "bg-emerald-800"
    }
  ],
  'ai-generalist': [
    {
      phase: "Phase 1: Literacy",
      time: "4-6 Weeks",
      title: "AI Landscape",
      subtitle: "Knowing what's possible.",
      details: ["History of AI", "Prompt Engineering Basics", "Understanding Limitations", "Ethical AI"],
      resources: RESOURCES.foundation,
      icon: BookOpen,
      color: "bg-orange-500"
    },
    {
      phase: "Phase 2: Application",
      time: "6-8 Weeks",
      title: "No-Code & APIs",
      subtitle: "Building without deep coding.",
      details: ["OpenAI/Anthropic APIs", "Zapier/Make Automation", "RAG Concepts", "Chatbot Builders"],
      resources: RESOURCES.core,
      icon: Layers,
      color: "bg-orange-600"
    },
    {
      phase: "Phase 3: Integration",
      time: "8-10 Weeks",
      title: "Product Building",
      subtitle: "Connecting AI to business.",
      details: ["Basic Python Scripting", "API Integration", "Streamlit for Demos", "Cost Estimation"],
      resources: RESOURCES.specialization,
      icon: Rocket,
      color: "bg-orange-700"
    }
  ]
}

const getProjectsForArchetype = (type: string) => {
  const specific: Record<string, Array<{title: string, level: string, tags: string[], desc: string}>> = {
    'ai-engineer': [
      { title: "RAG Chatbot for PDFs", level: "Advanced", tags: ["LangChain", "VectorDB", "LlamaIndex"], desc: "Chat with your documents using Retrieval Augmented Generation." },
      { title: "Custom Image Classifier", level: "Intermediate", tags: ["PyTorch", "CNN", "Vision"], desc: "Train a ResNet model on a custom dataset (e.g., Indian traffic signs)." },
      { title: "Auto-Agent System", level: "Advanced", tags: ["Agents", "OpenAI"], desc: "Build an autonomous agent that can browse web and summarize news." }
    ],
    'ml-engineer': [
      { title: "End-to-End MLOps Pipeline", level: "Advanced", tags: ["MLflow", "Docker", "Jenkins"], desc: "Automate training, testing, and deployment of a churn prediction model." },
      { title: "Model Serving at Scale", level: "Advanced", tags: ["Kubernetes", "Redis", "Latency"], desc: "Deploy a model with load balancing and caching to handle 1000 req/sec." },
      { title: "Drift Monitoring Dashboard", level: "Intermediate", tags: ["Streamlit", "Statistical Tests"], desc: "Visualize data drift in production models over time." }
    ],
    'data-scientist': [
      { title: "Customer Churn Prediction", level: "Intermediate", tags: ["Scikit-Learn", "XGBoost"], desc: "Predict which customers will leave using tabular data and ensemble methods." },
      { title: "Market Basket Analysis", level: "Beginner", tags: ["Apriori", "Pandas"], desc: "Analyze transaction data to find product associations." },
      { title: "Sales Forecasting Dashboard", level: "Advanced", tags: ["Time Series", "Prophet", "Tableau"], desc: "Forecast next quarter sales with confidence intervals." }
    ],
    'ai-generalist': [
      { title: "No-Code Customer Support", level: "Beginner", tags: ["Zapier", "OpenAI API"], desc: "Automate email responses using GPT-4 and Zapier." },
      { title: "Content Generation Engine", level: "Intermediate", tags: ["Prompt Eng", "Midjourney"], desc: "Workflow to generate blog posts and matching images automatically." },
      { title: "Internal Doc Search", level: "Intermediate", tags: ["RAG", "Streamlit"], desc: "Simple interface to search company handbook using embeddings." }
    ]
  }

  return specific[type] || []
}

export default function Roadmaps() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'landscape' | 'roadmap' | 'portfolio'>('landscape')
  const [selectedArchetype, setSelectedArchetype] = useState<keyof typeof ARCHETYPES>('ai-engineer')
  const [expandedResource, setExpandedResource] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  const handleRoleSelect = (id: keyof typeof ARCHETYPES) => {
    setSelectedArchetype(id)
    setActiveTab('roadmap')
  }

  const toggleResource = (index: number) => {
    setExpandedResource(expandedResource === index ? null : index)
  }

  return (
    <section id="roadmaps" className={`py-24 ${isDark ? 'bg-slate-950/50' : 'bg-white'} relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-200/30'} rounded-full blur-[120px] animate-float-slow`}></div>
        <div className={`absolute bottom-1/3 left-1/3 w-96 h-96 ${isDark ? 'bg-purple-500/5' : 'bg-purple-200/30'} rounded-full blur-[120px] animate-float-delayed`}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="text-indigo-500 animate-pulse" size={32} />
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                AI Career Roadmaps
              </h2>
              <Sparkles className="text-purple-500 animate-pulse" size={32} />
            </div>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} max-w-2xl mx-auto`}>
              Comprehensive learning paths and resources to guide your journey into AI careers
            </p>
          </div>
        </FadeInSection>

        {/* Navigation Tabs */}
        <FadeInSection delay={100}>
          <div className={`flex justify-center space-x-4 mb-12 ${isDark ? 'bg-slate-900/50' : 'bg-slate-100'} p-2 rounded-xl`}>
            <button
              onClick={() => setActiveTab('landscape')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'landscape'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Career Landscape
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Learning Path
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Portfolio Projects
            </button>
          </div>
        </FadeInSection>

        {/* CAREER LANDSCAPE VIEW */}
        {activeTab === 'landscape' && (
          <div className="space-y-12">
            {/* Role Cards */}
            <FadeInSection delay={300}>
              <div>
                <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>Select Your Archetype</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.values(ARCHETYPES).map((role) => {
                    const IconComponent = role.icon
                    return (
                      <div
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id as keyof typeof ARCHETYPES)}
                        className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} rounded-xl p-6 border ${role.color} hover:border-opacity-100 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group h-full flex flex-col`}
                      >
                        <div className={`mb-4 ${role.iconColor} group-hover:scale-110 transition-transform`}>
                          <IconComponent size={32} />
                        </div>
                        <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{role.title}</h4>
                        <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">{role.focus}</p>
                        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} mb-4 flex-grow`}>{role.desc}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {role.tools.slice(0, 3).map(t => (
                            <span key={t} className={`px-2 py-1 ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'} rounded text-[10px] border`}>{t}</span>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center text-indigo-400 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          View Roadmap <ChevronRight size={14} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </FadeInSection>
          </div>
        )}

        {/* ROADMAP TIMELINE VIEW */}
        {activeTab === 'roadmap' && (
          <div className="max-w-4xl mx-auto">
            {/* Archetype Selector */}
            <FadeInSection>
              <div className="mb-10 text-center">
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-widest`}>Current Path</span>
                <div className="flex items-center justify-center space-x-3 mt-2">
                  <span className={`text-3xl font-bold ${ARCHETYPES[selectedArchetype].iconColor}`}>
                    {ARCHETYPES[selectedArchetype].title}
                  </span>
                </div>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} mt-2 max-w-lg mx-auto text-sm`}>
                  {ARCHETYPES[selectedArchetype].desc}
                </p>

                {/* Quick Switcher */}
                <div className="flex justify-center flex-wrap gap-2 mt-6">
                  {Object.values(ARCHETYPES).map(role => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedArchetype(role.id as keyof typeof ARCHETYPES)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                        selectedArchetype === role.id
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : isDark ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500' : 'bg-slate-100 border-slate-300 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {role.title}
                    </button>
                  ))}
                </div>
              </div>
            </FadeInSection>

            {/* Timeline */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {ROADMAPS[selectedArchetype].map((step, index) => {
                const StepIcon = step.icon
                return (
                  <FadeInSection key={index} delay={index * 100}>
                    <div className="relative flex items-start group">
                      {/* Timeline Icon */}
                      <div className={`absolute left-0 md:left-1/2 md:-ml-6 w-12 h-12 rounded-full border-4 ${isDark ? 'border-slate-950 bg-slate-900' : 'border-white bg-slate-100'} shadow-xl flex items-center justify-center z-10`}>
                        <StepIcon className="text-white" size={20} />
                      </div>

                      {/* Content Card */}
                      <div className={`ml-16 md:ml-0 w-full md:w-[calc(50%-3rem)] ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} rounded-xl border shadow-lg overflow-hidden transition-all ${step.phase.includes('1') || step.phase.includes('3') ? 'md:mr-auto' : 'md:ml-auto'}`}>
                        <div className={`h-2 w-full ${step.color}`}></div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white ${step.color}`}>{step.phase}</span>
                            <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{step.time}</span>
                          </div>
                          <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} mb-4 italic`}>{step.subtitle}</p>

                          <ul className="space-y-2 mb-4">
                            {step.details.map((detail, i) => (
                              <li key={i} className={`flex items-start text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full ${step.color}`}></span>
                                {detail}
                              </li>
                            ))}
                          </ul>

                          <button
                            onClick={() => toggleResource(index)}
                            className={`w-full flex items-center justify-center py-2 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'} rounded text-xs font-medium text-indigo-400 transition-colors`}
                          >
                            {expandedResource === index ? 'Hide Resources' : 'View Recommended Resources'}
                            <ChevronRight size={14} className={`ml-1 transition-transform ${expandedResource === index ? 'rotate-90' : ''}`} />
                          </button>

                          {expandedResource === index && (
                            <div className={`mt-4 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                              <h4 className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'} mb-2 uppercase`}>Curated Learning Path</h4>
                              <div className="space-y-2">
                                {step.resources.map((res, i) => (
                                  <a
                                    key={i}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-between p-2 rounded ${isDark ? 'bg-slate-950/50 border-slate-800/50 hover:bg-slate-800 hover:border-indigo-500/50' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-indigo-400/50'} border transition-all group/link`}
                                  >
                                    <div className="flex items-center">
                                      {res.type === 'Course' ? <MonitorPlay size={14} className="text-blue-400 mr-2" /> :
                                        res.type === 'Book' ? <Book size={14} className="text-yellow-400 mr-2" /> :
                                          <ExternalLink size={14} className="text-green-400 mr-2" />}
                                      <span className={`text-xs ${isDark ? 'text-slate-200 group-hover/link:text-indigo-300' : 'text-slate-700 group-hover/link:text-indigo-600'} transition-colors`}>{res.name}</span>
                                    </div>
                                    <span className={`text-[10px] ${isDark ? 'text-slate-500 border-slate-700 group-hover/link:border-indigo-500/30 group-hover/link:text-indigo-400' : 'text-slate-400 border-slate-300 group-hover/link:border-indigo-400 group-hover/link:text-indigo-600'} border px-1 rounded flex items-center`}>
                                      {res.link} <ExternalLink size={8} className="ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </FadeInSection>
                )
              })}
            </div>
          </div>
        )}

        {/* PORTFOLIO PROJECTS VIEW */}
        {activeTab === 'portfolio' && (
          <div>
            <FadeInSection>
              <div className="text-center mb-10">
                <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Build to Get Hired</h3>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Tailored projects to build your portfolio for <span className="text-indigo-400 font-semibold">{ARCHETYPES[selectedArchetype].title}</span> roles.
                </p>
              </div>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {getProjectsForArchetype(selectedArchetype).map((project, index) => (
                <FadeInSection key={index} delay={index * 100}>
                  <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} p-6 rounded-xl border hover:border-indigo-400 transition-all hover:shadow-xl hover:-translate-y-1 group`}>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className={`text-xl font-bold ${isDark ? 'text-slate-100 group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'} transition-colors`}>{project.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${project.level === 'Advanced' ? 'bg-red-900/50 text-red-300' : project.level === 'Intermediate' ? 'bg-blue-900/50 text-blue-300' : 'bg-green-900/50 text-green-300'}`}>
                        {project.level}
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-sm mb-4`}>{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-indigo-300 bg-indigo-900/20 px-2 py-1 rounded border border-indigo-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection delay={300}>
              <div className={`${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100 border-slate-200'} rounded-xl p-8 border`}>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'} flex items-center`}>
                  <TrendingUp className="mr-2 text-green-400" />
                  Career Projections
                </h3>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                  Typical career progression path for this role:
                </p>
                <div className="flex items-center text-indigo-300 font-medium bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/20">
                  {ARCHETYPES[selectedArchetype].projections}
                </div>
              </div>
            </FadeInSection>
          </div>
        )}
      </div>
    </section>
  )
}
