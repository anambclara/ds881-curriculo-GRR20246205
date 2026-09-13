import { profile } from '../../data/profile'
import { ArrowLink } from '../ui/ArrowLink'

export function ContactFooter() {
  return (
    <footer className="contact-footer section-panel" id="contato" aria-labelledby="contact-title">
      <div className="contact-footer__copy">
        <section className="contact-footer__about" aria-label="Um pouco sobre mim">
          <p className="contact-footer__note">Um pouco sobre mim</p>
          <p className="contact-footer__intro">
            Estudo Análise e Desenvolvimento de Sistemas na UFPR e participo da Ecomp, onde
            sou diretora de Comunicação e aprendo na prática a criar com outras pessoas.
            Desde que saí da minha cidade natal, Pedro de Toledo, sempre trouxe comigo a
            vontade de aprender e peguei gosto pelo novo.
          </p>
        </section>
        <section className="contact-footer__closing">
          <h2 id="contact-title">Obrigado por ter lido até aqui!</h2>
          <p className="contact-footer__intro">Segue meus links para contato.</p>
          <div className="contact-footer__links">
            <ArrowLink href={`mailto:${profile.email}`}>Enviar e-mail</ArrowLink>
            <ArrowLink href={profile.linkedin} external>LinkedIn</ArrowLink>
            <ArrowLink href={profile.portfolioRepository} external>
              Repositório do portfólio
            </ArrowLink>
          </div>
        </section>
      </div>
      <img
        className="contact-footer__portrait"
        src="/images/ana/ana-contact.svg"
        alt="Ana Clara em uma pose descontraída"
        width="699"
        height="698"
        loading="lazy"
        decoding="async"
      />
      <p className="contact-footer__signature" aria-hidden="true">Ana Clara</p>
    </footer>
  )
}
