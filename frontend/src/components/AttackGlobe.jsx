import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Import OrbitControls to allow drag/rotation
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const AttackGlobe = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    
    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    // Dark fog for deep space feel
    scene.fog = new THREE.FogExp2(0x000000, 0.002); 

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 350;
    camera.position.y = 50; // Slight angle look

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // --- 2. CONTROLS (The "Rotate like a Globe" part) ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth inertia
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom so it doesn't break layout
    controls.enablePan = false;  // Keep it centered
    controls.autoRotate = true;  // SPIN AUTOMATICALLY
    controls.autoRotateSpeed = 0.8; // Spin speed
    controls.minDistance = 200;
    controls.maxDistance = 500;


    // --- 3. LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); 
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xff0000, 2);
    sunLight.position.set(-200, 100, 100);
    scene.add(sunLight);


    // --- 4. THE EARTH GROUP ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const textureLoader = new THREE.TextureLoader();
    // Ensure 'earth_night.jpg' is in frontend/public/
    const earthTexture = textureLoader.load(process.env.PUBLIC_URL + '/earth_night.jpg');

    // EARTH SPHERE
    const geometry = new THREE.SphereGeometry(100, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthTexture,
      bumpScale: 0.8,
      specular: new THREE.Color(0x333333),
      shininess: 5,
    });
    const earth = new THREE.Mesh(geometry, material);
    globeGroup.add(earth);

    // ATMOSPHERE GLOW
    const atmosGeo = new THREE.SphereGeometry(100, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vNormal;
            void main() {
                float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
                gl_FragColor = vec4(0.9, 0.1, 0.1, 0.8) * intensity;
            }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    const atmosphere = new THREE.Mesh(atmosGeo, atmosMat);
    atmosphere.scale.set(1.18, 1.18, 1.18);
    globeGroup.add(atmosphere);

    // STARFIELD BACKGROUND
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i<starCount*3; i++) starPos[i] = (Math.random()-0.5) * 1500;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({color: 0xffffff, size: 1, transparent: true, opacity: 0.6});
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);


    // --- 5. ATTACK SIMULATION LOGIC ---
    const attackGroup = new THREE.Group();
    globeGroup.add(attackGroup); // Add to globeGroup so attacks rotate WITH the earth

    const activeAttacks = [];

    // Math helper
    const latLonToVector3 = (lat, lon, radius) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = (radius * Math.sin(phi) * Math.sin(theta));
        const y = (radius * Math.cos(phi));
        return new THREE.Vector3(x, y, z);
    }

    const launchAttack = () => {
        // Random coords roughly mapped to continents
        const startLat = (Math.random() * 120) - 60;
        const startLon = (Math.random() * 360) - 180;
        const endLat = (Math.random() * 120) - 60;
        const endLon = (Math.random() * 360) - 180;

        const startPos = latLonToVector3(startLat, startLon, 100);
        const endPos = latLonToVector3(endLat, endLon, 100);

        // Arc height based on distance
        const distance = startPos.distanceTo(endPos);
        const midHeight = 100 + distance * 0.4;
        const midPos = startPos.clone().add(endPos).multiplyScalar(0.5).normalize().multiplyScalar(midHeight);

        const curve = new THREE.QuadraticBezierCurve3(startPos, midPos, endPos);
        
        // ATTACK LINE
        const points = curve.getPoints(50);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xff0f39, transparent: true, opacity: 0.2 });
        const lineMesh = new THREE.Line(lineGeo, lineMat);
        
        // PROJECTILE (The moving dot)
        const projectileGeo = new THREE.SphereGeometry(1, 8, 8);
        const projectileMat = new THREE.MeshBasicMaterial({ color: 0x00ffff }); // Cyan Head
        const projectile = new THREE.Mesh(projectileGeo, projectileMat);

        attackGroup.add(lineMesh);
        attackGroup.add(projectile);

        activeAttacks.push({
            curve,
            lineMesh,
            projectile,
            progress: 0,
            speed: 0.01 + Math.random() * 0.01
        });
    }

    // --- 6. ANIMATION LOOP ---
    let frame = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      // REQUIRED: Update controls for auto-rotation and damping
      controls.update(); 

      // Launch attacks
      frame++;
      if (frame % 8 === 0 && activeAttacks.length < 25) {
          launchAttack();
      }

      // Update attacks
      for (let i = activeAttacks.length - 1; i >= 0; i--) {
          const attack = activeAttacks[i];
          attack.progress += attack.speed;
          
          if (attack.progress >= 1) {
              attackGroup.remove(attack.lineMesh);
              attackGroup.remove(attack.projectile);
              attack.lineMesh.geometry.dispose();
              attack.lineMesh.material.dispose();
              attack.projectile.geometry.dispose();
              attack.projectile.material.dispose();
              activeAttacks.splice(i, 1);
          } else {
              const pos = attack.curve.getPoint(attack.progress);
              attack.projectile.position.copy(pos);
          }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if(container && renderer.domElement) container.removeChild(renderer.domElement);
      controls.dispose(); // Cleanup controls
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1,
        background: '#020202'
      }} 
    />
  );
};

export default AttackGlobe;