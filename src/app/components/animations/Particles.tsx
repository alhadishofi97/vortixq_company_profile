'use client'

import React, { useRef, useEffect } from 'react'
import useMousePosition from './utils/useMousePosition'

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
}

export default function Particles({
  className = '',
  quantity = 30,
  staticity = 50,
  ease = 50,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<any[]>([])
  const mousePosition = useMousePosition()
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  
  // Device detection and performance optimization
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isLowPerformance, setIsLowPerformance] = React.useState(false)
  const animationRef = useRef<number | null>(null)
  const lastFrameTime = useRef<number>(0)
  const frameCount = useRef<number>(0)
  
  // Optimize DPR based on device
  const dpr = React.useMemo(() => {
    if (typeof window === 'undefined') return 1
    const baseDpr = window.devicePixelRatio || 1
    return isLowPerformance ? 1 : Math.min(baseDpr, deviceType === 'mobile' ? 1.5 : 2)
  }, [deviceType, isLowPerformance])
  
  // Adaptive settings based on device
  const adaptiveQuantity = React.useMemo(() => {
    if (isLowPerformance) return Math.min(quantity, 15)
    if (deviceType === 'mobile') return Math.min(quantity, 20)
    if (deviceType === 'tablet') return Math.min(quantity, 25)
    return quantity
  }, [quantity, deviceType, isLowPerformance])

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
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d')
    }
    initCanvas()
    animate()
    window.addEventListener('resize', initCanvas)

    return () => {
      window.removeEventListener('resize', initCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    onMouseMove()
  }, [mousePosition.x, mousePosition.y])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const { w, h } = canvasSize.current
      const x = mousePosition.x - rect.left - w / 2
      const y = mousePosition.y - rect.top - h / 2
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = canvasSize.current.w + 'px'
      canvasRef.current.style.height = canvasSize.current.h + 'px'
      context.current.scale(dpr, dpr)
    }
  }

  type Circle = {
    x: number
    y: number
    translateX: number
    translateY: number
    size: number
    alpha: number
    targetAlpha: number
    dx: number
    dy: number
    magnetism: number
  }  

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const translateX = 0
    const translateY = 0
    const size = Math.floor(Math.random() * 2) + 1
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
    const dx = (Math.random() - 0.5) * 0.2
    const dy = (Math.random() - 0.5) * 0.2
    const magnetism = 0.1 + Math.random() * 4
    return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism }
  }

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, size, 0, 2 * Math.PI)
      context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`
      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!update) {
        circles.current.push(circle)
      }
    }
  }

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
  }

  const drawParticles = () => {
    clearContext()
    const particleCount = adaptiveQuantity
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }

  const animate = () => {
    clearContext()
    circles.current.forEach((circle: Circle, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge
      }
      circle.x += circle.dx
      circle.y += circle.dy
      circle.translateX += ((mouse.current.x / (staticity / circle.magnetism)) - circle.translateX) / ease
      circle.translateY += ((mouse.current.y / (staticity / circle.magnetism)) - circle.translateY) / ease
      // circle gets out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        // remove the circle from the array
        circles.current.splice(i, 1)
        // create a new circle
        const newCircle = circleParams()
        drawCircle(newCircle)
        // update the circle position
      } else {
        drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha,
          },
          true
        )
      }
    })
    
    // Frame rate limiting for performance
    if (isLowPerformance && frameCount.current % 2 === 0) {
      // Skip every other frame on low performance devices
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
