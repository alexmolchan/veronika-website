import { urlFor } from '@/lib/sanity'

export default function Hero({ content }: { content: any }) {
  const stats = content?.stats?.split('\n').map((line: string) => {
    const [number, label] = line.split('|').map((s: string) => s.trim())
    return { number, label }
  }) || []

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-[5%] pt-40 lg:pt-32 pb-20 gap-12 lg:gap-16 bg-white">
      <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-grass mb-6 font-medium">
          <span className="w-2 h-2 bg-grass rounded-full"></span>
          {content?.tagline || 'Психолог · Коуч · Тренер осознанности'}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal mb-6">
          {content?.name || 'Вероника'} <span className="text-grass italic">{content?.lastName || 'Хмельницкая'}</span>
        </h1>
        <p className="text-gray text-lg mb-10 leading-relaxed">
          {content?.mainDescription || 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе.'}
        </p>
        <div className="flex gap-4 justify-center lg:justify-start mb-12">
          <a href="#services" className="inline-flex items-center gap-3 px-8 py-4 bg-grass text-white font-medium rounded-full hover:bg-grass-dark transition-all hover:-translate-y-0.5">
            Услуги
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 border-2 border-grass text-grass font-medium rounded-full hover:bg-grass hover:text-white transition-all">
            Записаться
          </a>
        </div>
        <div className="flex gap-12 pt-8 border-t border-sand justify-center lg:justify-start">
          {stats.map((stat: any, i: number) => (
            <div key={i} className="text-left">
              <div className="font-serif text-4xl font-medium text-charcoal leading-none">{stat.number}</div>
              <div className="text-sm text-gray mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative order-1 lg:order-2 max-w-md mx-auto lg:max-w-none">
        {content?.photo ? (
          <img
            src={urlFor(content.photo).width(480).height(600).url()}
            alt={`${content?.name} ${content?.lastName}`}
            className="w-full h-[450px] lg:h-[600px] object-cover"
          />
        ) : (
          <img src="/images/hero.jpg" alt="Вероника Хмельницкая" className="w-full h-[450px] lg:h-[600px] object-cover" />
        )}
        <div className="absolute bottom-8 -left-8 lg:left-[-2rem] bg-grass text-white p-5 max-w-[280px]">
          <p className="font-serif text-lg italic leading-relaxed">«{content?.quote || 'Моя цель — чтобы вы всё больше могли опираться на себя'}»</p>
        </div>
      </div>
    </section>
  )
}
