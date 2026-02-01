'use client'

import { urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { useForm } from '@/context/FormContext'

export default function Hero({ content }: { content: any }) {
  const { openModal } = useForm()

  const stats = content?.stats?.split('\n').map((line: string) => {
    const [number, label] = line.split('|').map((s: string) => s.trim())
    return { number, label }
  }) || []

  const heroImageUrl = content?.photo
    ? urlFor(content.photo).width(600).height(750).quality(85).url()
    : '/images/hero.jpg'

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-[5%] pt-40 lg:pt-32 pb-20 gap-12 lg:gap-16 bg-white">
      <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-grass mb-6 font-medium">
          <span className="w-2 h-2 bg-grass rounded-full" aria-hidden="true"></span>
          {content?.tagline || 'Психолог · Коуч · Тренер осознанности'}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal mb-6">
          {content?.name || 'Вероника'}{' '}
          <span className="text-grass italic">{content?.lastName || 'Хмельницкая'}</span>
        </h1>
        <p className="text-gray text-lg mb-10 leading-relaxed">
          {content?.mainDescription || 'Дипломированный психолог, консультант в когнитивно-поведенческом подходе.'}
        </p>
        <div className="flex gap-4 justify-center lg:justify-start mb-12">
          <a
            href="#services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-grass text-white font-medium rounded-full hover:bg-grass-dark transition-colors focus:outline-none focus:ring-2 focus:ring-grass focus:ring-offset-2"
          >
            Услуги
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-grass text-grass font-medium rounded-full hover:bg-grass hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-grass focus:ring-offset-2"
          >
            Записаться
          </button>
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
        <Image
          src={heroImageUrl}
          alt={`${content?.name || 'Вероника'} ${content?.lastName || 'Хмельницкая'} — психолог, коуч`}
          width={480}
          height={600}
          priority
          className="w-full h-[450px] lg:h-[600px] object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
        />
        <div className="absolute bottom-8 -left-8 lg:left-[-2rem] bg-grass text-white p-5 max-w-[280px]">
          <p className="font-serif text-lg leading-relaxed">
            «{content?.quote || 'Моя цель — чтобы вы всё больше могли опираться на себя'}»
          </p>
        </div>
      </div>
    </section>
  )
}
