'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useForm } from '@/context/FormContext'

const defaultServices = [
  {
    id: 'consulting',
    title: 'Психологическое консультирование',
    price: '90 BYN',
    desc: 'Работа над проблемами и задачами в подходах КПТ, ACT, Схема-терапия. Для тех, кто хочет разобраться с трудностями, кризисами, стрессом и внутренними переживаниями.',
    image: '/images/service1.jpg',
    detailedDesc: `Это работа над вашими проблемами и задачами — глубокая, внимательная и про вас. Про ваше саморазвитие и самоосознание, преодоление кризисов, обучение другому типу мышления и поведения, и про то, чтобы вы сами становились для себя поддерживающим и устойчивым человеком.

В ходе консультирования я помогаю вам увидеть всю свою проблему, а не только её верхушку в виде последствий, помогаю обнаружить то, что поддерживает эту проблему и то, как она вообще возникла. И помогаю выйти из замкнутого круга этой проблемы.

Периодичность сессий — раз в неделю или в две недели.

От вас потребуется желание и мотивация к изменениям, к работе над собой, взятие ответственности за отработку заданий и приложение определённых усилий.

Как происходит процесс работы?
Мы договариваемся о первой встрече через мессенджер/соцсети. На первой встрече мы знакомимся друг с другом и процессом, обозначаем план работы, решаем острые вопросы. После первой встречи принимаем решение о дальнейших встречах.

Между встречами я даю задания, рекомендую литературу и видео для самостоятельного изучения. Встречи можно оплачивать разово или комплексно. Обычно я провожу сессии на платформе Zoom.`
  },
  {
    id: 'coaching',
    title: 'Коучинг',
    price: 'от 90 BYN',
    desc: 'ICF-коучинг (от 145 BYN) и эмбодимент-коучинг (90 BYN). Развитие понимания себя, достижение целей, баланс работы и жизни.',
    image: '/images/service2.jpg',
    detailedDesc: `ICF-коучинг (от 145 BYN)
«Золотой стандарт» коучинга во всем мире. Помогает в развитии глубокого понимания себя и расширении своего потенциала, в достижении целей и повышении мотивации, в преодолении страхов, сомнений, ограничивающих убеждений.

Коучинг по стандартам Международной федерации коучинга (ICF) позволяет клиентам проработать свои задачи, используя проверенную методологию, основанную на строгой структуре, четкой этике и 11 ключевых компетенциях коуча: активное слушание, постановка «сильных» вопросов, стимулирование осознания и др.

Эмбодимент-коучинг (90 BYN)
Работа через связь тела и сознания. Для развития осознанности и связи с телом, управления стрессом, изменения привычных реакций, повышения устойчивости к неопределенности. Особенно подойдет тем, кто хочет преодолеть внутренние барьеры, которые ум не «пропускает».

Эмбодимент-коучинг предполагает, что наши телесные ощущения и физическое состояние тесно связаны с ментальным и эмоциональным состоянием. Через специальные практики и диалог с коучем вы учитесь осознавать эти связи и использовать их для достижения целей.

Этот вид коучинга подходит для:
• Поиска баланса между работой и личной жизнью
• Развития гибкости мышления и ответственности
• Преодоления страхов, сомнений и внутренних ограничений
• Повышения уровня самоосознанности и концентрации`
  },
  {
    id: 'actgame',
    title: 'ACT-Game',
    price: 'от 110 BYN',
    desc: 'Психотерапевтическая игра для развития психологической гибкости. Групповой формат (110 BYN) или индивидуальный (160 BYN).',
    image: '/images/service3.jpg',
    detailedDesc: `Психотерапевтическая игра на методологической базе ACT, целью которой является развитие психологической гибкости. Может проводиться как офлайн, так и онлайн.

Групповой формат (2-6 человек) — 110 BYN
Индивидуальный формат — 160 BYN

На игре вы сможете:
• Разобраться в своем запросе/проблеме — увидеть то, что раньше не замечали, глубже понимать причины происходящего и находить возможные решения
• Лучше узнать себя: что для вас действительно важно, какие убеждения на вас влияют и где внутри есть напряжение
• В безопасной обстановке познакомиться со своими чувствами и научиться справляться с трудными ситуациями

Запросы, с которыми можно приходить на игру:

Психологические:
• Проблемы в отношениях
• Тревожные расстройства
• Работа с самооценкой
• Поиск смысла, ценностей
• Депрессивное состояние
• Навязчивые мысли и действия
• Проблемы с контролем эмоций
• Состояние вины и стыда

Коучинговые:
• Личностный рост и саморазвитие
• Карьера и профессиональное развитие
• Сложности в реализации профессиональных задач`
  },
  {
    id: 'meditation',
    title: 'Занятие по медитациям',
    price: '95 BYN',
    desc: 'Подбор практик под ваш запрос, понятные инструкции, совместное выполнение и личный план с аудиозаписями после занятия.',
    image: '/images/service4.jpg',
    detailedDesc: `Занятие включает в себя прояснение вашего запроса, подбор практик и понятные инструкции по их выполнению, совместное проведение самих практик, а также личный план с практиками и их аудиозаписями после занятия.

Учитывая ваше состояние, потребности и цели, я подберу вам практики, объясню, как правильно медитировать, как это работает, какие преимущества вы можете получить.

Часть занятия мы проведем в формате коуч-сессии, проясняя ваш запрос. Во второй части мы вместе сделаем несколько практик, подходящих именно вам. После занятия я вышлю индивидуальный план с перечнем и периодичностью практик, а также их аудиоформат для домашней практики.

Регулярная практика осознанности (mindfulness) даёт заметные результаты:

Психологические эффекты:
• Снижение стресса и тревожности
• Повышение концентрации и ясности ума
• Стабилизация настроения
• Лучшее понимание себя

Физиологические эффекты:
• Улучшение сна
• Улучшение качества общения
• Лучшее управление импульсами
• Чувство удовлетворённости и благодарности

Заметные изменения обычно происходят через 6-8 недель регулярной практики (даже по 10–15 минут в день).`
  },
  {
    id: 'library',
    title: 'Библиотека медитаций',
    price: '85 BYN',
    desc: 'Аудио-записи медитаций осознанности в закрытой ТГ-группе. Медитации для тела, эмоций, мыслей, действий и отношений.',
    image: '/images/service5.jpg',
    detailedDesc: `Подборка записанных аудиофайлов с медитациями для спокойствия ума, ясности и внутреннего равновесия, которые легко встроить в повседневную жизнь. Подходит новичкам и опытным практикующим.

Библиотека — это мои аудио-записи с медитациями осознанности в хорошем качестве, размещённые в закрытой ТГ-группе.

Медитации сгруппированы по направлениям:
• Осознанность тела
• Осознанность эмоций
• Осознанность мыслей
• Осознанность действий
• Осознанность отношений
• Медитации с визуализацией (на развитие качеств и состояний)

Сейчас в библиотеке 18 аудио-записей в хорошем качестве, и записываются новые. Практиковать вы можете столько, сколько вам будет по силам и в удобное время, пока действует абонемент.

Абонемент действует один месяц с момента приобретения. Через месяц вы его продлеваете, если всё понравится.

Преимущества медитаций осознанности:
Медитации осознанности — это самые изученные медитации с широкой доказательной базой их эффективности. Они включены в большинство психотерапевтических протоколов. Именно эти медитации практикуют в Google и других мировых компаниях.

Медитации помогают в снижении стресса и тревоги, развивают внимательность к себе и эмпатию, концентрацию, укрепляют устойчивость психики.`
  },
  {
    id: 'corporate',
    title: 'Корпоративный формат',
    price: 'По запросу',
    desc: 'Лекции, тренинги, воркшопы для команд. Темы: стресс, выгорание, коммуникация, эмоциональный интеллект.',
    image: '/images/service6.jpg',
    detailedDesc: `Проведение лекций, вебинаров и тренингов для сотрудников компаний. А также психологическая и коучинговая поддержка сотрудников и руководителей.

Мне близка философия компаний, которые вкладываются не только в инновации и развитие бизнеса, но и в тех, кто наполняет его жизнью — своих людей, в их потенциал, осознанность и внутреннюю силу.

Именно с таким подходом я работаю как психолог и коуч. Помогаю командам находить внутренние ресурсы, руководителям — развивать осознанное лидерство, а компаниям — создавать культуру, где человеку хочется работать и расти.

Поддержка корпоративного психолога и коуча — это важная часть современной корпоративной культуры. Это не просто помощь, а инвестиция в эффективность, благополучие и устойчивость команды.

Преимущества для компании:
• Снижение уровня стресса и эмоционального выгорания
• Повышение вовлечённости, мотивации и ответственности
• Развитие лидерских и коммуникативных навыков у менеджеров
• Улучшение взаимопонимания и построение крепких отношений в команде
• Разрешение конфликтов

Темы: стресс, выгорание, коммуникация, эмоциональный интеллект, осознанное лидерство.`
  },
]

export default function Services({ content }: { content: any }) {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const { openModal: openContactForm } = useForm()

  const openModal = useCallback((id: string) => setActiveModal(id), [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  const handleBooking = () => {
    closeModal()
    openContactForm()
  }

  // Override default services with content data when available
  const contentLines = content?.services?.split('\n') || []
  const services = defaultServices.map((defaultService, i) => {
    if (i < contentLines.length && contentLines[i]?.trim()) {
      const [title, price, desc] = contentLines[i].split('|').map((s: string) => s.trim())
      return { ...defaultService, title: title || defaultService.title, price: price || defaultService.price, desc: desc || defaultService.desc }
    }
    return defaultService
  })

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
              {/* Square image container */}
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

      {/* Modal */}
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
