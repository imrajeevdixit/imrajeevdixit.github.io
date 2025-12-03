import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			gradient: {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' }
  			},
  			'gradient-slow': {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' }
  			},
  			blob: {
  				'0%, 100%': { transform: 'translate(0, 0) scale(1)' },
  				'25%': { transform: 'translate(20px, -30px) scale(1.1)' },
  				'50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
  				'75%': { transform: 'translate(-30px, -20px) scale(1.1)' },
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-20px)' },
  			},
  			'float-delayed': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-30px)' },
  			},
  			'float-slow': {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-15px)' },
  			},
  			'float-icon': {
  				'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
  				'25%': { transform: 'translateY(-10px) rotate(5deg)' },
  				'50%': { transform: 'translateY(-20px) rotate(0deg)' },
  				'75%': { transform: 'translateY(-10px) rotate(-5deg)' },
  			},
  			'float-in': {
  				'0%': { opacity: '0', transform: 'translateY(20px) scale(0.8)' },
  				'100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
  			},
  			'scroll-indicator': {
  				'0%': { transform: 'translateY(0)', opacity: '1' },
  				'100%': { transform: 'translateY(12px)', opacity: '0' },
  			},
  			'bounce-gentle': {
  				'0%, 100%': { transform: 'translateY(0)' },
  				'50%': { transform: 'translateY(-5px)' },
  			},
  			blink: {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0' },
  			},
  			'pulse-glow': {
  				'0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
  				'50%': { opacity: '1', transform: 'scale(1.05)' },
  			},
  			shimmer: {
  				'0%': { backgroundPosition: '-200% 0' },
  				'100%': { backgroundPosition: '200% 0' },
  			},
  			'spin-slow': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' },
  			},
  		},
  		animation: {
  			gradient: 'gradient 8s ease infinite',
  			'gradient-slow': 'gradient-slow 4s ease infinite',
  			blob: 'blob 10s infinite',
  			float: 'float 6s ease-in-out infinite',
  			'float-delayed': 'float-delayed 8s ease-in-out infinite',
  			'float-slow': 'float-slow 10s ease-in-out infinite',
  			'float-icon': 'float-icon 6s ease-in-out infinite',
  			'float-in': 'float-in 0.6s ease-out',
  			'scroll-indicator': 'scroll-indicator 2s ease-in-out infinite',
  			'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
  			blink: 'blink 1s step-end infinite',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			shimmer: 'shimmer 3s linear infinite',
  			'spin-slow': 'spin-slow 3s linear infinite',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
