interface SkillsTickerProps {
  items: readonly string[]
}

function SkillList({ items, decorative = false }: { items: readonly string[]; decorative?: boolean }) {
  return (
    <ul aria-hidden={decorative || undefined}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>
          <span aria-hidden="true">✦</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function SkillsTicker({ items }: SkillsTickerProps) {
  return (
    <div
      className="skills-ticker"
      role="region"
      aria-label="Repertório de habilidades — focar pausa a animação"
      tabIndex={0}
      data-motion-pause-target="true"
    >
      <div className="skills-ticker__viewport">
        <div className="skills-ticker__track">
          <SkillList items={items} />
          <SkillList items={items} decorative />
        </div>
      </div>
    </div>
  )
}
