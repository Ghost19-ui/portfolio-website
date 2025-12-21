import React, { useEffect, useRef } from 'react';

const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // --- SETTINGS (Adjust these to change the vibe) ---
    const PARTICLE_COUNT = 60; // Density of nodes
    const CONNECT_DISTANCE = 150; // How far electricity jumps
    const MOUSE_RADIUS = 250; // Size of cursor interaction zone
    // Red Team Colors
    const COLOR_NODE = 'rgba(220, 38, 38, 0.8)'; // Bright Red Nodes
    const COLOR_LINE = '220, 38, 38'; // Red base for lines (rgb)
    // --------------------------------------------------

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse state
    let mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    // Touch support
    const handleTouchMove = (e) => {
      if(e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow ambient movement
        this.vy = (Math.random() - 0.5) * 0.5; 
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction (The "Electric Current" effect)
        // Nodes run AWAY from mouse slightly, but lines connect TO mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < MOUSE_RADIUS) {
            // Gentle repulsion (Neural paths reacting)
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            const directionX = forceDirectionX * force * 1; 
            const directionY = forceDirectionY * force * 1;
            
            this.x -= directionX; // Move away
            this.y -= directionY;
        }
      }

      draw() {
        ctx.fillStyle = COLOR_NODE;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background fill (Deep Black)
      ctx.fillStyle = '#050505'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles (The Synapse/Electricity)
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECT_DISTANCE) {
            ctx.beginPath();
            // Opacity depends on distance
            let opacity = 1 - (distance / CONNECT_DISTANCE);
            ctx.strokeStyle = `rgba(${COLOR_LINE}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // Connect to Mouse (The "Current runs to spot" effect)
        if (mouse.x != null) {
            let dx = particles[i].x - mouse.x;
            let dy = particles[i].y - mouse.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 200) {
                ctx.beginPath();
                let opacity = 1 - (distance / 200);
                ctx.strokeStyle = `rgba(${COLOR_LINE}, ${opacity})`;
                ctx.lineWidth = 1.5; // Thicker line to mouse
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default NeuralBackground;