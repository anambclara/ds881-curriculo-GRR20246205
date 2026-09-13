import { useEffect, useState } from 'react'

export function usePageInView() {
  const [inView, setInView] = useState(() =>
    typeof document === 'undefined' || document.visibilityState !== 'hidden',
  )

  useEffect(() => {
    const update = () => setInView(document.visibilityState !== 'hidden')
    const show = () => setInView(true)
    const hide = () => setInView(false)

    document.addEventListener('visibilitychange', update)
    window.addEventListener('pageshow', show)
    window.addEventListener('pagehide', hide)
    return () => {
      document.removeEventListener('visibilitychange', update)
      window.removeEventListener('pageshow', show)
      window.removeEventListener('pagehide', hide)
    }
  }, [])

  return inView
}
