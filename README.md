# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 15, featuring dark mode support, smooth animations, and a dedicated resume page with PDF export.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- next-themes (Dark mode)
- Lucide Icons

## Getting Started

**Install dependencies:**
```bash
npm install
```

**Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Build for production:**
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── resume/
│   │   └── page.tsx          # Resume page with PDF export
│   └── layout.tsx
├── components/
│   ├── header.tsx            # Navigation with theme toggle
│   ├── hero.tsx              # Hero section with profile
│   ├── experience.tsx        # Professional journey timeline
│   ├── skills.tsx            # Technical skills grid
│   ├── leadership.tsx        # Leadership philosophy
│   ├── contact.tsx           # Contact footer
│   └── fade-in-section.tsx   # Animation wrapper
└── data/
    └── portfolio-data.ts     # Centralized content data
```

## Customization

All content is centralized in [src/data/portfolio-data.ts](src/data/portfolio-data.ts). Update the following exports:
- `socialLinks` - Social media links
- `navLinks` - Navigation items
- `skillsData` - Technical skills by category
- `experienceData` - Professional experience
- `leadershipPhilosophy` - Leadership principles

---

**License:** MIT

