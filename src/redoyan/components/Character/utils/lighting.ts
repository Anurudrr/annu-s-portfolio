import * as THREE from "three";
import { RoomEnvironment } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene, renderer: THREE.WebGLRenderer) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0);
  fillLight.position.set(2, 1, 3);
  scene.add(fillLight);

  try {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(RoomEnvironment()).texture;
    scene.environmentIntensity = 0;
    scene.environmentRotation.set(5.76, 85.85, 1);
  } catch(e) {
    console.error("Failed to generate RoomEnvironment", e);
  }

  function setPointLight(screenLight: any) {
    if (screenLight && screenLight.material && screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }

  const duration = 2;
  const ease = "power2.inOut";

  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 1.1,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.8,
      duration: duration,
      ease: ease,
    });
    gsap.to(fillLight, {
      intensity: 0.7,
      duration: duration,
      ease: ease,
      delay: 0.25,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
