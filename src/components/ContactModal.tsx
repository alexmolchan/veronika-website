'use client'
import { useState, useEffect, useRef } from 'react'
import { useForm } from '@/context/FormContext'
import { useRouter } from 'next/navigation'
import { trackFormSubmit } from '@/lib/analytics'

export default function ContactModal({ content }: { content: any }) {
  const { isModalOpen, closeModal, selectedIssues } = useForm()
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  // Load Turnstile script and render widget
  useEffect(() => {
    if (!isModalOpen) return

    const renderWidget = () => {
      if (turnstileRef.current && (window as any).turnstile && !widgetIdRef.current) {
        widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAACWdkPj6eppzY5wO',
          callback: (token: string) => {
            setTurnstileToken(token)
          },
          'error-callback': () => {
            setError('Ошибка проверки безопасности. Обновите страницу.')
          },
          theme: 'light',
          size: 'invisible',
        })
      }
    }

    // Check if script already loaded
    if ((window as any).turnstile) {
      renderWidget()
    } else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.onload = renderWidget
      document.head.appendChild(script)
    }

    return () => {
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
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
          name: formData.name,
          email: '', // Not collecting email in simplified form
          messenger: 'telegram',
          contact: formData.contact,
          message: '',
          issues: selectedIssues,
          turnstileToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка отправки')
      }

      // Track form submission in GA4
      trackFormSubmit()

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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto shadow-2xl animate-slide-up sm:animate-none"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 id="modal-title" className="font-serif text-xl sm:text-2xl text-charcoal">
              Записаться
            </h2>
            <p className="text-sm text-gray mt-1">Свяжусь с вами в течение 24 часов</p>
          </div>
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
          {/* Selected Issues - compact */}
          {selectedIssues.length > 0 && (
            <div className="bg-olive-light rounded-xl p-3">
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
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-grass focus:border-transparent transition-all text-lg"
              placeholder="Как к вам обращаться?"
            />
          </div>

          {/* Contact - simplified to one field */}
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-charcoal mb-2">
              Telegram или телефон
            </label>
            <input
              type="text"
              id="contact"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-grass focus:border-transparent transition-all text-lg"
              placeholder="@username или +375..."
            />
          </div>

          {/* Turnstile Widget - invisible */}
          <div ref={turnstileRef} />

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
            className="w-full py-4 bg-grass text-white font-medium rounded-full hover:bg-grass-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            data-gtm="cta-form-submit"
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
              'Отправить заявку'
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
