import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    
    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 2. SHADERS (Moved from HTML to JS Strings)
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float iTime;
      uniform sampler2D iChannel0;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec4 color = texture2D(iChannel0, uv);
        
        // Digital Breach Logic
        if (color.r > color.b + 0.1 && color.r > 0.4) {
          float wave = sin(uv.y * 15.0 + iTime * 2.5) * 0.005;
          vec2 distortedUv = vec2(uv.x + wave, uv.y);
          color = texture2D(iChannel0, distortedUv);
          float pulse = (sin(iTime * 3.0) + 1.0) * 0.15;
          color.r += pulse;
          color.g *= 0.5;
          color.b *= 0.5;
        } else {
          color.rgb *= 0.8; 
        }
        gl_FragColor = color;
      }
    `;

    // 3. TEXTURE & MATERIAL
    const loader = new THREE.TextureLoader();
    // Note: In React, accessing 'public' folder files is done with process.env.PUBLIC_URL or just '/'
    const texture = loader.load(process.env.PUBLIC_URL + '/wallpaper.png'); 

    const uniforms = {
      iTime: { value: 1.0 },
      iChannel0: { value: texture }
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });

    const geometry = new THREE.PlaneGeometry(192, 108);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. ANIMATION LOOP
    let mouseX = 0;
    let mouseY = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      uniforms.iTime.value += 0.05;
      
      // Parallax
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // 5. EVENT LISTENERS
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.03;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.03;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    // 6. CLEANUP (Important in React!)
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none' // Allows clicking through to the canvas
      }} 
    />
  );
};

export default ThreeBackground;