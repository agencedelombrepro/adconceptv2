import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animFrame: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const animate = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      setFollowerPos({ x: currentX, y: currentY })
      animFrame = requestAnimationFrame(animate)
    }

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a') || target.closest('button') || target.closest('[data-cursor]')
      if (link) {
        setIsHovering(true)
        const cursorLabel = link.getAttribute('data-cursor')
        if (cursorLabel) setCursorText(cursorLabel)
        else setCursorText('')
      } else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    animFrame = requestAnimationFrame(animate)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleOver)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Point central — mix-blend-mode difference : blanc sur vert, noir sur blanc */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
        style={{
          x: position.x - 4,
          y: position.y - 4,
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          style={{ backgroundColor: '#ffffff', borderRadius: '50%' }}
          animate={{
            width:   isClicking ? 6  : 8,
            height:  isClicking ? 6  : 8,
            opacity: isHovering ? 0  : 1,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Anneau suiveur — deux couches : une pour la couleur de fond, une visible en difference */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:flex items-center justify-center"
        style={{
          x: followerPos.x - 20,
          y: followerPos.y - 20,
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          style={{
            borderRadius: '50%',
            border: '1.5px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          animate={{
            width:  isHovering ? (cursorText ? 80 : 44) : 40,
            height: isHovering ? (cursorText ? 80 : 44) : 40,
            backgroundColor: isHovering ? 'rgba(255,255,255,0.12)' : 'transparent',
            borderColor: isClicking ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.85)',
          }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5 }}
              style={{ color: '#ffffff', fontSize: 10, fontWeight: 500, letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1.2, padding: '0 4px' }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
