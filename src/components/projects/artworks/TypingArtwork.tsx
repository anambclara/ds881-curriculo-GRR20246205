interface TypingArtworkProps {
  compact?: boolean
}

export function TypingArtwork({ compact = false }: TypingArtworkProps) {
  return (
    <svg
      className="project-artwork__svg project-artwork__svg--typing"
      viewBox="0 0 640 390"
      role="presentation"
      focusable="false"
      data-compact={compact}
    >
      <rect className="artwork__paper" width="640" height="390" rx="18" />
      <path className="artwork__line" d="M35 50h570M35 340h570" />
      <text className="artwork__kicker" x="40" y="88">DESAFIO ABNT</text>
      <text className="artwork__headline" x="40" y="142">teclar é criar</text>
      <g className="typing-artwork__keyboard" transform="translate(38 190)">
        <rect className="artwork__panel" width="420" height="112" rx="10" />
        {Array.from({ length: 30 }, (_, index) => {
          const column = index % 10
          const row = Math.floor(index / 10)
          return (
            <rect
              className={index === 16 ? 'artwork__key artwork__key--active' : 'artwork__key'}
              key={index}
              x={14 + column * 39}
              y={14 + row * 29}
              width={30}
              height={20}
              rx={3}
            />
          )
        })}
        <rect className="artwork__key artwork__key--space" x="115" y="88" width="190" height="12" rx="3" />
        <text className="artwork__key-label" x="336" y="101">Ç</text>
      </g>
      <g className="typing-artwork__score" transform="translate(493 190)">
        <rect className="artwork__ink-panel" width="108" height="112" rx="10" />
        <text className="artwork__score-label" x="16" y="29">PLACAR</text>
        <text className="artwork__score-value" x="15" y="74">08</text>
        <text className="artwork__score-label" x="69" y="75">pts</text>
      </g>
      <circle className="artwork__pin" cx="572" cy="66" r="17" />
    </svg>
  )
}
