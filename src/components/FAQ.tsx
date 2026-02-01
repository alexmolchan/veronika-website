'use client'
import { useState, useCallback } from 'react'

const defaultFaq = [
  { q: 'Как записаться на сессию?', a: 'Через нажатие на кнопку «Записаться» вас перенаправит в чат Телеграма. Также вы можете написать мне в личные сообщения в Инстаграм.' },
  { q: 'Нужна ли предоплата?', a: 'Предоплата до сессии не требуется. Оплата происходит после сессии по реквизитам, которые я вышлю вам при подтверждённой записи.' },
  { q: 'Можно ли отменять или переносить сессию?', a: 'Переносить и отменять сессию можно бесплатно за 24 часа до назначенного времени. Если позже — она полностью оплачивается.' },
  { q: 'Сколько встреч понадобится?', a: 'Длительность терапии индивидуальна. Глубинная терапия занимает год и более, краткосрочная — несколько месяцев.' },
  { q: 'Как происходит процесс работы?', a: 'На первой встрече мы знакомимся друг с другом, обозначаем план работы. Между встречами я даю задания. Сессии проводятся в Zoom.' },
]

export default function FAQ({ content }: { content: any }) {
  const [active, setActive] = useState(0)

  const toggleFaq = useCallback((index: number) => {
    setActive(prev => prev === index ? -1 : index)
  }, [])

  const faqItems = content?.faq?.split('\n').map((line: string) => {
    const [q, a] = line.split('|').map((s: string) => s.trim())
    return { q, a }
  }).filter((item: any) => item.q && item.a) || defaultFaq

  return (
    <section id="faq" className="py-28 px-[5%] bg-white" aria-labelledby="faq-title">
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grass mb-4 font-semibold">
          <span aria-hidden="true">+</span> Вопросы
        </div>
        <h2 id="faq-title" className="font-serif text-3xl lg:text-4xl text-charcoal">Ответы на ваши вопросы</h2>
      </div>
      <div className="max-w-2xl mx-auto" role="region" aria-label="Часто задаваемые вопросы">
        {faqItems.map((item: any, i: number) => {
          const isOpen = active === i
          const panelId = `faq-panel-${i}`
          const headingId = `faq-heading-${i}`

          return (
            <div key={i} className="border-b border-sand">
              <h3>
                <button
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(i)}
                  className="py-6 w-full flex justify-between items-center cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-grass focus:ring-inset"
                >
                  <span className="font-medium text-charcoal group-hover:text-grass transition-colors pr-4">{item.q}</span>
                  <span className={`w-8 h-8 border-2 border-sand rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-grass border-grass' : ''}`}>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'text-white rotate-45' : 'text-gray'}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                hidden={!isOpen}
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80' : 'max-h-0'}`}
              >
                <p className="pb-6 text-gray leading-relaxed">{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
