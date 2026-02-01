import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

const features = [
  { icon: 'shield', title: 'Безопасность', desc: 'Бережное пространство для работы' },
  { icon: 'heart', title: 'Принятие', desc: 'Безоценочное отношение' },
  { icon: 'clock', title: 'Ваш темп', desc: 'Опора на ваш запрос' },
  { icon: 'lock', title: 'Конфиденциальность', desc: 'Полная приватность' },
]

const icons: Record<string, JSX.Element> = {
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-grass" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-grass" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-grass" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-grass" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
}

export default function About({ content }: { content: any }) {
  const paragraphs = content?.aboutText?.split('\n\n').filter(Boolean) || []
  const aboutImageUrl = content?.aboutImage
    ? urlFor(content.aboutImage).width(500).height(550).quality(80).url()
    : '/images/about.jpg'

  return (
    <section id="about" className="py-28 px-[5%] bg-off-white" aria-labelledby="about-title">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-20 items-center max-w-6xl mx-auto">
        <div className="max-w-lg mx-auto lg:max-w-none">
          <Image
            src={aboutImageUrl}
            alt="Вероника Хмельницкая — о подходе к работе"
            width={500}
            height={550}
            loading="lazy"
            className="w-full h-[400px] lg:h-[550px] object-cover"
            sizes="(max-width: 1024px) 100vw, 500px"
          />
        </div>
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grass mb-6 font-semibold">
            <span aria-hidden="true">+</span> Обо мне
          </div>
          <h2 id="about-title" className="font-serif text-3xl lg:text-4xl mb-8 leading-tight text-charcoal">
            {content?.aboutTitle || 'Путь в психологию для меня был не случайным'}
          </h2>
          {paragraphs.length > 0 ? (
            paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-gray mb-5 leading-relaxed">{p}</p>
            ))
          ) : (
            <>
              <p className="text-gray mb-5 leading-relaxed">Это осознанный выбор, сделанный из искреннего интереса к внутреннему миру человека.</p>
              <p className="text-gray mb-5 leading-relaxed">В терапии для меня важны равные и живые отношения. Я не занимаю позицию «знающего эксперта» — вместо этого иду рядом с вами.</p>
            </>
          )}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-10 border-t border-sand list-none" role="list">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-olive-light flex items-center justify-center shrink-0">
                  {icons[f.icon]}
                </div>
                <div>
                  <strong className="block text-charcoal text-sm mb-1">{f.title}</strong>
                  <span className="text-gray text-sm">{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
