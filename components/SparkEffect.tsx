'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/SparkEffect.module.css';

const SparkEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.alpha = Math.random();
        this.color = `rgba(255, ${Math.floor(Math.random() * 100) + 100}, 0, ${this.alpha})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.005;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const sparks: Spark[] = Array.from({ length: 100 }, () => new Spark());

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparks.forEach((spark, index) => {
        spark.update();
        spark.draw();
        if (spark.alpha <= 0) {
          sparks[index] = new Spark();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={styles.sparkCanvas}
    />
  );
};

export default SparkEffect;