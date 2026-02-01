'use client'
import { FormProvider } from '@/context/FormContext'
import ContactModal from './ContactModal'

export default function ClientWrapper({
  children,
  content
}: {
  children: React.ReactNode
  content: any
}) {
  return (
    <FormProvider>
      {children}
      <ContactModal content={content} />
    </FormProvider>
  )
}
