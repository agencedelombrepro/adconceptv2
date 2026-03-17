import { motion } from 'motion/react'
import { useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 60 }
      case 'down': return { opacity: 0, y: -60 }
      case 'left': return { opacity: 0, x: 60 }
      case 'right': return { opacity: 0, x: -60 }
      case 'fade': return { opacity: 0 }
    }
  }

  const getAnimate = () => {
    switch (direction) {
      case 'left':
      case 'right': return { opacity: 1, x: 0 }
      default: return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
