import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Вероника Хмельницкая — Психолог, Коуч',
  description: 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе. Психологическое консультирование, коучинг, медитации.',
  keywords: 'психолог, коуч, КПТ, психотерапия, консультирование, Минск, онлайн',
  openGraph: {
    title: 'Вероника Хмельницкая — Психолог, Коуч',
    description: 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Вероника Хмельницкая",
              "description": "Психолог, коуч, консультант в когнитивно-поведенческом подходе",
              "url": "https://veronika-psy.pages.dev",
              "priceRange": "90-160 BYN",
              "areaServed": "Worldwide",
              "serviceType": ["Психологическое консультирование", "Коучинг", "Медитации"],
              "sameAs": [
                "https://t.me/veronika_hmelnickaya",
                "https://www.instagram.com/hmelnickaya.club"
              ]
            })
          }}
        />
      </head>
      <body className="bg-white text-charcoal leading-relaxed text-[15px]">
        {children}
      </body>
    </html>
  )
}
