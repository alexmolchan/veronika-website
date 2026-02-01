'use client'
import { useState, useEffect } from 'react'

export default function Header({ content }: { content: any }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-[5%] flex justify-between items-center bg-white/[0.98] backdrop-blur-[20px] transition-all duration-300 ${scrolled ? 'py-3 shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'py-5'}`}>
      <div className="font-serif text-xl font-medium text-charcoal">
        {content?.name || 'Вероника'} {content?.lastName || 'Хмельницкая'}
      </div>
      <nav className="hidden md:flex gap-10">
        <a href="#about" className="text-gray text-sm font-medium hover:text-charcoal transition-colors">Обо мне</a>
        <a href="#services" className="text-gray text-sm font-medium hover:text-charcoal transition-colors">Услуги</a>
        <a href="#format" className="text-gray text-sm font-medium hover:text-charcoal transition-colors">Формат</a>
        <a href="#faq" className="text-gray text-sm font-medium hover:text-charcoal transition-colors">Вопросы</a>
      </nav>
      <a href="#contact" className="hidden md:flex items-center gap-2 px-6 py-3 bg-grass text-white text-sm font-medium rounded-full hover:bg-grass-dark transition-all">
        Связаться
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </header>
  )
}
