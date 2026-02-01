export default function Contact({ content }: { content: any }) {
  const telegram = content?.telegram || 'https://t.me/veronika_hmelnickaya'
  const instagram = content?.instagram || 'https://www.instagram.com/hmelnickaya.club'

  return (
    <section id="contact" className="py-28 px-[5%] bg-grass text-white text-center" aria-labelledby="contact-title">
      <div className="max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white mb-4 font-semibold">
          <span aria-hidden="true">+</span> Контакты
        </div>
        <h2 id="contact-title" className="font-serif text-3xl lg:text-4xl mb-4">Свяжитесь со мной</h2>
        <p className="text-white">Напишите мне в удобный мессенджер</p>
      </div>
      <div className="flex justify-center gap-4 mt-10 flex-wrap" role="list" aria-label="Социальные сети">
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white/15 px-7 py-4 rounded-full hover:bg-white hover:text-grass transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-grass"
          aria-label="Написать в Telegram"
          role="listitem"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          <span className="font-medium">Telegram</span>
        </a>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white/15 px-7 py-4 rounded-full hover:bg-white hover:text-grass transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-grass"
          aria-label="Профиль в Instagram"
          role="listitem"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          <span className="font-medium">Instagram</span>
        </a>
      </div>
      <div className="mt-10">
        <a
          href={telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-grass font-medium rounded-full hover:bg-charcoal hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-grass"
        >
          {content?.bookingButtonText || 'Записаться на сессию'}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>
  )
}
