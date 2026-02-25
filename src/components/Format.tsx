import Image from 'next/image'

const defaultFormatItems = [
  { icon: 'user', title: 'Индивидуальная терапия', desc: 'Работаю с совершеннолетними от 18 лет' },
  { icon: 'calendar', title: 'Регулярность встреч', desc: 'Раз в неделю или раз в две недели' },
  { icon: 'clock', title: 'Длительность сессии', desc: '60 минут онлайн через Zoom' },
  { icon: 'file', title: 'Домашние задания', desc: 'Между встречами — задания и рекомендации' },
]

const icons: Record<string, JSX.Element> = {
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
}

export default function Format({ content }: { content: any }) {
  const formatItems = content?.formatItems || defaultFormatItems

  return (
    <section id="format" className="py-28 px-[5%] bg-off-white" aria-labelledby="format-title">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-center max-w-5xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grass mb-6 font-semibold">
            <span aria-hidden="true">+</span> Формат работы
          </div>
          <h2 id="format-title" className="font-serif text-3xl lg:text-4xl mb-8 text-charcoal">Как проходит работа</h2>
          <ul className="space-y-0 list-none" role="list">
            {formatItems.map((item: any, i: number) => (
              <li key={i} className="flex items-start gap-5 py-6 border-b border-sand last:border-b-0">
                <div className="w-12 h-12 bg-grass flex items-center justify-center text-white shrink-0">
                  {icons[item.icon]}
                </div>
                <div>
                  <strong className="block text-charcoal font-semibold mb-1">{item.title}</strong>
                  <span className="text-gray text-sm">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-first lg:order-last">
          <Image
            src="/images/format.jpg"
            alt="Онлайн-сессия психологического консультирования"
            width={500}
            height={500}
            loading="lazy"
            className="w-full h-[400px] lg:h-[500px] object-cover"
            sizes="(max-width: 1024px) 100vw, 500px"
          />
        </div>
      </div>
    </section>
  )
}
