'use client'

import React, { useRef, useEffect } from 'react'

interface ThreadsBackgroundProps {
  className?: string
  color?: string
  speed?: number
  opacity?: number
  lineWidth?: number
  enableMouseInteraction?: boolean
}

export default function ThreadsBackground({
  className = '',
  color = '#FF6B35',
  speed = 1,
  opacity = 0.5,
  lineWidth = 2,
  enableMouseInteraction = true
}: ThreadsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  
  // Device detection and performance optimization
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isLowPerformance, setIsLowPerformance] = React.useState(false)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const frameCount = useRef<number>(0)
  const lastFrameTime = useRef<number>(0)

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

    // Reset animation frame on component mount/unmount
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = isLowPerformance ? 1 : Math.min(window.devicePixelRatio || 1, deviceType === 'mobile' ? 1.5 : 2)
      
      // Use viewport width but container height
      const fullWidth = window.innerWidth
      const fullHeight = Math.max(rect.height, window.innerHeight)
      
      // Clear previous context state
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      
      canvas.width = fullWidth * dpr
      canvas.height = fullHeight * dpr
      ctx.scale(dpr, dpr)
      
      // Set canvas dimensions
      canvas.style.width = fullWidth + 'px'
      canvas.style.height = fullHeight + 'px'
    }

    const drawThreads = () => {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)

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

      // Thread parameters - optimal count for horizontal threads
      const threadCount = isLowPerformance ? 5 : (deviceType === 'mobile' ? 7 : 10)
      const time = timeRef.current * speed

      // Draw main horizontal threads with full width coverage
      for (let i = 0; i < threadCount; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.6})`
        ctx.lineWidth = lineWidth
        
        const threadY = (height / (threadCount + 1)) * (i + 1)
        
        // Create flowing horizontal thread effect with full width
        const points = []
        const segments = 60 // More segments for smoother curves
        
        for (let j = 0; j <= segments; j++) {
          const t = j / segments
          // Horizontal flow from 0 to full width with wave motion
          const x = width * t
          const y = threadY + Math.sin(time * 0.001 + i * 0.8 + t * Math.PI * 2) * 30 + Math.cos(time * 0.0007 + i * 0.6 + t * Math.PI * 1.5) * 20
          
          // Apply mouse interaction
          if (enableMouseInteraction && mouseInfluence > 0) {
            const mouseX = mouseRef.current.x
            const mouseY = mouseRef.current.y
            const distanceToMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2))
            const maxDistance = 200
            const mouseEffect = Math.max(0, 1 - distanceToMouse / maxDistance) * mouseInfluence
            
            const mouseOffsetX = (mouseX - x) * mouseEffect * 0.1
            const mouseOffsetY = (mouseY - y) * mouseEffect * 0.2
            
            points.push({
              x: x + mouseOffsetX,
              y: y + mouseOffsetY
            })
          } else {
            points.push({ x, y })
          }
        }
        
        // Draw smooth curve through points
        if (points.length > 2) {
          ctx.moveTo(points[0].x, points[0].y)
          for (let j = 1; j < points.length - 1; j++) {
            const xc = (points[j].x + points[j + 1].x) / 2
            const yc = (points[j].y + points[j + 1].y) / 2
            ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc)
          }
          ctx.quadraticCurveTo(
            points[points.length - 2].x, 
            points[points.length - 2].y, 
            points[points.length - 1].x, 
            points[points.length - 1].y
          )
        }
        
        ctx.stroke()

        // Add glow effect
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`
        ctx.shadowBlur = 6 * (1 + mouseInfluence)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Draw minimal connecting elements (optional)
      for (let i = 0; i < Math.min(threadCount - 1, 5); i += 3) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.2})`
        ctx.lineWidth = 1

        const startY = (height / (threadCount + 1)) * (i + 1)
        const endY = (height / (threadCount + 1)) * (i + 2)
        const x = width * (0.3 + (i % 3) * 0.2) + Math.cos(time * 0.001 + i) * 20

        ctx.moveTo(x, startY)
        ctx.quadraticCurveTo(
          x + Math.cos(time * 0.0015 + i) * 10,
          (startY + endY) / 2,
          x,
          endY
        )
        ctx.stroke()
      }

      timeRef.current += isLowPerformance ? 24 : 16
      
      // Frame rate limiting for performance
      if (isLowPerformance && frameCount.current % 2 === 0) {
        animationRef.current = requestAnimationFrame(drawThreads)
        return
      }
      
      animationRef.current = requestAnimationFrame(drawThreads)
    }

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction) return
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    const handleMouseLeave = () => {
      if (!enableMouseInteraction) return
      mouseRef.current = { x: 0, y: 0 }
    }

    // Initialize canvas and start animation
    const init = () => {
      resizeCanvas()
      setIsInitialized(true)
      
      // Start animation loop
      const startAnimation = () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        drawThreads()
      }
      
      // Small delay to ensure canvas is ready
      setTimeout(startAnimation, 100)
    }

    // Handle resize with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeCanvas()
      }, 100)
    }

    init()
    window.addEventListener('resize', handleResize)
    
    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      setIsInitialized(false)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      if (enableMouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      // Reset time reference
      timeRef.current = 0
    }
  }, [color, speed, opacity, lineWidth, enableMouseInteraction, deviceType, isLowPerformance])

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'transparent',
          display: 'block',
          opacity: isInitialized ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  )
}