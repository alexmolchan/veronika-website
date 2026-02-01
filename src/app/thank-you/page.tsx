import { getSiteContent } from '@/lib/sanity'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Спасибо за заявку — Вероника Хмельницкая',
  description: 'Ваша заявка успешно отправлена. Я свяжусь с вами в ближайшее время.',
  robots: { index: false, follow: false },
}

export default async function ThankYouPage() {
  const content = await getSiteContent()

  return (
    <div className="min-h-screen flex items-center justify-center bg-olive-light px-[5%] py-20">
      <div className="max-w-md text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-8 bg-grass rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
          {content?.thankYouTitle || 'Спасибо за заявку!'}
        </h1>

        <p className="text-gray text-lg mb-8 leading-relaxed">
          {content?.thankYouText || 'Я получила вашу заявку и свяжусь с вами в течение 24 часов. Также проверьте вашу почту — я отправила письмо с подтверждением.'}
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-grass text-white font-medium rounded-full hover:bg-grass-dark transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Вернуться на главную
          </Link>

          <div className="flex justify-center gap-4 pt-4">
            <a
              href={content?.telegram || 'https://t.me/veronika_hmelnickaya'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-grass hover:text-grass-dark transition-colors"
              aria-label="Telegram"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a
              href={content?.instagram || 'https://www.instagram.com/hmelnickaya.club'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-grass hover:text-grass-dark transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
