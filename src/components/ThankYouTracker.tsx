'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function ThankYouTracker() {
  useEffect(() => {
    // Track conversion on thank you page view
    trackEvent('conversion', {
      event_category: 'lead',
      event_label: 'thank_you_page'
    })
  }, [])

  return null
}
