import { getSiteContent } from '@/lib/sanity'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Договор оферты — Вероника Хмельницкая',
  description: 'Публичная оферта на оказание консультационных услуг',
}

export default async function OfertaPage() {
  const content = await getSiteContent()

  const defaultOferta = `
## 1. Общие положения

1.1. Настоящий документ является официальной публичной офертой Индивидуального предпринимателя Хмельницкой Вероники (далее — Исполнитель) и содержит условия предоставления консультационных услуг в сфере психологического консультирования и коучинга.

1.2. Акцептом настоящей оферты является оплата услуг Исполнителя. Моментом заключения договора считается момент зачисления денежных средств на расчётный счёт Исполнителя.

## 2. Предмет договора

2.1. Исполнитель обязуется оказать Заказчику консультационные услуги в соответствии с выбранным тарифом, а Заказчик обязуется оплатить эти услуги.

2.2. Виды услуг и их стоимость указаны на сайте Исполнителя.

## 3. Права и обязанности сторон

3.1. Исполнитель обязуется:
- Предоставить услуги надлежащего качества
- Соблюдать конфиденциальность информации
- Проводить консультации в согласованное время

3.2. Заказчик обязуется:
- Своевременно оплачивать услуги
- Предупреждать об отмене или переносе консультации не менее чем за 24 часа
- Предоставлять достоверную информацию о себе

## 4. Стоимость услуг и порядок оплаты

4.1. Стоимость услуг указана на сайте и может быть изменена Исполнителем в одностороннем порядке.

4.2. Оплата производится по безналичному расчёту на расчётный счёт Исполнителя или иным согласованным способом.

## 5. Возврат средств

5.1. В случае отмены консультации Заказчиком менее чем за 24 часа до её начала, оплата не возвращается.

5.2. В случае отмены консультации Исполнителем, средства возвращаются в полном объёме или переносятся на другую дату по согласованию сторон.

## 6. Ответственность сторон

6.1. Исполнитель не несёт ответственности за результаты применения Заказчиком полученных рекомендаций.

6.2. Психологическое консультирование не является медицинской услугой и не заменяет обращение к врачу при наличии медицинских показаний.

## 7. Конфиденциальность

7.1. Исполнитель гарантирует конфиденциальность всей информации, полученной в ходе консультаций, за исключением случаев, предусмотренных законодательством.

## 8. Срок действия и изменение условий

8.1. Настоящая оферта вступает в силу с момента её размещения на сайте и действует бессрочно.

8.2. Исполнитель вправе вносить изменения в условия оферты в любое время. Изменения вступают в силу с момента их публикации.

---

Дата публикации: 1 февраля 2026 г.
`

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-charcoal text-white py-6 px-[5%]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-serif text-xl hover:text-grass-light transition-colors">
            {content?.name || 'Вероника'} {content?.lastName || 'Хмельницкая'}
          </Link>
          <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            На главную
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-[5%] py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-8">Договор оферты</h1>

        <div className="prose prose-lg max-w-none text-gray">
          {(content?.ofertaText || defaultOferta).split('\n').map((line: string, i: number) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="font-serif text-xl text-charcoal mt-8 mb-4">{line.replace('## ', '')}</h2>
            }
            if (line.startsWith('- ')) {
              return <li key={i} className="ml-4">{line.replace('- ', '')}</li>
            }
            if (line.startsWith('---')) {
              return <hr key={i} className="my-8 border-sand" />
            }
            if (line.trim()) {
              return <p key={i} className="mb-4">{line}</p>
            }
            return null
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-white/70 py-8 px-[5%]">
        <div className="max-w-4xl mx-auto text-center text-sm">
          © 2026 {content?.name || 'Вероника'} {content?.lastName || 'Хмельницкая'}. Все права защищены.
        </div>
      </footer>
    </div>
  )
}
