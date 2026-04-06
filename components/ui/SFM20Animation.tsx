'use client'

import { useEffect, useRef } from 'react'

interface SFM20AnimationProps {
  className?: string
}

export function SFM20Animation({ className }: SFM20AnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const maybeCtx = cv.getContext('2d')
    if (!maybeCtx) return
    const ctx: CanvasRenderingContext2D = maybeCtx

    const S  = 1.55                          // scala globale
    const CL = 260 * S, CW = 90 * S, CH = 100 * S
    const WW = 100 * S
    const AX = 0.82, AY = 0.42
    const OX = 270, OY = 215

    function I(x: number, y: number, z: number): [number, number] {
      const px = x - y * AY
      const py = -z * 0.7 + y * AX * 0.5 + x * 0.15
      return [OX + px, OY + py]
    }

    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    const COL_CONTAINER_TOP = darkMode ? '#707070' : '#8A8A8A'
    const COL_CONTAINER_SIDE = darkMode ? '#505050' : '#6A6A6A'
    const COL_CONTAINER_FRONT = darkMode ? '#606060' : '#7A7A7A'
    const COL_CONTAINER_DARK = darkMode ? '#404040' : '#555555'
    const COL_PANEL = darkMode ? '#1A3050' : '#152840'
    const COL_PANEL_CELL = darkMode ? '#2A4A70' : '#1E3A5A'
    const COL_PANEL_GRID = darkMode ? '#3A6090' : '#2A5080'
    const COL_FRAME = darkMode ? '#888888' : '#4A4A4A'
    const COL_SUPPORT = darkMode ? '#909090' : '#555555'
    const COL_CABLE = darkMode ? '#707070' : '#444444'
    const COL_TEXT = darkMode ? '#BBBBBB' : '#555555'
    const COL_GROUND = darkMode ? '#353535' : '#D5D5D5'
    const COL_BADGE_BG = '#1A5A1A'
    const COL_BADGE_TEXT = '#FFFFFF'

    function drawPanelGrid(
      x1: number, y1: number, z1: number,
      x2: number, y2: number, z2: number,
      rows: number, cols: number,
      vertical = false
    ) {
      if (vertical) {
        const dx = (x2 - x1) / cols
        const dz = (z2 - z1) / rows
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const px = x1 + c * dx
            const pz = z1 + r * dz
            const pts = [I(px, y1, pz), I(px + dx * 0.92, y1, pz), I(px + dx * 0.92, y1, pz + dz * 0.92), I(px, y1, pz + dz * 0.92)]
            ctx.beginPath()
            ctx.moveTo(...pts[0])
            pts.slice(1).forEach(p => ctx.lineTo(...p))
            ctx.closePath()
            ctx.fillStyle = COL_PANEL_CELL
            ctx.fill()
            ctx.strokeStyle = COL_PANEL_GRID
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      } else {
        const dx = (x2 - x1) / cols
        const dy = (y2 - y1) / rows
        const dz = (z2 - z1) / rows
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const px = x1 + c * dx
            const py = y1 + r * dy
            const pz = z1 + r * dz
            const pts = [I(px, py, pz), I(px + dx * 0.92, py, pz), I(px + dx * 0.92, py + dy * 0.92, pz + dz * 0.92), I(px, py + dy * 0.92, pz + dz * 0.92)]
            ctx.beginPath()
            ctx.moveTo(...pts[0])
            pts.slice(1).forEach(p => ctx.lineTo(...p))
            ctx.closePath()
            ctx.fillStyle = COL_PANEL_CELL
            ctx.fill()
            ctx.strokeStyle = COL_PANEL_GRID
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
    }

    const { width: cvWidth, height: cvHeight } = cv

    function draw(theta: number, phaseText: string) {
      ctx.clearRect(0, 0, cvWidth, cvHeight)

      ctx.fillStyle = COL_TEXT
      ctx.font = '500 13px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(phaseText.toUpperCase(), OX + 130, OY - 120)

      ctx.fillStyle = COL_GROUND
      ctx.globalAlpha = 0.4
      const gpts = [I(-20, -20, 0), I(CL + 20, -20, 0), I(CL + 20, CW + 150, 0), I(-20, CW + 150, 0)]
      ctx.beginPath()
      ctx.moveTo(...gpts[0])
      gpts.slice(1).forEach(p => ctx.lineTo(...p))
      ctx.closePath()
      ctx.fill()
      ctx.globalAlpha = 1

      const bwz = CH - Math.cos(theta) * WW
      const bwy = -Math.sin(theta) * WW
      const fwz = CH - Math.cos(theta) * WW
      const fwy = CW + Math.sin(theta) * WW

      ctx.beginPath()
      ctx.moveTo(...I(0, 0, CH))
      ctx.lineTo(...I(CL, 0, CH))
      ctx.lineTo(...I(CL, bwy, bwz))
      ctx.lineTo(...I(0, bwy, bwz))
      ctx.closePath()
      ctx.fillStyle = COL_PANEL
      ctx.fill()
      ctx.strokeStyle = COL_FRAME
      ctx.lineWidth = 1.5
      ctx.stroke()

      if (theta < 0.3) {
        drawPanelGrid(4, 0, bwz + 2, CL - 4, 0, CH - 2, 7, 2, true)
      } else {
        drawPanelGrid(4, bwy * 0.95, bwz + (CH - bwz) * 0.05, CL - 4, 0, CH - 2, 7, 2)
      }
      ctx.beginPath()
      ctx.moveTo(...I(0, bwy, bwz))
      ctx.lineTo(...I(CL, bwy, bwz))
      ctx.strokeStyle = COL_FRAME
      ctx.lineWidth = 2.5
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(...I(0, 0, 0))
      ctx.lineTo(...I(CL, 0, 0))
      ctx.lineTo(...I(CL, 0, CH))
      ctx.lineTo(...I(0, 0, CH))
      ctx.closePath()
      ctx.fillStyle = COL_CONTAINER_SIDE
      ctx.fill()
      ctx.strokeStyle = COL_FRAME
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(...I(0, 0, CH))
      ctx.lineTo(...I(CL, 0, CH))
      ctx.lineTo(...I(CL, CW, CH))
      ctx.lineTo(...I(0, CW, CH))
      ctx.closePath()
      ctx.fillStyle = COL_CONTAINER_TOP
      ctx.fill()
      ctx.strokeStyle = COL_FRAME
      ctx.lineWidth = 1
      ctx.stroke()

      drawPanelGrid(8, 4, CH + 1, CL - 8, CW - 4, CH + 1, 2, 4)

      ctx.beginPath()
      ctx.moveTo(...I(CL, 0, 0))
      ctx.lineTo(...I(CL, CW, 0))
      ctx.lineTo(...I(CL, CW, CH))
      ctx.lineTo(...I(CL, 0, CH))
      ctx.closePath()
      ctx.fillStyle = COL_CONTAINER_FRONT
      ctx.fill()
      ctx.strokeStyle = COL_FRAME
      ctx.lineWidth = 1
      ctx.stroke()

      for (let i = 0; i < 3; i++) {
        const gy = CW * 0.2 + i * CW * 0.25
        ctx.beginPath()
        ctx.moveTo(...I(CL, gy, CH * 0.3))
        ctx.lineTo(...I(CL, gy + CW * 0.12, CH * 0.3))
        ctx.lineTo(...I(CL, gy + CW * 0.12, CH * 0.5))
        ctx.lineTo(...I(CL, gy, CH * 0.5))
        ctx.closePath()
        ctx.fillStyle = COL_CONTAINER_DARK
        ctx.fill()
      }

      ctx.beginPath()
      ctx.moveTo(...I(0, CW, 0))
      ctx.lineTo(...I(CL, CW, 0))
      ctx.lineTo(...I(CL, CW, CH))
      ctx.lineTo(...I(0, CW, CH))
      ctx.closePath()
      ctx.fillStyle = COL_CONTAINER_SIDE
      ctx.fill()
      ctx.strokeStyle = COL_FRAME
      ctx.lineWidth = 1
      ctx.stroke()

      for (let i = 1; i < 8; i++) {
        ctx.beginPath()
        ctx.moveTo(...I(CL * i / 8, CW, CH * 0.1))
        ctx.lineTo(...I(CL * i / 8, CW, CH * 0.9))
        ctx.strokeStyle = COL_CONTAINER_DARK
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.4
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      ;([[0, 0], [CL, 0], [0, CW], [CL, CW]] as [number, number][]).forEach(([x, y]) => {
        ctx.beginPath()
        ctx.moveTo(...I(x, y, 0))
        ctx.lineTo(...I(x, y, CH))
        ctx.strokeStyle = COL_FRAME
        ctx.lineWidth = 4
        ctx.stroke()
      })

      ctx.beginPath()
      ctx.moveTo(...I(0, CW, CH))
      ctx.lineTo(...I(CL, CW, CH))
      ctx.lineTo(...I(CL, fwy, fwz))
      ctx.lineTo(...I(0, fwy, fwz))
      ctx.closePath()
      ctx.fillStyle = COL_PANEL
      ctx.fill()
      ctx.strokeStyle = COL_FRAME
      ctx.lineWidth = 1.5
      ctx.stroke()

      if (theta < 0.3) {
        drawPanelGrid(4, CW, fwz + 2, CL - 4, CW, CH - 2, 7, 2, true)
      } else {
        drawPanelGrid(4, CW, CH - 2, CL - 4, fwy * 0.95 + CW * 0.05, fwz + 2, 7, 2)
      }
      ctx.beginPath()
      ctx.moveTo(...I(0, fwy, fwz))
      ctx.lineTo(...I(CL, fwy, fwz))
      ctx.strokeStyle = COL_FRAME
      ctx.lineWidth = 2.5
      ctx.stroke()

      if (theta > 0.1 && theta < Math.PI / 2 - 0.1) {
        ctx.beginPath()
        const cableY = CW + (fwy - CW) * 0.5
        const cableZ = CH - (CH - fwz) * 0.3
        ctx.moveTo(...I(CL * 0.15, CW, CH))
        ctx.lineTo(...I(CL * 0.15, cableY, cableZ))
        ctx.moveTo(...I(CL * 0.85, CW, CH))
        ctx.lineTo(...I(CL * 0.85, cableY, cableZ))
        ctx.strokeStyle = COL_CABLE
        ctx.lineWidth = 1.2
        ctx.setLineDash([5, 3])
        ctx.stroke()
        ctx.setLineDash([])
      }

      if (theta > Math.PI / 2 - 0.5) {
        const a = Math.min((theta - (Math.PI / 2 - 0.5)) / 0.4, 1)
        ctx.save()
        ctx.globalAlpha = a

        ;([[CL * 0.1, bwy, bwz], [CL * 0.9, bwy, bwz]] as [number, number, number][]).forEach(([px, py, pz]) => {
          ctx.strokeStyle = COL_SUPPORT
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(...I(px, py, pz))
          ctx.lineTo(...I(px, py, 0))
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(...I(px, py, 0), 4, 0, 2 * Math.PI)
          ctx.fillStyle = COL_SUPPORT
          ctx.fill()
        })

        ;([[CL * 0.1, fwy, fwz], [CL * 0.9, fwy, fwz]] as [number, number, number][]).forEach(([px, py, pz]) => {
          ctx.strokeStyle = COL_SUPPORT
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(...I(px, py, pz))
          ctx.lineTo(...I(px, py, 0))
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(...I(px, py, 0), 4, 0, 2 * Math.PI)
          ctx.fillStyle = COL_SUPPORT
          ctx.fill()
        })
        ctx.restore()
      }

      if (theta > Math.PI / 2 - 0.3) {
        const a = Math.min((theta - (Math.PI / 2 - 0.3)) / 0.25, 1)
        ctx.save()
        ctx.globalAlpha = a * 0.8

        const p1 = I(CL + 30, fwy, -5)
        const p2 = I(CL + 30, bwy, -5)
        ctx.strokeStyle = COL_TEXT
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(...p1)
        ctx.lineTo(...p2)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.beginPath()
        ctx.moveTo(p1[0], p1[1])
        ctx.lineTo(p1[0] - 4, p1[1] - 6)
        ctx.lineTo(p1[0] + 4, p1[1] - 6)
        ctx.closePath()
        ctx.fillStyle = COL_TEXT
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(p2[0], p2[1])
        ctx.lineTo(p2[0] - 4, p2[1] + 6)
        ctx.lineTo(p2[0] + 4, p2[1] + 6)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = COL_TEXT
        ctx.font = 'bold 14px system-ui, sans-serif'
        ctx.textAlign = 'center'
        const mid: [number, number] = [(p1[0] + p2[0]) / 2 + 14, (p1[1] + p2[1]) / 2]
        ctx.fillText('9,6 m', mid[0], mid[1] - 2)
        ctx.font = '12px system-ui, sans-serif'
        ctx.fillText('operativi', mid[0], mid[1] + 14)
        ctx.restore()
      }

      if (theta >= Math.PI / 2 - 0.05) {
        ctx.save()
        ctx.fillStyle = COL_BADGE_BG
        ctx.beginPath()
        const bx = OX - 85, by = OY + 163, bw = 170, bh = 44, br = 6
        ctx.moveTo(bx + br, by)
        ctx.lineTo(bx + bw - br, by)
        ctx.arcTo(bx + bw, by, bx + bw, by + br, br)
        ctx.lineTo(bx + bw, by + bh - br)
        ctx.arcTo(bx + bw, by + bh, bx + bw - br, by + bh, br)
        ctx.lineTo(bx + br, by + bh)
        ctx.arcTo(bx, by + bh, bx, by + bh - br, br)
        ctx.lineTo(bx, by + br)
        ctx.arcTo(bx, by, bx + br, by, br)
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle = COL_BADGE_TEXT
        ctx.font = 'bold 16px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('20 kWp', OX, OY + 190)
        ctx.restore()
      }
    }

    let theta = 0
    let animRunning = false
    let t0: number | null = null
    let currentPhase = 'Posizione di trasporto'
    let rafId = 0
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const DELAY = 800
    const DUR = 3500
    const HOLD = 3000
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    function runAnimation() {
      if (animRunning) return
      animRunning = true
      theta = 0
      currentPhase = 'Posizione di trasporto'
      draw(0, currentPhase)

      const id = setTimeout(() => {
        t0 = null
        rafId = requestAnimationFrame(openFrame)
      }, DELAY)
      timeouts.push(id)
    }

    function openFrame(ts: number) {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / DUR, 1)
      theta = ease(p) * Math.PI / 2

      if (p < 0.1) currentPhase = 'Posizione di trasporto'
      else if (p < 0.9) currentPhase = 'Dispiegamento ali in corso...'
      else currentPhase = 'Sistema operativo — 20 kWp'

      draw(theta, currentPhase)

      if (p < 1) {
        rafId = requestAnimationFrame(openFrame)
      } else {
        theta = Math.PI / 2
        draw(theta, currentPhase)
        const id = setTimeout(() => {
          t0 = null
          rafId = requestAnimationFrame(closeFrame)
        }, HOLD)
        timeouts.push(id)
      }
    }

    function closeFrame(ts: number) {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / (DUR * 0.8), 1)
      theta = (1 - ease(p)) * Math.PI / 2

      if (p > 0.1 && p < 0.9) currentPhase = 'Chiusura ali...'
      else if (p >= 0.9) currentPhase = 'Posizione di trasporto'

      draw(theta, currentPhase)

      if (p < 1) {
        rafId = requestAnimationFrame(closeFrame)
      } else {
        theta = 0
        draw(0, currentPhase)
        animRunning = false
        const id = setTimeout(runAnimation, DELAY)
        timeouts.push(id)
      }
    }

    draw(0, currentPhase)
    const startId = setTimeout(runAnimation, 600)
    timeouts.push(startId)

    return () => {
      cancelAnimationFrame(rafId)
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={480}
      className={className}
      style={{ maxWidth: '100%', display: 'block' }}
    />
  )
}
