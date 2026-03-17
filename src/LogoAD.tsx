interface LogoADProps {
  color?: string
  size?: number
  className?: string
  variant?: 'dark' | 'light'
}

export function LogoAD({ size = 48, className = '' }: LogoADProps) {
  return (
    <img
      src="/ad-concept-blanc.png"
      alt="AD Concept — Architecture d'intérieur"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  )
}
