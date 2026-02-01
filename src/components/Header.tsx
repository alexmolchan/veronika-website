'use client'
import { useState, useEffect, useCallback } from 'react'
import { useForm } from '@/context/FormContext'

export default function Header({ content }: { content: any }) {
  const { openModal } = useForm()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleBooking = () => {
    closeMenu()
    openModal()
  }

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-grass focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Перейти к содержимому
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 px-[5%] flex justify-between items-center bg-white/[0.98] backdrop-blur-[20px] transition-all duration-300 ${scrolled ? 'py-3 shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'py-5'}`}
        role="banner"
      >
        <a href="#" className="font-serif text-xl font-medium text-charcoal hover:text-grass transition-colors">
          {content?.name || 'Вероника'} {content?.lastName || 'Хмельницкая'}
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-10" aria-label="Главное меню">
          <a href="#about" className="text-gray text-sm font-medium hover:text-charcoal transition-colors focus:outline-none focus:text-grass">Обо мне</a>
          <a href="#services" className="text-gray text-sm font-medium hover:text-charcoal transition-colors focus:outline-none focus:text-grass">Услуги</a>
          <a href="#format" className="text-gray text-sm font-medium hover:text-charcoal transition-colors focus:outline-none focus:text-grass">Формат</a>
          <a href="#faq" className="text-gray text-sm font-medium hover:text-charcoal transition-colors focus:outline-none focus:text-grass">Вопросы</a>
        </nav>

        <button
          onClick={openModal}
          className="hidden md:flex items-center gap-2 px-6 py-3 bg-grass text-white text-sm font-medium rounded-full hover:bg-grass-dark transition-all focus:outline-none focus:ring-2 focus:ring-grass focus:ring-offset-2"
        >
          Связаться
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-charcoal focus:outline-none focus:ring-2 focus:ring-grass rounded"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6"/>
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18"/>
            )}
          </svg>
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="fixed top-16 left-0 right-0 bg-white z-40 shadow-lg md:hidden"
          aria-label="Мобильное меню"
        >
          <div className="flex flex-col p-6 gap-4">
            <a href="#about" onClick={closeMenu} className="text-charcoal font-medium py-2 hover:text-grass transition-colors">Обо мне</a>
            <a href="#services" onClick={closeMenu} className="text-charcoal font-medium py-2 hover:text-grass transition-colors">Услуги</a>
            <a href="#format" onClick={closeMenu} className="text-charcoal font-medium py-2 hover:text-grass transition-colors">Формат</a>
            <a href="#faq" onClick={closeMenu} className="text-charcoal font-medium py-2 hover:text-grass transition-colors">Вопросы</a>
            <button onClick={handleBooking} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-grass text-white font-medium rounded-full mt-2">
              Связаться
            </button>
          </div>
        </nav>
      )}
    </>
  )
}
