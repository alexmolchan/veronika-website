'use client'
import { useState } from 'react'

const defaultServices = [
  { id: 'consulting', title: 'Психологическое консультирование', price: '90 BYN', desc: 'Глубокая работа над проблемами в подходах КПТ, ACT, Схема-терапия.', image: '/images/service1.jpg' },
  { id: 'coaching', title: 'Коучинг', price: 'от 90 BYN', desc: 'ICF-коучинг и эмбодимент-коучинг. Развитие понимания себя, достижение целей.', image: '/images/service2.jpg' },
  { id: 'actgame', title: 'ACT-Game', price: 'от 110 BYN', desc: 'Психотерапевтическая игра для развития психологической гибкости.', image: '/images/service3.jpg' },
  { id: 'meditation', title: 'Занятие по медитациям', price: '95 BYN', desc: 'Подбор практик под запрос, инструкции и личный план с аудиозаписями.', image: '/images/service4.jpg' },
  { id: 'library', title: 'Библиотека медитаций', price: '85 BYN / месяц', desc: '18 аудио-записей медитаций в закрытой ТГ-группе.', image: '/images/service5.jpg' },
  { id: 'corporate', title: 'Корпоративный формат', price: 'По запросу', desc: 'Лекции, вебинары, тренинги. Поддержка руководителей и команд.', image: '/images/service6.jpg' },
]

export default function Services({ content }: { content: any }) {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const services = content?.services?.split('\n').map((line: string, i: number) => {
    const [title, price, desc] = line.split('|').map((s: string) => s.trim())
    return { ...defaultServices[i], title: title || defaultServices[i].title, price: price || defaultServices[i].price, desc: desc || defaultServices[i].desc }
  }) || defaultServices

  return (
    <section id="services" className="py-28 px-[5%] bg-white">
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grass mb-4 font-semibold">
          <span>+</span> Услуги
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl mb-4 text-charcoal">Как я могу помочь</h2>
        <p className="text-gray">Выберите подходящий формат работы, исходя из ваших потребностей и целей</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service: any, i: number) => (
          <div
            key={i}
            onClick={() => setActiveModal(service.id)}
            className="bg-off-white overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-xl group"
          >
            <div className="h-56 overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-7">
              <span className="inline-block bg-olive-light text-grass-dark px-4 py-1.5 text-xs font-semibold rounded-full mb-4">{service.price}</span>
              <h3 className="font-serif text-xl mb-3 text-charcoal">{service.title}</h3>
              <p className="text-gray text-sm leading-relaxed mb-4">{service.desc}</p>
              <span className="inline-flex items-center gap-2 text-grass text-sm font-medium group-hover:gap-3 transition-all">
                Подробнее
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setActiveModal(null)}>
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 w-11 h-11 bg-off-white rounded-full flex items-center justify-center text-2xl text-charcoal hover:bg-grass hover:text-white transition-all">×</button>
            <div className="p-8">
              <h2 className="font-serif text-3xl mb-4">{services.find((s: any) => s.id === activeModal)?.title}</h2>
              <span className="inline-block bg-olive-light text-grass-dark px-5 py-2 font-semibold rounded-full mb-6">{services.find((s: any) => s.id === activeModal)?.price}</span>
              <p className="text-gray mb-6 leading-relaxed">{services.find((s: any) => s.id === activeModal)?.desc}</p>
              <div className="pt-6 border-t border-sand">
                <a href={content?.telegram || 'https://t.me/veronika_hmelnickaya'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-grass text-white font-medium rounded-full hover:bg-grass-dark transition-all">
                  Записаться
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
