/**
 * Industrial 3D Blueprint / Component Schematic Canvas Engine (Retina Calibrated)
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
    let width = 0, height = 0, dpr = 1;
    let angle = 0;
    let animId = null;
    let isVisible = true;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }

    document.addEventListener('visibilitychange', function () {
      isVisible = !document.hidden;
      if (isVisible && !animId) {
        animate();
      }
    });

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

      // Draw top ellipse rim
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        if (i === 0) ctx.moveTo(topPoints[i].x, topPoints[i].y);
        else ctx.lineTo(topPoints[i].x, topPoints[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw bottom ellipse rim
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        if (i === 0) ctx.moveTo(botPoints[i].x, botPoints[i].y);
        else ctx.lineTo(botPoints[i].x, botPoints[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw vertical ribs
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.18)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < segments; i += 2) {
        ctx.beginPath();
        ctx.moveTo(topPoints[i].x, topPoints[i].y);
        ctx.lineTo(botPoints[i].x, botPoints[i].y);
        ctx.stroke();
      }

      // Draw CAD engineering datum centerlines
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.30)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(-r * 1.35, 0);
      ctx.lineTo(r * 1.35, 0);
      ctx.moveTo(0, -h * 0.75);
      ctx.lineTo(0, h * 0.75);
      ctx.stroke();
      ctx.setLineDash([]);

      // Datum callouts
      ctx.fillStyle = 'rgba(180, 83, 9, 0.85)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText('DAT-A: Ø' + (r * 2).toFixed(1) + 'mm [±0.005]', -r - 10, -h / 2 - 8);
      ctx.fillText('AS9100D CAD-SPEC', r - 20, h / 2 + 16);

      ctx.restore();
    }

    function animate() {
      if (!isVisible) {
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const cx = isMobile ? width * 0.85 : width * 0.75;
      const cy = height * 0.45;
      const r = isMobile ? 80 : 130;
      const h = isMobile ? 120 : 180;

      drawWireframeCylinder(cx, cy, r, h, angle);
      angle += 0.005;

      animId = requestAnimationFrame(animate);
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
