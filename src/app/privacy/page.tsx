import { getSiteContent } from '@/lib/sanity'
import Link from 'next/link'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Политика конфиденциальности — Вероника Хмельницкая',
  description: 'Политика в отношении обработки персональных данных',
}

export default async function PrivacyPage() {
  const content = await getSiteContent()

  const defaultPrivacy = `
## 1. Общие положения

1.1. Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта.

1.2. Оператором персональных данных является Индивидуальный предприниматель Хмельницкая Вероника (далее — Оператор).

1.3. Заполняя формы на сайте, пользователь выражает согласие с настоящей Политикой.

## 2. Состав собираемых данных

2.1. Оператор может собирать следующие персональные данные:
- Имя
- Адрес электронной почты
- Номер телефона
- Данные мессенджеров (Telegram, WhatsApp)

2.2. Также автоматически собирается техническая информация:
- IP-адрес
- Данные о браузере и устройстве
- Данные cookie-файлов

## 3. Цели обработки данных

3.1. Персональные данные обрабатываются в целях:
- Связи с пользователем для оказания услуг
- Отправки информационных сообщений
- Улучшения качества обслуживания
- Исполнения договорных обязательств

## 4. Защита персональных данных

4.1. Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного доступа.

4.2. Персональные данные хранятся на защищённых серверах и не передаются третьим лицам, за исключением случаев, предусмотренных законодательством.

## 5. Права пользователя

5.1. Пользователь имеет право:
- Получить информацию об обработке своих данных
- Требовать уточнения, блокирования или уничтожения данных
- Отозвать согласие на обработку данных

5.2. Для реализации указанных прав пользователь может обратиться к Оператору через форму связи на сайте или по электронной почте.

## 6. Срок хранения данных

6.1. Персональные данные хранятся в течение срока, необходимого для достижения целей их обработки, но не дольше 3 лет с момента последнего взаимодействия.

6.2. По истечении срока хранения данные уничтожаются.

## 7. Cookies и метрики

7.1. Сайт использует cookie-файлы для улучшения пользовательского опыта.

7.2. Пользователь может отключить cookies в настройках браузера, но это может повлиять на функциональность сайта.

## 8. Изменение политики

8.1. Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на данной странице.

---

Дата последнего обновления: 1 февраля 2026 г.
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
        <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-8">Политика конфиденциальности</h1>

        <div className="prose prose-lg max-w-none text-gray">
          {(content?.privacyText || defaultPrivacy).split('\n').map((line: string, i: number) => {
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
