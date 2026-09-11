/**
 * Industrial 3D Blueprint / Component Schematic Canvas
 * Demo 02: ForgeCore Industries (src/components/blueprint-canvas.js)
 */

(function () {
  'use strict';

  function initBlueprintCanvas() {
    const canvas = document.getElementById('blueprint-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, angle = 0;

    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
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
        const y = Math.sin(theta) * (r * 0.38); // Isometric tilt

        topPoints.push({ x: x, y: y - h / 2 });
        botPoints.push({ x: x, y: y + h / 2 });
      }

      // Draw Top Ring
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        const p = topPoints[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw Bottom Ring
      ctx.beginPath();
      for (let i = 0; i < segments; i++) {
        const p = botPoints[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.stroke();

      // Vertical Ribs
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      for (let i = 0; i < segments; i += 2) {
        ctx.beginPath();
        ctx.moveTo(topPoints[i].x, topPoints[i].y);
        ctx.lineTo(botPoints[i].x, botPoints[i].y);
        ctx.stroke();
      }

      // Center Datum Marker
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(-2, -2, 4, 4);

      // Dimension Annotations
      ctx.font = '10px JetBrains Mono';
      ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
      ctx.fillText(`Ø ${(r * 2).toFixed(1)} mm [±0.005]`, r + 12, 0);
      ctx.fillText(`ROT: ${(rot * 180 / Math.PI).toFixed(0)}°`, -r - 60, -h / 2);

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw center rotating industrial component
      angle += 0.006;
      const cx = width * 0.72;
      const cy = height * 0.52;
      const radius = Math.min(width * 0.18, 110);
      const heightVal = radius * 1.3;

      drawWireframeCylinder(cx, cy, radius, heightVal, angle);
      drawWireframeCylinder(cx, cy, radius * 0.55, heightVal * 1.2, -angle * 1.5);

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
