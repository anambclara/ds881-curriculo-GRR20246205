import { useEffect } from 'react'
import { usePageInView } from './usePageInView'

export function PageActivity() {
  const inView = usePageInView()

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('page-is-hidden', !inView)
    return () => document.documentElement.classList.remove('page-is-hidden')
  }, [inView])

  return null
}
