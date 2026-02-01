'use client'
import { useForm } from '@/context/FormContext'

const defaultIssues = [
  'Эмоциональные трудности', 'Проблемы в отношениях', 'Самокритика', 'Низкая самооценка',
  'Перфекционизм', 'Тревога и фобии', 'Депрессия', 'Личные границы',
  'Принятие решений', 'Прокрастинация', 'Отсутствие смысла', 'Кризисные ситуации'
]

export default function Issues({ content }: { content: any }) {
  const { selectedIssues, setSelectedIssues, openModal } = useForm()

  const issues = content?.issuesList?.split('\n').filter(Boolean) || defaultIssues

  const toggle = (issue: string) => {
    setSelectedIssues(
      selectedIssues.includes(issue)
        ? selectedIssues.filter(x => x !== issue)
        : [...selectedIssues, issue]
    )
  }

  const handleBooking = () => {
    openModal()
  }

  return (
    <section id="issues" className="py-28 px-[5%] bg-charcoal text-white">
      <div className="text-center max-w-xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-grass-light mb-4 font-semibold">
          <span>+</span> Запросы
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl mb-4">С чем ко мне можно обратиться</h2>
        <p className="text-white/85">Выберите то, что вас беспокоит</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {issues.map((issue: string, i: number) => (
          <div
            key={i}
            onClick={() => toggle(issue)}
            className={`py-5 px-6 border text-center cursor-pointer transition-all select-none ${
              selectedIssues.includes(issue)
                ? 'bg-grass border-grass'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/15'
            }`}
          >
            <span className={selectedIssues.includes(issue) ? 'text-white' : 'text-white/90'}>{issue}</span>
          </div>
        ))}
      </div>
      <div className={`text-center mt-12 transition-all duration-400 ${selectedIssues.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
        <button
          onClick={handleBooking}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-grass font-medium rounded-full hover:bg-grass-light hover:text-white transition-all"
        >
          Записаться
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>
  )
}
