'use client'
import { useState, useEffect, useRef } from 'react'
import { useForm } from '@/context/FormContext'
import { useRouter } from 'next/navigation'

const messengers = [
  { id: 'telegram', name: 'Telegram', icon: '📱' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬' },
  { id: 'phone', name: 'Телефон', icon: '📞' },
]

export default function ContactModal({ content }: { content: any }) {
  const { isModalOpen, closeModal, selectedIssues } = useForm()
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messenger: 'telegram',
    contact: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')

  // Load Turnstile script
  useEffect(() => {
    if (isModalOpen && typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [isModalOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isModalOpen, closeModal])

  // Focus trap
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const firstInput = modalRef.current.querySelector('input')
      firstInput?.focus()
    }
  }, [isModalOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          issues: selectedIssues,
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка отправки')
      }

      closeModal()
      router.push('/thank-you')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isModalOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 id="modal-title" className="font-serif text-2xl text-charcoal">
            {content?.formTitle || 'Записаться на консультацию'}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Selected Issues */}
          {selectedIssues.length > 0 && (
            <div className="bg-olive-light rounded-xl p-4">
              <p className="text-sm text-grass-dark font-medium mb-2">Выбранные запросы:</p>
              <div className="flex flex-wrap gap-2">
                {selectedIssues.map((issue, i) => (
                  <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-charcoal">
                    {issue}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
              Ваше имя <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-grass focus:border-transparent transition-all"
              placeholder="Как к вам обращаться?"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-grass focus:border-transparent transition-all"
              placeholder="email@example.com"
            />
          </div>

          {/* Messenger */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Предпочтительный способ связи
            </label>
            <div className="grid grid-cols-3 gap-2">
              {messengers.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, messenger: m.id })}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    formData.messenger === m.id
                      ? 'bg-grass text-white border-grass'
                      : 'bg-white text-charcoal border-gray-200 hover:border-grass'
                  }`}
                >
                  <span className="mr-1">{m.icon}</span> {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact (phone/username) */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-charcoal mb-2">
              {formData.messenger === 'phone' ? 'Номер телефона' :
               formData.messenger === 'telegram' ? 'Telegram (@username или номер)' :
               'WhatsApp (номер телефона)'} <span className="text-red-500">*</span>
            </label>
            <input
              type={formData.messenger === 'phone' || formData.messenger === 'whatsapp' ? 'tel' : 'text'}
              id="contact"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-grass focus:border-transparent transition-all"
              placeholder={formData.messenger === 'telegram' ? '@username' : '+375...'}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
              Расскажите немного о вашем запросе
            </label>
            <textarea
              id="message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-grass focus:border-transparent transition-all resize-none"
              placeholder="Что вас беспокоит? С чем хотели бы поработать?"
            />
          </div>

          {/* Turnstile Widget */}
          <div
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
            data-callback={(token: string) => setTurnstileToken(token)}
            data-theme="light"
          />

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-grass text-white font-medium rounded-full hover:bg-grass-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Отправка...
              </>
            ) : (
              content?.formButtonText || 'Отправить заявку'
            )}
          </button>

          {/* Privacy notice */}
          <p className="text-xs text-gray text-center">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <a href="/privacy" className="text-grass hover:underline">политикой конфиденциальности</a>
          </p>
        </form>
      </div>
    </div>
  )
}
