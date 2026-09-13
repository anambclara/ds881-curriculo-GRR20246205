interface EcompArtworkProps {
  compact?: boolean
}

export function EcompArtwork({ compact = false }: EcompArtworkProps) {
  return (
    <svg
      className="project-artwork__svg project-artwork__svg--ecomp"
      viewBox="0 0 640 390"
      role="presentation"
      focusable="false"
      data-compact={compact}
    >
      <rect className="artwork__paper" width="640" height="390" rx="18" />
      <g className="ecomp-artwork__post" transform="translate(34 36) rotate(-4 125 136)">
        <rect className="artwork__panel" width="250" height="272" rx="8" />
        <rect className="artwork__blue-block" x="20" y="20" width="210" height="96" rx="5" />
        <text className="artwork__post-title" x="32" y="68">IDEIAS</text>
        <text className="artwork__post-title" x="32" y="95">EM MOVIMENTO</text>
        <path className="artwork__line" d="M22 146h205M22 165h154M22 184h188" />
        <circle className="artwork__pin" cx="205" cy="232" r="14" />
        <text className="artwork__kicker" x="22" y="238">ECOMP • UFPR</text>
      </g>
      <g className="ecomp-artwork__event" transform="translate(310 34) rotate(5 135 100)">
        <rect className="artwork__ink-panel" width="270" height="205" rx="10" />
        <text className="artwork__event-label" x="22" y="42">EVENTO</text>
        <text className="artwork__event-title" x="22" y="86">conversa</text>
        <text className="artwork__event-title" x="22" y="118">que aproxima</text>
        <path className="artwork__event-arrow" d="M22 162h170l-18-13m18 13-18 13" />
      </g>
      <g className="ecomp-artwork__bubble" transform="translate(355 267)">
        <path className="artwork__bubble" d="M0 0h218a12 12 0 0 1 12 12v62a12 12 0 0 1-12 12H72l-34 27 5-27H12A12 12 0 0 1 0 74z" />
        <text className="artwork__bubble-copy" x="18" y="39">vamos construir juntas?</text>
        <circle className="artwork__bubble-dot" cx="21" cy="69" r="4" />
        <circle className="artwork__bubble-dot" cx="38" cy="69" r="4" />
        <circle className="artwork__bubble-dot" cx="55" cy="69" r="4" />
      </g>
    </svg>
  )
}
