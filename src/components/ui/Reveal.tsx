'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
}

interface RevealProps {
  children: ReactNode
  /** seconds */
  delay?: number
  direction?: Direction
  className?: string
  /** re-trigger every time it enters the viewport */
  once?: boolean
}

/**
 * Scroll-reveal wrapper using a real spring. Animates the first time the
 * element scrolls into view. Keep it light — it wraps a single block.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...OFFSET[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ type: 'spring' as const, stiffness: 90, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}
