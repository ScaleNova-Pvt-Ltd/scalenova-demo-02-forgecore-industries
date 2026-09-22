/**
 * Industrial 3D Blueprint / Component Schematic Canvas Engine
 * Demo 02: ForgeCore Industries (src/components/blueprint-canvas.js)
 * High-precision 60fps rotating isometric CAD cylinder with live datum marks & annotations.
 */

(function () {
  'use strict';

  function initBlueprintCanvas() {
    const canvas = document.getElementById('blueprint-canvas');
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    let width, height, angle = 0;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function drawWireframeCylinder(cx, cy, r, h, rot) {
      ctx.save();
      ctx.translate(cx, cy);

      const segments = 16;
      const topPoints = [];
      const botPoints = [];

      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 2 + rot;
        const x = Math.cos(theta) * r;
        const y = Math.sin(theta) * (r * 0.40); // Isometric tilt angle

        topPoints.push({ x: x, y: y - h / 2 });
        botPoints.push({ x: x, y: y + h / 2 });
      }

      // Outer Glow
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';

      // Draw Top Ring
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        const p = topPoints[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw Bottom Ring
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.70)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        const p = botPoints[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.stroke();

      // Vertical Ribs & Tooling Lines
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.3)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < segments; i += 2) {
        ctx.beginPath();
        ctx.moveTo(topPoints[i].x, topPoints[i].y);
        ctx.lineTo(botPoints[i].x, botPoints[i].y);
        ctx.stroke();
      }

      // Center Datum Axis Marker
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(-3, -3, 6, 6);

      // Dimension Callouts
      ctx.font = '11px "JetBrains Mono", Consolas, monospace';
      ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
      ctx.fillText(`Ø ${(r * 2).toFixed(1)} mm [±0.005]`, r + 14, 0);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.fillText(`ROT: ${(rot * 180 / Math.PI % 360).toFixed(0)}°`, -r - 70, -h / 2);

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      angle += 0.008;
      const isMobile = width < 768;
      const cx = isMobile ? width * 0.5 : width * 0.76;
      const cy = isMobile ? Math.min(height * 0.36, 260) : Math.min(height * 0.44, 380);
      const radius = isMobile ? Math.min(width * 0.22, 90) : Math.min(width * 0.14, 120);
      const heightVal = radius * 1.35;

      // Outer primary industrial assembly
      drawWireframeCylinder(cx, cy, radius, heightVal, angle);
      // Inner coaxial concentric core
      drawWireframeCylinder(cx, cy, radius * 0.55, heightVal * 1.15, -angle * 1.4);

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlueprintCanvas);
  } else {
    initBlueprintCanvas();
  }
})();
