'use client'

import { useEffect, useRef } from 'react'

export function EnvironmentalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle System (Bio-luminescent spores / Clean energy photons)
    const particleCount = Math.min(60, Math.floor(width / 25))
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1, // Floating gently upward like fresh oxygen/spores
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? '16, 185, 129' : '52, 211, 153', // Emerald & Mint
    }))

    // Ambient floating energy waves
    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw subtle ambient aurora gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time * 0.001) * 80,
        height * 0.15 + Math.cos(time * 0.001) * 50,
        0,
        width * 0.2,
        height * 0.15,
        width * 0.45
      )
      grad1.addColorStop(0, 'rgba(16, 185, 129, 0.12)')
      grad1.addColorStop(0.5, 'rgba(5, 150, 105, 0.04)')
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad1
      ctx.fillRect(0, 0, width, height)

      const grad2 = ctx.createRadialGradient(
        width * 0.8 + Math.cos(time * 0.001) * 60,
        height * 0.4 + Math.sin(time * 0.001) * 40,
        0,
        width * 0.8,
        height * 0.4,
        width * 0.5
      )
      grad2.addColorStop(0, 'rgba(13, 148, 136, 0.10)')
      grad2.addColorStop(0.6, 'rgba(4, 120, 87, 0.03)')
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha += Math.sin(time * p.pulse) * 0.008

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.1, Math.min(0.8, p.alpha))})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(${p.color}, 0.8)`
        ctx.fill()
      })

      ctx.shadowBlur = 0
      time += 1
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  )
}
