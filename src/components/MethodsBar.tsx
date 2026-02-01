export default function MethodsBar({ content }: { content: any }) {
  const methods = content?.methods?.split('\n').filter(Boolean) || [
    'Когнитивно-поведенческая терапия',
    'Терапия принятия и ответственности',
    'Схема-терапия',
    'ICF-коучинг',
    'Эмбодимент-коучинг'
  ]

  return (
    <div className="bg-charcoal py-8 px-[5%]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 flex-wrap">
        <div className="text-white/70 text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap">
          Методы работы
        </div>
        <div className="flex gap-8 flex-wrap justify-center flex-1">
          {methods.map((method: string, i: number) => (
            <div key={i} className="text-white/85 text-sm">{method}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
