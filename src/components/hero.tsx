"use client"

import { FadeInSection } from "@/components/fade-in-section"
import { socialLinks } from "@/data/portfolio-data"
import { useTheme } from "next-themes"
import { useState, useEffect, useRef } from "react"
import { Sparkles, Code2, Cpu, Zap, Brain, Rocket } from "lucide-react"

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fullText = "Empowering Stronger Teams.";

  useEffect(() => {
    setMounted(true);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    // Particle canvas animation
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
          x: number;
          y: number;
          vx: number;
          vy: number;
          size: number;
        }> = [];

        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
          });
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = theme === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.15)';

          particles.forEach((particle) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          });

          requestAnimationFrame(animate);
        };

        animate();
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(typingInterval);
    };
  }, [theme]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <section id="about" className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-[90vh] z-10 overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
      />

      {/* Animated Background Blobs */}
      {isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px] animate-float"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-float-delayed"
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          ></div>
          <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-cyan-900/5 rounded-full blur-[100px] animate-float-slow"></div>
        </div>
      )}

      {/* Floating Icons Animation - More icons */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Sparkles
          className="absolute top-[20%] right-[15%] text-indigo-500 animate-float-icon"
          size={24}
          style={{ animationDelay: '0s' }}
        />
        <Code2
          className="absolute top-[60%] right-[25%] text-purple-500 animate-float-icon"
          size={28}
          style={{ animationDelay: '2s' }}
        />
        <Cpu
          className="absolute top-[40%] right-[10%] text-cyan-500 animate-float-icon"
          size={26}
          style={{ animationDelay: '4s' }}
        />
        <Zap
          className="absolute top-[30%] left-[10%] text-yellow-500 animate-float-icon"
          size={22}
          style={{ animationDelay: '1s' }}
        />
        <Brain
          className="absolute bottom-[30%] left-[15%] text-pink-500 animate-float-icon"
          size={24}
          style={{ animationDelay: '3s' }}
        />
        <Rocket
          className="absolute top-[70%] right-[15%] text-green-500 animate-float-icon"
          size={26}
          style={{ animationDelay: '5s' }}
        />
      </div>

      <div className="flex flex-col items-start justify-center relative">
        <FadeInSection>
          <div className={`inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold tracking-wider text-indigo-500 uppercase ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'} rounded-full border border-indigo-500/20 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-default group`}>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            AI. Tech. Leadership
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <h1 className={`text-5xl md:text-7xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'} mb-6 leading-tight`}>
            <span className="inline-block hover:scale-105 transition-transform duration-300 cursor-default animate-bounce-gentle">
              Building Smarter Systems.
            </span>
            <br />
            <span className="relative inline-block group">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:300%_300%] animate-gradient">
                {typedText}
                {isTyping && <span className="animate-blink">|</span>}
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 animate-pulse-glow"></span>
            </span>
          </h1>
        </FadeInSection>

        <FadeInSection delay={200}>
          <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-2xl mb-10 leading-relaxed hover:text-slate-300 transition-colors duration-300`}>
            Over a decade of experience bridging the gap between resilient distributed systems and the future of Generative AI and Autonomous Workflows. I align technical strategy with business velocity to build the next generation of platforms.
          </p>
        </FadeInSection>

        <FadeInSection delay={300}>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium overflow-hidden transition-all hover:scale-105 active:scale-95 animate-shimmer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] animate-gradient-slow opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute inset-0 shadow-lg shadow-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className={`group px-8 py-3 ${isDark ? 'bg-slate-800 text-slate-200 border-slate-700 hover:border-indigo-500/50' : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:border-indigo-300'} rounded-lg font-medium transition-all border hover:scale-105 active:scale-95 hover:shadow-lg relative overflow-hidden`}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <Rocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <span className={`absolute inset-0 ${isDark ? 'bg-indigo-500/5' : 'bg-indigo-50'} translate-y-full group-hover:translate-y-0 transition-transform duration-300`}></span>
            </button>
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className={`mt-16 flex gap-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="relative text-indigo-500 hover:text-indigo-400 transition-all hover:-translate-y-2 hover:scale-125 hover:rotate-12 group animate-float-in"
                aria-label={link.label}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <link.icon size={24} className="relative z-10 group-hover:animate-spin-slow" />
                <span className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150 animate-pulse"></span>
                <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity"></span>
              </a>
            ))}
          </div>
        </FadeInSection>

        {/* Animated Scroll Indicator */}
        <FadeInSection delay={500}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce">
            <div className={`w-6 h-10 border-2 ${isDark ? 'border-slate-700' : 'border-slate-300'} rounded-full flex items-start justify-center p-2`}>
              <div className={`w-1.5 h-1.5 ${isDark ? 'bg-slate-600' : 'bg-slate-400'} rounded-full animate-scroll-indicator`}></div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}

