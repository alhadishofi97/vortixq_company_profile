'use client'

import React, { useRef, useEffect } from 'react'

interface ThreadsBackgroundProps {
  className?: string
  color?: string
  intensity?: number
  amplitude?: number
  distance?: number
  enableMouseInteraction?: boolean
}

export default function ThreadsBackground({
  className = '',
  color = '#FF6B35',
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = true,
  intensity = 0.5
}: ThreadsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    const drawThreads = () => {
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, width, height)

      // Parse color to RGB
      const hex = color.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)

      // Calculate mouse influence
      const mouseInfluence = enableMouseInteraction ? 
        Math.max(0, 1 - Math.sqrt(
          Math.pow((mouseRef.current.x - width/2) / (width/2), 2) + 
          Math.pow((mouseRef.current.y - height/2) / (height/2), 2)
        )) : 0

      // Apply amplitude and distance to wave calculations
      const waveAmplitude = 20 * amplitude
      const waveDistance = distance * 10

      // Draw multiple threads
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${intensity * 0.3})`
        ctx.lineWidth = 2
        
        const x1 = (width / 8) * i + Math.sin(time * 0.001 + i) * waveAmplitude
        const y1 = height + Math.cos(time * 0.0008 + i) * (30 + waveDistance)
        const x2 = (width / 8) * (i + 1) + Math.sin(time * 0.0012 + i) * (25 * amplitude)
        const y2 = height * 0.7 + Math.cos(time * 0.0009 + i) * (40 + waveDistance)
        const x3 = (width / 8) * (i + 0.5) + Math.sin(time * 0.0015 + i) * (30 * amplitude)
        const y3 = height * 0.4 + Math.cos(time * 0.0011 + i) * (35 + waveDistance)
        const x4 = (width / 8) * (i + 0.3) + Math.sin(time * 0.0013 + i) * (20 * amplitude)
        const y4 = height * 0.1 + Math.cos(time * 0.0014 + i) * (25 + waveDistance)

        // Apply mouse interaction with enhanced cursor animation
        if (enableMouseInteraction && mouseInfluence > 0) {
          const mouseX = mouseRef.current.x
          const mouseY = mouseRef.current.y
          const threadX = (width / 8) * i
          const threadY = height * 0.5
          
          // Calculate distance to mouse with enhanced influence
          const distanceToMouse = Math.sqrt(Math.pow(threadX - mouseX, 2) + Math.pow(threadY - mouseY, 2))
          const maxDistance = 300
          const mouseEffect = Math.max(0, 1 - distanceToMouse / maxDistance) * mouseInfluence
          
          // Enhanced mouse offset with wave-like movement
          const waveOffset = Math.sin(time * 0.01 + i) * 10 * mouseEffect
          const mouseOffsetX = (mouseX - threadX) * mouseEffect * 0.3 + waveOffset
          const mouseOffsetY = (mouseY - threadY) * mouseEffect * 0.2
          
          // Create flowing effect towards mouse
          const flowStrength = mouseEffect * 0.5
          const flowX = (mouseX - threadX) * flowStrength * 0.1
          const flowY = (mouseY - threadY) * flowStrength * 0.1
          
          ctx.moveTo(x1 + mouseOffsetX + flowX, y1 + mouseOffsetY + flowY)
          ctx.bezierCurveTo(
            x2 + mouseOffsetX + flowX * 0.7, y2 + mouseOffsetY + flowY * 0.7,
            x3 + mouseOffsetX + flowX * 0.5, y3 + mouseOffsetY + flowY * 0.5,
            x4 + mouseOffsetX + flowX * 0.3, y4 + mouseOffsetY + flowY * 0.3
          )
        } else {
          ctx.moveTo(x1, y1)
          ctx.bezierCurveTo(x2, y2, x3, y3, x4, y4)
        }
        
        ctx.stroke()

        // Add glow effect
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`
        ctx.shadowBlur = 10 * (1 + mouseInfluence)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Draw connecting threads with mouse interaction
      for (let i = 0; i < 6; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${intensity * 0.2})`
        ctx.lineWidth = 1

        let startX = (width / 6) * i + Math.sin(time * 0.0008 + i) * (15 * amplitude)
        let startY = height * 0.3 + Math.cos(time * 0.001 + i) * (20 + waveDistance)
        let endX = (width / 6) * (i + 1) + Math.sin(time * 0.0012 + i) * (18 * amplitude)
        let endY = height * 0.2 + Math.cos(time * 0.0009 + i) * (22 + waveDistance)

        // Apply mouse interaction to connecting threads
        if (enableMouseInteraction && mouseInfluence > 0) {
          const mouseX = mouseRef.current.x
          const mouseY = mouseRef.current.y
          const threadX = (width / 6) * i
          const threadY = height * 0.25
          
          const distanceToMouse = Math.sqrt(Math.pow(threadX - mouseX, 2) + Math.pow(threadY - mouseY, 2))
          const maxDistance = 200
          const mouseEffect = Math.max(0, 1 - distanceToMouse / maxDistance) * mouseInfluence
          
          const mouseOffsetX = (mouseX - threadX) * mouseEffect * 0.2
          const mouseOffsetY = (mouseY - threadY) * mouseEffect * 0.15
          
          startX += mouseOffsetX
          startY += mouseOffsetY
          endX += mouseOffsetX * 0.8
          endY += mouseOffsetY * 0.8
        }

        ctx.moveTo(startX, startY)
        ctx.quadraticCurveTo(
          (startX + endX) / 2 + Math.sin(time * 0.0015 + i) * (30 * amplitude),
          (startY + endY) / 2 + Math.cos(time * 0.0013 + i) * (25 + waveDistance),
          endX,
          endY
        )
        ctx.stroke()
      }

      // Draw floating particles
      for (let i = 0; i < 20; i++) {
        const x = (width / 20) * i + Math.sin(time * 0.0005 + i) * (50 * amplitude)
        const y = height * 0.5 + Math.cos(time * 0.0007 + i) * (100 + waveDistance)
        const size = (2 + Math.sin(time * 0.001 + i) * 1) * amplitude

        ctx.beginPath()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${intensity * 0.4})`
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      time += 16
      animationId = requestAnimationFrame(drawThreads)
    }

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      if (!enableMouseInteraction) return
      mouseRef.current = { x: 0, y: 0 }
    }

    const animate = () => {
      resizeCanvas()
      drawThreads()
    }

    animate()
    window.addEventListener('resize', animate)
    
    if (enableMouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('resize', animate)
      if (enableMouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [color, intensity, amplitude, distance, enableMouseInteraction])

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}
