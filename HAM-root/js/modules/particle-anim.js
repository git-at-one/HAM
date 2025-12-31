// /js/modules/particle-anim.js

export function initParticleAnimation(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const config = { particleColor: `rgba(255, 255, 255, 0.9)`, lineColor: `rgba(255, 255, 255, 0.9)`, particleCount: (canvas.width * canvas.height) / 8000, particleSpeed: 0.3, connectionDistance: 140, particleRadius: 1.5, interactive: true, mouseRadius: 150 };
    let particles = [];
    const mouse = { x: null, y: null };

    class Particle {
        constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.vx = (Math.random() - 0.5) * config.particleSpeed; this.vy = (Math.random() - 0.5) * config.particleSpeed; this.baseRadius = config.particleRadius; this.radius = this.baseRadius; }
        update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > canvas.width) this.vx *= -1; if (this.y < 0 || this.y > canvas.height) this.vy *= -1; if (config.interactive && mouse.x) { const distance = Math.hypot(this.x - mouse.x, this.y - mouse.y); if (distance < config.mouseRadius) { const scale = 1 - (distance / config.mouseRadius); this.radius = this.baseRadius + (scale * 4); } else { this.radius = this.baseRadius; } } }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = config.particleColor; ctx.fill(); }
    }

    function createParticles() { particles = []; for (let i = 0; i < config.particleCount; i++) { particles.push(new Particle()); } }
    function connectParticles() { for (let i = 0; i < particles.length; i++) { for (let j = i; j < particles.length; j++) { const distance = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y); if (distance < config.connectionDistance) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = config.lineColor; ctx.lineWidth = 0.5; ctx.globalAlpha = 1 - (distance / config.connectionDistance); ctx.stroke(); } } } ctx.globalAlpha = 1; }
    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); connectParticles(); requestAnimationFrame(animate); }

    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; config.particleCount = (canvas.width * canvas.height) / 15000; createParticles(); });
    if (config.interactive) { window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; }); window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; }); }

    createParticles();
    animate();
}
