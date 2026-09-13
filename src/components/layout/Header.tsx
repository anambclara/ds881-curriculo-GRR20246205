const navigation = [
  { href: '#inicio', label: 'Início', marker: '01' },
  { href: '#projetos', label: 'Projetos', marker: '02' },
  { href: '#contato', label: 'Contato', marker: '03' },
] as const

export function Header() {
  return (
    <header className="site-header">
      <a className="site-header__monogram" href="#inicio" aria-label="Ir para o início">
        <img
          className="site-header__brand-icon"
          src="/images/brand/hello-kitty.svg"
          alt=""
          aria-hidden="true"
          width="1500"
          height="1500"
        />
      </a>
      <nav className="site-nav" aria-label="Principal">
        {navigation.map(({ href, label, marker }) => (
          <a className="site-nav__link" href={href} key={href}>
            <span className="site-nav__marker" aria-hidden="true">
              {marker}
            </span>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
