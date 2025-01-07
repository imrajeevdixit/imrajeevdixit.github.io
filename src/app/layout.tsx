import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'

export const metadata = {
  title: 'Rajeev Dixit - Engineering Manager & Leader',
  description: 'Portfolio of Rajeev Dixit, an experienced Engineering Manager and Leader.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

