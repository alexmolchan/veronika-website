'use client'

import { useForm } from '@/context/FormContext'
import { trackCTAClick } from '@/lib/analytics'

export default function StickyBookButton() {
  const { openModal, selectedIssues } = useForm()

  const handleClick = () => {
    trackCTAClick('sticky_book')
    openModal()
  }

  // Only show on mobile when issues are selected
  if (selectedIssues.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-white via-white to-transparent lg:hidden">
      <button
        onClick={handleClick}
        className="w-full py-4 bg-grass text-white font-medium rounded-full shadow-lg shadow-grass/30 hover:bg-grass-dark transition-all flex items-center justify-center gap-2 text-lg"
        data-gtm="cta-sticky-book"
      >
        Записаться на консультацию
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
      <p className="text-center text-xs text-gray mt-2">
        {selectedIssues.length} {selectedIssues.length === 1 ? 'запрос выбран' : 'запроса выбрано'}
      </p>
    </div>
  )
}
