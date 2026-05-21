import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'CropCare AI - Intelligent Crop Disease Detection',
  description: 'Advanced AI-powered crop disease detection system. Upload plant images to get instant diagnoses, treatment recommendations, and preventive measures.',
  keywords: ['crop disease', 'plant health', 'AI detection', 'agriculture', 'farming', 'plant diagnosis'],
  authors: [{ name: 'CropCare AI Team' }],
  openGraph: {
    title: 'CropCare AI - Intelligent Crop Disease Detection',
    description: 'Advanced AI-powered crop disease detection system for farmers and agricultural professionals.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2d5a3d' },
    { media: '(prefers-color-scheme: dark)', color: '#1a2e1f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
