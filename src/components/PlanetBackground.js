// components/PlanetBackground.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const PlanetBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Mount the renderer
    mountRef.current.appendChild(renderer.domElement);

    // Create a sphere for the planet
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/textures/planet-texture.jpg");
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      planet.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    // Adjust on window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Mouse movement interaction
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      planet.rotation.x = y * 0.5;
      planet.rotation.y = x * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default PlanetBackground;
