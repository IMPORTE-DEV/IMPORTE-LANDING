import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { OMark } from './OMark'

type Theme = 'dark' | 'light'

const navItems = [
  { label: '연결', id: 'connection' },
  { label: '신뢰', id: 'trust' },
  { label: '리포트', id: 'report' },
  { label: '철학', id: 'positioning' },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Header({ visible }: { visible: boolean }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const themedSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-header-theme]'),
    )
    if (themedSections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTheme(entry.target.getAttribute('data-header-theme') as Theme)
          }
        })
      },
      { rootMargin: '-72px 0px -85% 0px', threshold: 0 },
    )
    themedSections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const navSections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el)
    if (navSections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          let next = prev
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next = entry.target.id
            } else if (entry.target.id === prev) {
              next = null
            }
          })
          return next
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    navSections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const isDark = theme === 'dark'
  const fg = isDark ? '#F2EEE5' : '#0B0B0A'
  const muted = isDark ? '#A8A39A' : 'rgba(11,11,10,0.55)'
  const bg = isDark ? '#0B0B0A' : '#F2EEE5'

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 flex h-16 items-center px-6 sm:px-10 lg:px-24"
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : -12,
        backgroundColor: bg,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <button
        type="button"
        data-header-logo
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-2.5"
        aria-label="맨 위로"
      >
        <OMark size={22} ignited />
        <motion.span
          className="font-display text-[15px] font-extrabold tracking-wide"
          animate={{ color: fg }}
          transition={{ duration: 0.3 }}
        >
          IMPORTE
        </motion.span>
      </button>

      <nav className="ml-14 hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToId(item.id)}
            className="relative py-2 text-[14px] font-medium"
          >
            <motion.span
              animate={{ color: active === item.id ? fg : muted }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.span>
            {active === item.id && (
              <motion.span
                layoutId="header-active-dot"
                className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-brand-orange"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </nav>

      <motion.button
        type="button"
        onClick={() => scrollToId('closing-cta')}
        className="ml-auto text-[13px] font-semibold sm:text-[14px]"
        animate={{ color: fg }}
        transition={{ duration: 0.3 }}
      >
        Get Early Access →
      </motion.button>
    </motion.header>
  )
}
