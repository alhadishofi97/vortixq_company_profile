"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
}

interface ParticleFieldProps {
  count?: number;
  className?: string;
  color?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 50,
  className = "",
  color = "rgba(124, 58, 237, 0.4)"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = React.useState<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    
    const initialParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    setParticles(initialParticles);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let { x, y, vx, vy } = particle;
        
        x += vx;
        y += vy;
        
        // Bounce off edges
        if (x <= 0 || x >= width) vx *= -1;
        if (y <= 0 || y >= height) vy *= -1;
        
        // Keep within bounds
        x = Math.max(0, Math.min(width, x));
        y = Math.max(0, Math.min(height, y));
        
        return { ...particle, x, y, vx, vy };
      }));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: particle.opacity,
          }}
          animate={{
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;



