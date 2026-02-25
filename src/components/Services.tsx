'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useForm } from '@/context/FormContext'

export default function Services({ content }: { content: any }) {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const { openModal: openContactForm } = useForm()

  const openModal = useCallback((id: string) => setActiveModal(id), [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  const handleBooking = () => {
    closeModal()
    openContactForm()
  }

  const services = content?.services || []
  const activeService = services.find((s: any) => s.id === activeModal)

  return (
    <section id="services" className="py-28 px-[5%] bg-white" aria-labelledby="services-title">
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grass mb-4 font-semibold">
          <span aria-hidden="true">+</span> Услуги
        </div>
        <h2 id="services-title" className="font-serif text-3xl lg:text-4xl mb-4 text-charcoal">Как я могу помочь</h2>
        <p className="text-gray">Выберите подходящий формат работы, исходя из ваших потребностей и целей</p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto list-none" role="list">
        {services.map((service: any, i: number) => (
          <li key={i}>
            <article
              onClick={() => openModal(service.id)}
              onKeyDown={(e) => e.key === 'Enter' && openModal(service.id)}
              tabIndex={0}
              role="button"
              aria-label={`Подробнее об услуге: ${service.title}`}
              className="bg-off-white overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group focus:outline-none focus:ring-2 focus:ring-grass focus:ring-offset-2"
            >
              <div className="aspect-square overflow-hidden relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-7">
                <span className="inline-block bg-olive-light text-grass-dark px-4 py-1.5 text-xs font-semibold rounded-full mb-4">{service.price}</span>
                <h3 className="font-serif text-xl mb-3 text-charcoal">{service.title}</h3>
                <p className="text-gray text-sm leading-relaxed mb-4">{service.desc}</p>
                <span className="inline-flex items-center gap-2 text-grass text-sm font-medium group-hover:gap-3 transition-all">
                  Подробнее
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {activeModal && activeService && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-11 h-11 bg-off-white rounded-full flex items-center justify-center text-2xl text-charcoal hover:bg-grass hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-grass"
              aria-label="Закрыть"
            >
              ×
            </button>
            <div className="p-8">
              <h2 id="modal-title" className="font-serif text-3xl mb-4 text-charcoal">{activeService.title}</h2>
              <span className="inline-block bg-olive-light text-grass-dark px-5 py-2 font-semibold rounded-full mb-6">{activeService.price}</span>
              <div className="text-gray mb-6 leading-relaxed whitespace-pre-line">{activeService.detailedDesc || activeService.desc}</div>
              <div className="pt-6 border-t border-sand">
                <button
                  onClick={handleBooking}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-grass text-white font-medium rounded-full hover:bg-grass-dark transition-all focus:outline-none focus:ring-2 focus:ring-grass focus:ring-offset-2"
                >
                  Записаться
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
