interface BankingArtworkProps {
  compact?: boolean
}

export function BankingArtwork({ compact = false }: BankingArtworkProps) {
  return (
    <svg
      className="project-artwork__svg project-artwork__svg--banking"
      viewBox="0 0 640 390"
      role="presentation"
      focusable="false"
      data-compact={compact}
    >
      <rect className="artwork__paper" width="640" height="390" rx="18" />
      <g className="banking-artwork__card" transform="translate(35 35) rotate(-5 150 82)">
        <rect className="artwork__ink-panel" width="290" height="165" rx="14" />
        <circle className="artwork__pin" cx="245" cy="34" r="18" />
        <path className="artwork__card-chip" d="M36 70h44v34H36z" />
        <text className="artwork__card-label" x="36" y="43">CONTA / ANA</text>
        <text className="artwork__card-number" x="36" y="140">•••• 2048</text>
      </g>
      <g className="banking-artwork__statement" transform="translate(360 38)">
        <rect className="artwork__panel" width="245" height="300" rx="12" />
        <text className="artwork__kicker" x="24" y="38">EXTRATO</text>
        <text className="artwork__balance" x="24" y="76">R$ 1.240,00</text>
        {[
          ['+ Depósito', 'R$ 400'],
          ['− Café', 'R$ 18'],
          ['− Livro', 'R$ 72'],
        ].map(([label, value], index) => (
          <g key={label} transform={`translate(24 ${124 + index * 52})`}>
            <circle className="artwork__transaction-dot" cx="8" cy="-5" r="5" />
            <text className="artwork__transaction" x="23" y="0">{label}</text>
            <text className="artwork__transaction-value" x="23" y="21">{value}</text>
            <path className="artwork__line" d="M0 35h194" />
          </g>
        ))}
      </g>
      <text className="artwork__side-note" x="50" y="283">ENTENDER • ORGANIZAR • CUIDAR</text>
    </svg>
  )
}
