'use client'

import React, { useRef, useEffect } from 'react'

interface WavesHorizontalProps {
  className?: string
  color?: string
  intensity?: number
  amplitude?: number
  speed?: number
  enableMouseInteraction?: boolean
}

export default function WavesHorizontal({
  className = '',
  color = '#FF6B35',
  amplitude = 1,
  speed = 1,
  enableMouseInteraction = true,
  intensity = 0.5
}: WavesHorizontalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  
  // Device detection and performance optimization
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isLowPerformance, setIsLowPerformance] = React.useState(false)
  const frameCount = useRef<number>(0)
  const lastFrameTime = useRef<number>(0)
  
  // Adaptive settings based on device
  const adaptiveAmplitude = React.useMemo(() => {
    if (isLowPerformance) return amplitude * 0.6
    if (deviceType === 'mobile') return amplitude * 0.8
    return amplitude
  }, [amplitude, deviceType, isLowPerformance])
  
  const adaptiveIntensity = React.useMemo(() => {
    if (isLowPerformance) return intensity * 0.7
    if (deviceType === 'mobile') return intensity * 0.9
    return intensity
  }, [intensity, deviceType, isLowPerformance])

  // Device detection
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isTablet = /iPad|Android/i.test(userAgent) && width >= 768 && width <= 1024
      
      if (isMobile || width < 768) {
        setDeviceType('mobile')
        setIsLowPerformance(true)
      } else if (isTablet || (width >= 768 && width <= 1024)) {
        setDeviceType('tablet')
        setIsLowPerformance(false)
      } else {
        setDeviceType('desktop')
        setIsLowPerformance(false)
      }
    }

    detectDevice()
    window.addEventListener('resize', detectDevice)
    return () => window.removeEventListener('resize', detectDevice)
  }, [])

  // Performance monitoring
  useEffect(() => {
    const monitorPerformance = () => {
      const now = performance.now()
      frameCount.current++
      
      if (now - lastFrameTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (now - lastFrameTime.current))
        frameCount.current = 0
        lastFrameTime.current = now
        
        if (fps < 30 && !isLowPerformance) {
          setIsLowPerformance(true)
        } else if (fps > 45 && isLowPerformance) {
          setIsLowPerformance(false)
        }
      }
    }

    const interval = setInterval(monitorPerformance, 1000)
    return () => clearInterval(interval)
  }, [isLowPerformance])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = isLowPerformance ? 1 : Math.min(window.devicePixelRatio || 1, deviceType === 'mobile' ? 1.5 : 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    const drawWaves = () => {
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

      // Wave parameters
      const waveAmplitude = 30 * adaptiveAmplitude
      const waveFrequency = 0.01 * speed
      const waveCount = isLowPerformance ? 3 : (deviceType === 'mobile' ? 4 : 5)

      // Draw horizontal waves
      for (let wave = 0; wave < waveCount; wave++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${adaptiveIntensity * (0.3 + wave * 0.1)})`
        ctx.lineWidth = isLowPerformance ? 1 : (2 - wave * 0.3)
        
        const waveOffset = wave * (height / waveCount)
        const phase = time * waveFrequency + wave * Math.PI / 3
        
        ctx.moveTo(0, height / 2 + waveOffset)
        
        for (let x = 0; x <= width; x += 2) {
          const y = height / 2 + waveOffset + 
            Math.sin(x * 0.01 + phase) * waveAmplitude * (1 - wave * 0.2) +
            Math.sin(x * 0.005 + phase * 0.7) * (waveAmplitude * 0.3) * (1 - wave * 0.2)
          
          // Apply mouse interaction
          if (enableMouseInteraction && mouseInfluence > 0) {
            const mouseX = mouseRef.current.x
            const mouseY = mouseRef.current.y
            const distanceToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2))
            const maxDistance = 200
            const mouseEffect = Math.max(0, 1 - distanceToMouse / maxDistance) * mouseInfluence
            
            const mouseOffsetY = (mouseY - y) * mouseEffect * 0.3
            const waveOffsetY = Math.sin(time * 0.02 + x * 0.01) * 10 * mouseEffect
            
            ctx.lineTo(x, y + mouseOffsetY + waveOffsetY)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()

        // Add glow effect
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`
        ctx.shadowBlur = 8 * (1 + mouseInfluence) * (1 - wave * 0.2)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Draw connecting horizontal lines
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${intensity * 0.15})`
        ctx.lineWidth = 1

        const lineY = (height / 5) * (i + 1)
        const linePhase = time * waveFrequency * 0.5 + i * Math.PI / 2

        ctx.moveTo(0, lineY)
        
        for (let x = 0; x <= width; x += 3) {
          const y = lineY + 
            Math.sin(x * 0.008 + linePhase) * (15 * adaptiveAmplitude) +
            Math.cos(x * 0.012 + linePhase * 0.8) * (8 * adaptiveAmplitude)

          // Apply mouse interaction
          if (enableMouseInteraction && mouseInfluence > 0) {
            const mouseX = mouseRef.current.x
            const mouseY = mouseRef.current.y
            const distanceToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2))
            const maxDistance = 150
            const mouseEffect = Math.max(0, 1 - distanceToMouse / maxDistance) * mouseInfluence
            
            const mouseOffsetY = (mouseY - y) * mouseEffect * 0.2
            ctx.lineTo(x, y + mouseOffsetY)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()
      }

      // Draw floating particles
      const particleCount = isLowPerformance ? 8 : (deviceType === 'mobile' ? 12 : 16)
      for (let i = 0; i < particleCount; i++) {
        const x = (width / particleCount) * i + Math.sin(time * 0.0008 + i) * (30 * adaptiveAmplitude)
        const y = height * 0.3 + Math.cos(time * 0.001 + i) * (50 * adaptiveAmplitude)
        const size = (1.5 + Math.sin(time * 0.0015 + i) * 0.8) * adaptiveAmplitude

        ctx.beginPath()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${adaptiveIntensity * 0.3})`
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      time += isLowPerformance ? 24 : 16
      
      // Frame rate limiting for performance
      if (isLowPerformance && frameCount.current % 2 === 0) {
        animationRef.current = requestAnimationFrame(drawWaves)
        return
      }
      
      animationRef.current = requestAnimationFrame(drawWaves)
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
      drawWaves()
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, intensity, amplitude, speed, enableMouseInteraction])

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
