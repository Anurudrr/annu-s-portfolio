import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  // Primary model: /models/character.glb (the real, unencrypted asset).
  // If it's missing we resolve null so the avatar slot can fall back to the
  // 2D portrait in Landing.tsx without the AES layer (which had a corrupt
  // ciphertext and was failing decryption).
  const MODEL_URL = "/models/character.glb";

  const loadCharacter = (): Promise<GLTF | null> => {
    return new Promise((resolve) => {
      let character: THREE.Object3D;
      loader.load(
        MODEL_URL,
        async (gltf) => {
          character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              child.castShadow = false;
              child.receiveShadow = false;
              mesh.frustumCulled = true;
              if (mesh.material && !Array.isArray(mesh.material)) {
                (mesh.material as THREE.ShaderMaterial).precision = "mediump";
              }
            }
          });
          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();
          const footR = character.getObjectByName("footR");
          const footL = character.getObjectByName("footL");
          if (footR) footR.position.y = 3.36;
          if (footL) footL.position.y = 3.36;
          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          // GLB missing or invalid — resolve null so the caller can fall back.
          console.warn(
            "[character] GLB not available, using portrait fallback:",
            error?.message ?? error
          );
          resolve(null);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
