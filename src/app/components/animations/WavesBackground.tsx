'use client'

import React, { useRef, useEffect, useState } from 'react'

interface WavesBackgroundProps {
  className?: string
  color?: string
  opacity?: number
  speed?: number
  lineWidth?: number
}

export default function WavesBackground({
  className = '',
  color = '#FF6B35',
  opacity = 0.6,
  speed = 1,
  lineWidth = 2
}: WavesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [isReady, setIsReady] = useState(false)
  
  let time = 0

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      // Get container dimensions but ensure full width
      const rect = canvas.getBoundingClientRect()
      const width = window.innerWidth // Always use full viewport width
      const height = Math.max(rect.height, window.innerHeight)
      
      canvas.width = width
      canvas.height = height
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
    }

    const drawWaves = () => {
      const width = canvas.width
      const height = canvas.height
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      
      // Parse color
      const hex = color.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      
      // Draw horizontal waves
      const waveCount = 6
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.8})`
        ctx.lineWidth = lineWidth
        
        const yPos = (height / (waveCount + 1)) * (i + 1)
        const amplitude = 50
        const frequency = 0.003
        
        // Start from left edge
        ctx.moveTo(0, yPos)
        
        // Draw wave across full width
        for (let x = 0; x <= width; x += 8) {
          const y = yPos + 
                   Math.sin(x * frequency + time * speed * 0.001 + i * 0.8) * amplitude +
                   Math.cos(x * frequency * 1.5 + time * speed * 0.0008 + i * 0.6) * 25
          ctx.lineTo(x, y)
        }
        
        ctx.stroke()
        
        // Add glow effect
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.shadowBlur = 0
      }
      
      time += 16
      animationRef.current = requestAnimationFrame(drawWaves)
    }

    const init = () => {
      resizeCanvas()
      console.log('WavesBackground initialized', { width: canvas.width, height: canvas.height })
      setIsReady(true)
      drawWaves()
    }

    const handleResize = () => {
      resizeCanvas()
    }

    init()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, opacity, speed, lineWidth])

  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`} 
      style={{ 
        zIndex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          display: 'block',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          background: 'transparent'
        }}
      />
    </div>
  )
}
