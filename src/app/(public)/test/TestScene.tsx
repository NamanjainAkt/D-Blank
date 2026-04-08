'use client';

import { useEffect, useRef, useState } from 'react';
import { BRAND, applyBrandMaterials } from '@/lib/three-brand';

interface ViewerHandle {
  cleanup: () => void;
}

async function createModelViewer(
  container: HTMLDivElement,
  modelPath: string,
  characterType: 'vader' | 'maul',
  onLoaded: () => void
): Promise<ViewerHandle> {
  const THREE = await import('three');
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020005, 0.06);

  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.5, 5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // ═══ LIGHTING ═══

  // Ambient — enough to read dark surfaces
  scene.add(new THREE.AmbientLight(0xffffff, 0.2));

  // Key light — front-top, main illumination
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
  keyLight.position.set(2, 5, 4);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // ★ TOP SPOTLIGHT — dramatic downward pool of light
  const topLight = new THREE.SpotLight(0xffffff, 2.5, 12, Math.PI / 5, 0.6, 1);
  topLight.position.set(0, 7, 0.5);
  topLight.target.position.set(0, 0, 0);
  topLight.castShadow = true;
  scene.add(topLight);
  scene.add(topLight.target);

  // Rim light — white edge definition from behind
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
  rimLight.position.set(-3, 3, -4);
  scene.add(rimLight);

  // Second rim — opposite side for balanced edges
  const rimLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
  rimLight2.position.set(3, 2, -3);
  scene.add(rimLight2);

  // Fill light — front-low, softens shadows on body
  const fillLight = new THREE.PointLight(0xffffff, 0.4, 8);
  fillLight.position.set(0, 0, 4);
  scene.add(fillLight);

  // Fuchsia accent from the side — catches edges
  const accentLight = new THREE.SpotLight(
    BRAND.fuchsia, 2.5, 14, Math.PI / 5, 0.6
  );
  accentLight.position.set(
    characterType === 'vader' ? -4 : 4,
    2,
    -2
  );
  accentLight.target.position.set(0, 0, 0);
  scene.add(accentLight);
  scene.add(accentLight.target);

  // Violet uplight — catches underside
  const uplight = new THREE.PointLight(BRAND.deepViolet, 0.5, 6);
  uplight.position.set(0, -0.5, 1.5);
  scene.add(uplight);

  // ═══ GROUND EFFECTS ═══

  const ringMat = new THREE.MeshBasicMaterial({
    color: BRAND.fuchsia,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(1.35, 1.4, 128),
    ringMat
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -1.49;
  scene.add(ring);

  const ring2 = new THREE.Mesh(
    new THREE.RingGeometry(1.7, 1.73, 128),
    new THREE.MeshBasicMaterial({
      color: BRAND.deepViolet,
      transparent: true,
      opacity: 0.035,
      side: THREE.DoubleSide,
    })
  );
  ring2.rotation.x = -Math.PI / 2;
  ring2.position.y = -1.5;
  scene.add(ring2);

  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, 64),
    new THREE.MeshBasicMaterial({
      color: BRAND.violet,
      transparent: true,
      opacity: 0.012,
      side: THREE.DoubleSide,
    })
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = -1.48;
  scene.add(pool);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.minDistance = 2.5;
  controls.maxDistance = 8;
  controls.minPolarAngle = Math.PI / 6;
  controls.maxPolarAngle = Math.PI / 1.8;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // ═══ LOAD MODEL ═══
  let mixer: InstanceType<typeof THREE.AnimationMixer> | null = null;
  let model: any = null;

  const loader = new GLTFLoader();
  loader.load(modelPath, (gltf) => {
    model = gltf.scene;

    if (characterType === 'vader') {
      // Vader's Armature is baked with rotation=[PI/2, 0, 0] and scale=0.01
      // We scale uniformly and position feet on ground
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.8 / maxDim;
      model.scale.setScalar(scale);

      // Recalculate after scaling
      const scaledBox = new THREE.Box3().setFromObject(model);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
      const scaledMin = scaledBox.min;

      // Center horizontally, plant feet at ground level
      model.position.x = -scaledCenter.x;
      model.position.z = -scaledCenter.z;
      model.position.y = -scaledMin.y - 1.5;
    } else {
      // Maul — standard center + scale
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      model.scale.setScalar(scale);

      const scaledBox = new THREE.Box3().setFromObject(model);
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
      const scaledMin = scaledBox.min;

      model.position.x = -scaledCenter.x;
      model.position.z = -scaledCenter.z;
      model.position.y = -scaledMin.y - 1.5;
    }

    // Apply brand materials
    applyBrandMaterials(model, THREE, characterType);

    scene.add(model);

    // Play animation once
    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(gltf.animations[0]);
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    }

    onLoaded();
  });

  // ═══ RENDER LOOP ═══
  let animId: number;
  const clock = new THREE.Clock();

  function animate() {
    animId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    if (mixer) mixer.update(delta);

    // Subtle float
    if (model) {
      model.position.y += Math.sin(elapsed * 0.5) * 0.0002;
    }

    // Gentle ring pulse
    ringMat.opacity = 0.07 + Math.sin(elapsed * 1.0) * 0.03;

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onResize);

  return {
    cleanup: () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}

function ModelViewer({
  path,
  label,
  characterType,
}: {
  path: string;
  label: string;
  characterType: 'vader' | 'maul';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let handle: ViewerHandle | null = null;

    if (containerRef.current) {
      createModelViewer(
        containerRef.current,
        path,
        characterType,
        () => setLoading(false)
      ).then((h) => (handle = h));
    }

    return () => {
      handle?.cleanup();
    };
  }, [path, characterType]);

  return (
    <div className="relative border border-white/[0.04] rounded-2xl overflow-hidden bg-black">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent z-10" />

      {/* Label */}
      <div className="absolute top-5 left-5 z-10">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-md backdrop-blur-sm">
          {label}
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-accent/40 border-t-accent rounded-full animate-spin" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
              Loading...
            </span>
          </div>
        </div>
      )}

      <div ref={containerRef} className="h-[500px] md:h-[650px]" />

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
    </div>
  );
}

export default function TestScene() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-black to-black pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-16 pb-6 px-4">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.95] tracking-tighter mb-4">
            <span className="text-white">Character </span>
            <span className="bg-gradient-to-r from-accent via-primary to-primary bg-clip-text text-transparent">
              Showcase
            </span>
          </h1>
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-[0.3em] flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-white/10" />
            Drag to rotate / Scroll to zoom
            <span className="w-8 h-px bg-white/10" />
          </p>
        </div>

        {/* Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 pb-16 max-w-7xl mx-auto">
          <ModelViewer
            path="/model/vader.glb"
            label="Darth Vader"
            characterType="vader"
          />
          <ModelViewer
            path="/model/fighter.glb"
            label="Darth Maul"
            characterType="maul"
          />
        </div>
      </div>
    </div>
  );
}
