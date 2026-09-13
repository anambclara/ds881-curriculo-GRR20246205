export function AboutNote() {
  return (
    <section className="about-note section-panel" id="sobre" aria-labelledby="about-title">
      <div className="about-note__label">Um pouco sobre mim</div>
      <div className="about-note__content">
        <h2 id="about-title">Sobre mim</h2>
        <p data-testid="about-note-copy">
          Estudo Análise e Desenvolvimento de Sistemas na UFPR e participo da Ecomp,
          onde aprendo na prática a criar com outras pessoas. Gosto de unir
          desenvolvimento, design e comunicação para transformar ideias em experiências
          digitais simples, expressivas e acolhedoras.
        </p>
      </div>
    </section>
  )
}
