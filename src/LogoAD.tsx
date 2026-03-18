interface LogoADProps {
  color?: string
  size?: number
  className?: string
  variant?: 'dark' | 'light'
}

export function LogoAD({ size = 48, className = '', variant }: LogoADProps) {
  const src = variant === 'light' ? '/ad-concept-blanc.png' : '/ADClogoPNGclair.png'
  return (
    <img
      src={src}
      alt="AD Concept — Architecture d'intérieur"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  )
}
