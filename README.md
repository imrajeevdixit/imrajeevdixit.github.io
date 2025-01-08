# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring smooth animations, dark mode support, and a clean design.

## Features

- 🎨 Modern UI/UX with Tailwind CSS
- 🌓 Dark/Light mode support
- ✨ Smooth page transitions and animations using Framer Motion
- 📱 Fully responsive design
- 🔄 Interactive typewriter effect
- 📝 Blog section
- 📬 Contact form integration with Formspree
- 🔗 Social media integration
- 📜 Smooth scrolling navigation
- 🎯 Section-based snap scrolling

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icons
- [Formspree](https://formspree.io/) - Form handling
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/rajeevdixit05/rajeevdixit05.github.io.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory and add your Formspree endpoint:
```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app directory
├── components/         # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Global styles
```

## Customization

1. Update personal information in respective components
2. Modify theme colors in `globals.css`
3. Add/modify blog posts in the `Blog` component
4. Update social links in `social-links-button.tsx`

## Deployment

There are many ways to deploy your Next.js app. Here are a few options:

**Easiest and Free:**

* **GitHub Pages:** This is the easiest and most affordable way to deploy, especially for personal projects or small websites. It's completely free and integrates seamlessly with your GitHub repository.  

**Alternative with a Generous Free Tier:**

* **Vercel:**  Vercel is a popular platform for deploying Next.js apps, offering a generous free tier and excellent performance optimizations. [Get started with Vercel](https://vercel.com/new)

**Other Options:**

*  [Netlify](https://www.netlify.com/)
*  [Render](https://render.com/) 
*  [AWS Amplify](https://aws.amazon.com/amplify/)
*  [Google Cloud Run](https://cloud.google.com/run) 

You can choose the platform that best suits your needs and budget.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Rajeev Dixit - [@imrajeevd](https://x.com/imrajeevd)

Project Link: [rajeevdixit05.github.io](https://github.com/rajeevdixit05/rajeevdixit05.github.io)

