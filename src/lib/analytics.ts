// Google Analytics 4 event tracking

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// Pre-defined events for conversions
export const trackCTAClick = (buttonName: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: buttonName
  })
}

export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', {
    event_category: 'outbound',
    event_label: platform
  })
}

export const trackFormSubmit = () => {
  trackEvent('generate_lead', {
    event_category: 'form',
    event_label: 'contact_form'
  })
}
