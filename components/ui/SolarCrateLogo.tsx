interface Props {
  variant?: 'light' | 'dark'
  height?: number
  className?: string
}

function SunIcon({ size }: { size: number }) {
  const center = size / 2
  const R = size * 0.46
  const r = size * 0.13
  const halfAngle = 16 * Math.PI / 180 // 32° wide segments with 4° gaps → 10 segments × 36°

  const cosH = Math.cos(halfAngle)
  const sinH = Math.sin(halfAngle)

  const ox = (R * cosH).toFixed(3)
  const oy = (R * sinH).toFixed(3)
  const noy = (-R * sinH).toFixed(3)
  const ix = (r * cosH).toFixed(3)
  const iy = (r * sinH).toFixed(3)
  const niy = (-r * sinH).toFixed(3)
  const Rf = R.toFixed(3)
  const rf = r.toFixed(3)

  // Wedge path: inner -16° → outer -16° → outer arc +16° → inner +16° → inner arc back
  const d = `M ${ix},${niy} L ${ox},${noy} A ${Rf},${Rf} 0 0,1 ${ox},${oy} L ${ix},${iy} A ${rf},${rf} 0 0,0 ${ix},${niy} Z`

  const rotations = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`sg-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8821E" />
          <stop offset="100%" stopColor="#F7B733" />
        </radialGradient>
      </defs>
      <g transform={`translate(${center},${center})`}>
        {rotations.map((angle) => (
          <path
            key={angle}
            d={d}
            fill={`url(#sg-${size})`}
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  )
}

export function SolarCrateLogo({ variant = 'light', height = 48, className = '' }: Props) {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#555555'
  const fontSize = Math.round(height * 0.70)
  const iconSize = Math.round(fontSize * 1.0)
  const tagSize = Math.round(height * 0.185)

  return (
    <div
      className={`flex flex-col select-none ${className}`}
      aria-label="SolarCrate — Green Energy Solutions"
    >
      <div
        className="flex items-center font-display font-bold"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1 }}
      >
        <span style={{ color: textColor }}>S</span>
        <SunIcon size={iconSize} />
        <span style={{ color: textColor }}>lar</span>
        <span style={{ color: '#E8821E' }}>Crate</span>
      </div>
      <div
        className="font-display font-medium"
        style={{
          fontSize: `${tagSize}px`,
          color: '#6B9B9B',
          letterSpacing: '0.22em',
          marginTop: `${Math.round(height * 0.05)}px`,
          paddingLeft: '1px',
        }}
      >
        GREEN ENERGY SOLUTIONS
      </div>
    </div>
  )
}
