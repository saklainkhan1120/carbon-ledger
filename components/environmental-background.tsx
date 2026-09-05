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

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = width / 2
    let targetMouseY = height / 2

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // 3D Floating Nodes & Crystalline Prisms
    const nodeCount = Math.min(45, Math.floor(width / 30))
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 400 + 100, // 3D depth
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.5 - 0.2,
      size: Math.random() * 3 + 2,
      baseAlpha: Math.random() * 0.4 + 0.3,
      alpha: 0.4,
      color: Math.random() > 0.5 
        ? '5, 150, 105' // Emerald
        : Math.random() > 0.5 
          ? '13, 148, 136' // Teal
          : '16, 185, 129', // Mint
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
    }))

    let time = 0

    const render = () => {
      // Smooth mouse follow interpolation
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      ctx.clearRect(0, 0, width, height)

      // 1. Radiant Pearlescent Light Gradient Base
      const bgGrad = ctx.createLinearGradient(0, 0, width, height)
      bgGrad.addColorStop(0, '#f8fafc') // Slate 50
      bgGrad.addColorStop(0.3, '#f0fdf4') // Emerald 50
      bgGrad.addColorStop(0.7, '#ecfdf5') // Mint 50
      bgGrad.addColorStop(1, '#f8fafc')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // 2. Multi-Layer Luminous 3D Aurora Meshes
      const aurora1 = ctx.createRadialGradient(
        width * 0.25 + Math.sin(time * 0.0008) * 120 + (mouseX - width / 2) * 0.08,
        height * 0.2 + Math.cos(time * 0.001) * 80 + (mouseY - height / 2) * 0.08,
        0,
        width * 0.25,
        height * 0.2,
        width * 0.45
      )
      aurora1.addColorStop(0, 'rgba(16, 185, 129, 0.18)')
      aurora1.addColorStop(0.4, 'rgba(52, 211, 153, 0.08)')
      aurora1.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = aurora1
      ctx.fillRect(0, 0, width, height)

      const aurora2 = ctx.createRadialGradient(
        width * 0.75 + Math.cos(time * 0.0007) * 140 - (mouseX - width / 2) * 0.06,
        height * 0.6 + Math.sin(time * 0.0009) * 90 - (mouseY - height / 2) * 0.06,
        0,
        width * 0.75,
        height * 0.6,
        width * 0.5
      )
      aurora2.addColorStop(0, 'rgba(20, 184, 166, 0.16)')
      aurora2.addColorStop(0.5, 'rgba(45, 212, 191, 0.06)')
      aurora2.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = aurora2
      ctx.fillRect(0, 0, width, height)

      // 3. Subtle 3D Perspective Grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.04)'
      ctx.lineWidth = 1
      const gridSize = 64
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // 4. Update and Render 3D Interconnected Nodes
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i]
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed

        // 3D Parallax offset based on cursor
        const perspective = 500 / (500 + p.z)
        const renderX = p.x + (mouseX - width / 2) * (1 - perspective) * 0.3
        const renderY = p.y + (mouseY - height / 2) * (1 - perspective) * 0.3
        const renderSize = p.size * perspective

        // Screen wrap
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20

        // Inter-node 3D Filaments
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.15
            ctx.beginPath()
            ctx.moveTo(renderX, renderY)
            const p2Perspective = 500 / (500 + p2.z)
            const p2RenderX = p2.x + (mouseX - width / 2) * (1 - p2Perspective) * 0.3
            const p2RenderY = p2.y + (mouseY - height / 2) * (1 - p2Perspective) * 0.3
            ctx.lineTo(p2RenderX, p2RenderY)
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`
            ctx.stroke()
          }
        }

        // Draw 3D Crystal Prism / Node
        ctx.save()
        ctx.translate(renderX, renderY)
        ctx.rotate(p.rotation)

        ctx.beginPath()
        ctx.arc(0, 0, renderSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha})`
        ctx.shadowBlur = 12
        ctx.shadowColor = `rgba(${p.color}, 0.5)`
        ctx.fill()

        // Inner glowing core
        ctx.beginPath()
        ctx.arc(0, 0, renderSize * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()

        ctx.restore()
      }

      ctx.shadowBlur = 0
      time += 1
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-100"
      aria-hidden="true"
    />
  )
}
