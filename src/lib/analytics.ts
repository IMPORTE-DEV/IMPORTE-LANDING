type AnalyticsFn = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: AnalyticsFn
    clarity?: AnalyticsFn
  }
}

/** Fires a CTA click event to both GA4 and Clarity, if loaded. */
export function trackCtaClick(label: string) {
  window.gtag?.('event', 'cta_click', {
    event_category: 'engagement',
    event_label: label,
  })
  window.clarity?.('event', `cta_click_${label}`)
}
