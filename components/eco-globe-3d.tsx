'use client'

import { useEffect, useRef, useState } from 'react'
import { Activity, Flame, Globe2, ShieldCheck, Zap } from 'lucide-react'

export function EcoGlobe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeNode, setActiveNode] = useState<'scope1' | 'scope2' | 'scope3' | 'dewa'>('scope2')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const size = 360
    canvas.width = size * 2
    canvas.height = size * 2

    let rotX = 0.2
    let rotY = 0
    let targetRotY = 0
    let isHovering = false

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetRotY = x * 1.5
      rotX = 0.2 + y * 0.8
    }

    const handleMouseEnter = () => { isHovering = true }
    const handleMouseLeave = () => { isHovering = false; targetRotY = 0 }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Generate 3D Globe Points
    const numPoints = 120
    const points: { x: number; y: number; z: number }[] = []
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(2 * (i / numPoints) - 1)
      const phi = Math.sqrt(numPoints * Math.PI) * theta
      const radius = 110
      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
      })
    }

    let time = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(2, 2)
      ctx.translate(size / 2, size / 2)

      // Auto-rotation when not hovering
      if (!isHovering) {
        rotY += 0.008
      } else {
        rotY += (targetRotY - rotY) * 0.05
      }

      time += 0.02

      // 1. Draw glowing outer 3D halo
      const halo = ctx.createRadialGradient(0, 0, 80, 0, 0, 150)
      halo.addColorStop(0, 'rgba(16, 185, 129, 0.15)')
      halo.addColorStop(0.6, 'rgba(20, 184, 166, 0.08)')
      halo.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(0, 0, 150, 0, Math.PI * 2)
      ctx.fill()

      // 2. Rotate and project 3D points
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.x * Math.cos(rotY) + p.z * Math.sin(rotY)
        let z1 = -p.x * Math.sin(rotY) + p.z * Math.cos(rotY)
        // Rotate X
        let y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX)
        let z2 = p.y * Math.sin(rotX) + z1 * Math.cos(rotX)

        const fov = 300
        const scale = fov / (fov + z2)
        return {
          x: x1 * scale,
          y: y2 * scale,
          z: z2,
          scale,
        }
      })

      // Sort by depth
      projected.sort((a, b) => b.z - a.z)

      // Draw 3D globe connecting rings
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(0, 0, 110, 35, rotX, 0, Math.PI * 2)
      ctx.stroke()

      // Draw points
      projected.forEach((p) => {
        const alpha = Math.max(0.1, (p.z + 110) / 220)
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(1, 2.2 * p.scale), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(5, 150, 105, ${alpha * 0.85})`
        ctx.shadowBlur = p.z > 0 ? 8 : 0
        ctx.shadowColor = 'rgba(16, 185, 129, 0.6)'
        ctx.fill()
      })

      // 3. Draw Orbiting 3D Energy Rings
      const ringRadius = 135
      const orbitAngle = time * 0.8
      const ox = ringRadius * Math.cos(orbitAngle)
      const oy = ringRadius * Math.sin(orbitAngle) * 0.35 * Math.cos(rotX)
      const oz = ringRadius * Math.sin(orbitAngle) * Math.sin(rotX)

      // Orbiting Satellite Beacon
      ctx.beginPath()
      ctx.arc(ox, oy, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#10b981'
      ctx.shadowBlur = 15
      ctx.shadowColor = '#10b981'
      ctx.fill()

      // Center Core
      ctx.beginPath()
      ctx.arc(0, 0, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#047857'
      ctx.shadowBlur = 10
      ctx.shadowColor = '#10b981'
      ctx.fill()

      ctx.restore()
      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* 3D Canvas */}
      <div className="relative size-[280px] sm:size-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          className="size-full object-contain filter drop-shadow-[0_10px_25px_rgba(16,185,129,0.2)]"
        />

        {/* Floating 3D Badge 1: DEWA Grid */}
        <div className="absolute top-2 -left-4 sm:left-0 rounded-2xl border border-emerald-500/20 bg-white/90 px-3 py-2 shadow-xl shadow-emerald-950/5 backdrop-blur-xl animate-bounce [animation-duration:4s]">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Zap size={14} className="stroke-[2.5]" />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-500">DEWA Grid</p>
              <p className="font-mono text-xs font-black text-emerald-800">0.450 kg/kWh</p>
            </div>
          </div>
        </div>

        {/* Floating 3D Badge 2: Net Zero 2050 */}
        <div className="absolute bottom-2 -right-4 sm:right-0 rounded-2xl border border-teal-500/20 bg-white/90 px-3.5 py-2 shadow-xl shadow-teal-950/5 backdrop-blur-xl animate-bounce [animation-duration:5s]">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <ShieldCheck size={14} className="stroke-[2.5]" />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase text-slate-500">Law 11/2024</p>
              <p className="text-xs font-black text-teal-800">100% Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scope Switcher */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveNode('scope1')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeNode === 'scope1'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <Flame size={12} /> Scope 1: Direct
        </button>
        <button
          onClick={() => setActiveNode('scope2')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeNode === 'scope2'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <Zap size={12} /> Scope 2: DEWA/ADDC
        </button>
        <button
          onClick={() => setActiveNode('scope3')}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            activeNode === 'scope3'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white/80 text-slate-700 border border-slate-200 hover:bg-emerald-50'
          }`}
        >
          <Activity size={12} /> Scope 3: Supply
        </button>
      </div>
    </div>
  )
}
