'use client';
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function CyberMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number,
      nodes: Node[] = [];
    const maxDistance = 135;
    const nodeColor = 'rgba(224, 73, 56, 0.8)';

    const initNodes = () => {
      const w = window.innerWidth,
        h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      const density = Math.floor((w * h) / 18000);
      const count = Math.min(Math.max(density, 30), 90);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 2,
      }));
    };

    initNodes();
    const handleResize = () => initNodes();
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width,
        h = canvas.height;

      // Draw mouse halo
      const m = mouseRef.current;
      if (m.x > 0 && m.y > 0) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(231, 76, 60, 0.95)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(231, 76, 60, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.45;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(224, 73, 56, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        if (m.x > 0 && m.y > 0) {
          const dist = Math.hypot(n1.x - m.x, n1.y - m.y);
          if (dist < maxDistance * 1.4) {
            const alpha = (1 - dist / (maxDistance * 1.4)) * 0.85;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(231, 76, 60, ${alpha})`;
            ctx.lineWidth = 1.35;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
}
