import type { PropsWithChildren } from 'react'

type ArrowLinkProps = PropsWithChildren<{
  href: string
  external?: boolean
}>

export function ArrowLink({ href, children, external = false }: ArrowLinkProps) {
  return (
    <a
      className="arrow-link"
      href={href}
      {...(external ? { rel: 'noreferrer', target: '_blank' } : {})}
    >
      <span>{children}</span>
      <span className="arrow-link__icon" aria-hidden="true">
        {external ? '↗' : '→'}
      </span>
    </a>
  )
}
