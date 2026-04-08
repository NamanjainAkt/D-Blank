'use client';

import { useEffect, useRef } from 'react';
import { BRAND, applyBrandMaterials } from '@/lib/three-brand';

const VADER_HEIGHT = 3.2;
const MAUL_HEIGHT = 1.8;

interface HeroModelsProps {
  onLoaded?: () => void;
}

export default function HeroModels({ onLoaded }: HeroModelsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let disposed = false;

    async function init() {
      if (!container || disposed) return;

      const THREE = await import('three');
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

      if (disposed) return;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 1.6, 6.5);
      camera.lookAt(0, 0.7, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // ═══ LIGHTING ═══
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
      keyLight.position.set(0, 4, 6);
      scene.add(keyLight);

      const frontFill = new THREE.PointLight(0xeeeeff, 1.5, 15);
      frontFill.position.set(0, 1, 5);
      scene.add(frontFill);

      const vaderFront = new THREE.PointLight(0xffffff, 1.2, 10);
      vaderFront.position.set(-1.5, 1.5, 4);
      scene.add(vaderFront);

      const maulFront = new THREE.PointLight(0xffffff, 1.2, 10);
      maulFront.position.set(1.5, 1.5, 4);
      scene.add(maulFront);

      const centerGlow = new THREE.PointLight(BRAND.fuchsia, 2.5, 8);
      centerGlow.position.set(0, 1, 1);
      scene.add(centerGlow);

      // Load models
      const loader = new GLTFLoader();
      let mixerVader: InstanceType<typeof THREE.AnimationMixer> | null = null;
      let mixerMaul: InstanceType<typeof THREE.AnimationMixer> | null = null;
      let vaderIntroAction: any = null;
      let maulIntroAction: any = null;

      function normalizeModel(model: any, THREE: any, charType: 'vader' | 'maul') {
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());

        const targetHeight = charType === 'vader' ? VADER_HEIGHT : MAUL_HEIGHT;
        let scale = targetHeight / size.y;
        if (charType === 'maul') scale *= 1.35;
        else if (charType === 'vader') scale *= 1.1;

        model.scale.multiplyScalar(scale);

        const newBox = new THREE.Box3().setFromObject(model);
        const newCenter = newBox.getCenter(new THREE.Vector3());
        const newMin = newBox.min;

        model.position.x -= newCenter.x;
        model.position.z -= newCenter.z;
        model.position.y -= newMin.y;
      }

      function loadModel(
        path: string,
        charType: 'vader' | 'maul',
      ): Promise<any> {
        return new Promise((resolve) => {
          loader.load(path, (gltf) => {
            const model = gltf.scene;
            normalizeModel(model, THREE, charType);
            applyBrandMaterials(model, THREE, charType);

            if (gltf.animations.length > 0) {
              const mixer = new THREE.AnimationMixer(model);
              const action = mixer.clipAction(gltf.animations[0]);
              action.setLoop(THREE.LoopOnce, 1);
              action.clampWhenFinished = true;
              action.play();
              if (charType === 'vader') {
                mixerVader = mixer;
                vaderIntroAction = action;
              } else {
                mixerMaul = mixer;
                maulIntroAction = action;
              }
            }

            resolve(model);
          });
        });
      }

      const [vaderModel, maulModel] = await Promise.all([
        loadModel('/model/vader.glb', 'vader'),
        loadModel('/model/fighter.glb', 'maul'),
      ]);

      if (disposed) return;

      // Center alignment trick
      const boxVader = new THREE.Box3().setFromObject(vaderModel);
      const centerVader = boxVader.getCenter(new THREE.Vector3());
      vaderModel.position.sub(centerVader);
      
      const boxMaul = new THREE.Box3().setFromObject(maulModel);
      const centerMaul = boxMaul.getCenter(new THREE.Vector3());
      maulModel.position.sub(centerMaul);

      const spacing = 2.5;

      const vaderGroup = new THREE.Group();
      vaderGroup.add(vaderModel);
      vaderGroup.position.set(-spacing / 2, 0.8, 0);
      vaderGroup.rotation.set(0, 0.2, 0);
      vaderGroup.scale.set(1.2, 1.2, 1.2);
      scene.add(vaderGroup);

      const maulGroup = new THREE.Group();
      maulGroup.add(maulModel);
      maulGroup.position.set(spacing / 2, -0.4, 0);
      maulGroup.rotation.set(0, -0.2, 0);
      maulGroup.scale.set(1.2, 1.2, 1.2);
      scene.add(maulGroup);

      // Store base positions/rotations for idle animation
      const vaderBaseY = 0.8;
      const maulBaseY = -0.4;
      const vaderBaseRotY = 0.2;
      const maulBaseRotY = -0.2;

      // Signal models are ready
      onLoaded?.();

      const clock = new THREE.Clock();
      let vaderIntroDone = false;
      let maulIntroDone = false;

      // Detect when intro animations finish
      if (vaderIntroAction) {
        mixerVader!.addEventListener('finished', () => { vaderIntroDone = true; });
      } else {
        vaderIntroDone = true;
      }
      if (maulIntroAction) {
        mixerMaul!.addEventListener('finished', () => { maulIntroDone = true; });
      } else {
        maulIntroDone = true;
      }

      function animate() {
        if (disposed) return;
        animId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        if (mixerVader) mixerVader.update(delta);
        if (mixerMaul) mixerMaul.update(delta);

        // ═══ IDLE ANIMATION — subtle breathing & sway after intro finishes ═══

        // Vader idle
        if (vaderIntroDone) {
          // Gentle float (breathing)
          vaderGroup.position.y = vaderBaseY + Math.sin(elapsed * 0.6) * 0.04;
          // Subtle body sway
          vaderGroup.rotation.y = vaderBaseRotY + Math.sin(elapsed * 0.3) * 0.02;
          // Slight lean (breathing effect)
          vaderGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.008;
          // Micro scale pulse (chest breathing)
          const vBreath = 1.0 + Math.sin(elapsed * 0.8) * 0.003;
          vaderModel.scale.y = vaderModel.scale.x * vBreath;
        } else {
          vaderGroup.position.y = vaderBaseY;
        }

        // Maul idle
        if (maulIntroDone) {
          maulGroup.position.y = maulBaseY + Math.sin(elapsed * 0.55 + 1.2) * 0.04;
          maulGroup.rotation.y = maulBaseRotY + Math.sin(elapsed * 0.35 + 0.8) * 0.025;
          maulGroup.rotation.z = Math.sin(elapsed * 0.45 + 1.0) * 0.01;
          const mBreath = 1.0 + Math.sin(elapsed * 0.75 + 0.5) * 0.003;
          maulModel.scale.y = maulModel.scale.x * mBreath;
        } else {
          maulGroup.position.y = maulBaseY;
        }

        // Center glow pulse
        centerGlow.intensity = 2.2 + Math.sin(elapsed * 0.8) * 0.5;

        renderer.render(scene, camera);
      }
      animate();

      function onResize() {
        if (!container || disposed) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      cleanup?.();
    };
  }, [onLoaded]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}
