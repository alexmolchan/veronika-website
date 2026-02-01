'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface FormContextType {
  selectedIssues: string[]
  setSelectedIssues: (issues: string[]) => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: ReactNode }) {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <FormContext.Provider value={{ selectedIssues, setSelectedIssues, isModalOpen, openModal, closeModal }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (!context) throw new Error('useForm must be used within FormProvider')
  return context
}
