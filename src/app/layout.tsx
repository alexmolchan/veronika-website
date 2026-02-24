import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GA_ID = 'G-HHHF44WDM5'

const inter = Inter({
  subsets: ['cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['cyrillic'],
  weight: ['500'],
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
  metadataBase: new URL('https://hmelnickaya.com'),
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#5B8C5A' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Вероника Хмельницкая — Психолог, Коуч',
    description: 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе. Помогу разобраться в себе и найти опору внутри.',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://hmelnickaya.com',
    siteName: 'Вероника Хмельницкая',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Вероника Хмельницкая — Психолог, Коуч',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Вероника Хмельницкая — Психолог, Коуч',
    description: 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе.',
    images: ['/og-image.jpg'],
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
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Вероника Хмельницкая",
              "description": "Психолог, коуч, консультант в когнитивно-поведенческом подходе",
              "url": "https://hmelnickaya.com",
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
