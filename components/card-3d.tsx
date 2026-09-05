'use client'

import React, { useRef, useState } from 'react'

export function Card3D({
  children,
  className = '',
  glare = true,
  maxTilt = 10,
}: {
  children: React.ReactNode
  className?: string
  glare?: boolean
  maxTilt?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = -((y - centerY) / centerY) * maxTilt
    const rotY = ((x - centerX) / centerX) * maxTilt

    setRotateX(rotX)
    setRotateY(rotY)

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.35,
      })
    }
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      style={{ perspective: 1200 }}
      className="transition-transform duration-300 ease-out"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden rounded-3xl transition-transform duration-200 ease-out will-change-transform ${className}`}
      >
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 70%)`,
              opacity: glarePos.opacity,
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
