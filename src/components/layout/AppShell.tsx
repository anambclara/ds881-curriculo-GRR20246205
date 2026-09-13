import type { PropsWithChildren } from 'react'
import { CursorLabel } from '../motion/CursorLabel'
import { PageActivity } from '../motion/PageActivity'
import { ScrollProgress } from '../motion/ScrollProgress'
import { Header } from './Header'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <>
      <a
        className="skip-link"
        href="#projetos"
        onClick={() => document.getElementById('projetos')?.focus()}
      >
        Pular para os projetos
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <ScrollProgress />
      <PageActivity />
      <CursorLabel />
    </>
  )
}
