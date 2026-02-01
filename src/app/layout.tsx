import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5B8C5A',
}

export const metadata: Metadata = {
  title: 'Вероника Хмельницкая — Психолог, Коуч, Тренер осознанности',
  description: 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе. Психологическое консультирование, коучинг, медитации в Минске и онлайн.',
  keywords: 'психолог Минск, коуч, КПТ, когнитивно-поведенческая терапия, психотерапия, консультирование, онлайн психолог',
  authors: [{ name: 'Вероника Хмельницкая' }],
  creator: 'Вероника Хмельницкая',
  metadataBase: new URL('https://veronika-website.pages.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Вероника Хмельницкая — Психолог, Коуч',
    description: 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе. Помогу разобраться в себе и найти опору внутри.',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://veronika-website.pages.dev',
    siteName: 'Вероника Хмельницкая',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Вероника Хмельницкая — Психолог',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Вероника Хмельницкая — Психолог, Коуч',
    description: 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе.',
    images: ['/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Вероника Хмельницкая",
              "description": "Психолог, коуч, консультант в когнитивно-поведенческом подходе",
              "url": "https://veronika-website.pages.dev",
              "telephone": "+375",
              "priceRange": "90-160 BYN",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Минск",
                "addressCountry": "BY"
              },
              "areaServed": "Worldwide",
              "serviceType": ["Психологическое консультирование", "Коучинг", "Медитации", "ACT-терапия"],
              "sameAs": [
                "https://t.me/veronika_hmelnickaya",
                "https://www.instagram.com/hmelnickaya.club"
              ]
            })
          }}
        />
      </head>
      <body className="bg-white text-charcoal leading-relaxed text-[15px] font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
