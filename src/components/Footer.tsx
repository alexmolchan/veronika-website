import Link from 'next/link'

export default function Footer({ content }: { content: any }) {
  return (
    <footer className="bg-charcoal text-white/85 py-12 px-[5%]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto text-center md:text-left">
        <div className="font-serif text-xl text-white">
          {content?.name || 'Вероника'} {content?.lastName || 'Хмельницкая'}
        </div>
        <div className="flex gap-8 flex-wrap justify-center">
          <Link href="/oferta" className="text-white/70 text-sm hover:text-white transition-colors">
            Договор оферты
          </Link>
          <Link href="/privacy" className="text-white/70 text-sm hover:text-white transition-colors">
            Политика конфиденциальности
          </Link>
        </div>
        <div className="text-xs text-white/70">© 2026 Все права защищены</div>
      </div>
    </footer>
  )
}
