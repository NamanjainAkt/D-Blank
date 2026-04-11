// Shared brand palette + material system for 3D models
export const BRAND = {
  black: 0x000000,
  base: 0x080810,       // very dark body color
  surface: 0x101020,     // dark metal/utility
  white: 0xffffff,
  fuchsia: 0xd946ef,
  violet: 0xa21caf,
  deepViolet: 0x7c3aed,
  maulSkin: 0x8b1a2b,
  maulRed: 0xff2020,     // bright red for glow
};

// Material registry to avoid redundant clones
const materialRegistry = new Map<string, any>();

function getOrCreateMaterial(THREE: any, key: string, config: any) {
  if (materialRegistry.has(key)) {
    return materialRegistry.get(key);
  }
  const material = new THREE.MeshStandardMaterial(config);
  materialRegistry.set(key, material);
  return material;
}

export function applyBrandMaterials(
  model: any,
  THREE: any,
  characterType: 'vader' | 'maul'
) {
  model.traverse((child: any) => {
    if (!child.isMesh || !child.material) return;

    const matName = (child.material.name || '').toLowerCase();
    const meshName = (child.name || '').toLowerCase();
    
    // ─── EYES ───
    if (
      meshName.includes('eye') ||
      matName.includes('aistandard6') ||
      matName.includes('aistandardsurface6')
    ) {
      child.material = getOrCreateMaterial(THREE, 'eye', {
        color: BRAND.fuchsia,
        emissive: BRAND.fuchsia,
        emissiveIntensity: 3.0,
        roughness: 0.0,
        metalness: 0.5
      });
      return;
    }

    // ─── VADER VISOR (GLASS) ───
    if (matName.includes('glass')) {
      child.material = getOrCreateMaterial(THREE, 'glass', {
        color: 0x0a0015,
        emissive: BRAND.fuchsia,
        emissiveIntensity: 0.5,
        roughness: 0.05,
        metalness: 1.0,
        transparent: true,
        opacity: 0.85
      });
      return;
    }

    // ─── GLOW / WEAPON ───
    if (matName.includes('glow') || matName.includes('weapon')) {
      child.material = getOrCreateMaterial(THREE, 'glow', {
        color: BRAND.fuchsia,
        emissive: BRAND.fuchsia,
        emissiveIntensity: 2.5,
        roughness: 0.1,
        metalness: 0.6
      });
      return;
    }

    // ─── HORNS (Maul) — dark with subtle red glow ───
    if (meshName.includes('horn')) {
      child.material = getOrCreateMaterial(THREE, 'horn', {
        color: 0x0a0a0a,
        emissive: 0x300505,
        emissiveIntensity: 0.4,
        roughness: 0.4,
        metalness: 0.3
      });
      return;
    }

    // ─── METAL / UTILITY / PLASTIC ───
    if (
      matName.includes('metal') ||
      matName.includes('utility') ||
      matName.includes('plastic')
    ) {
      child.material = getOrCreateMaterial(THREE, 'metal', {
        color: BRAND.surface,
        emissive: 0x030308,
        emissiveIntensity: 0.15,
        roughness: 0.3,
        metalness: 0.85
      });
      return;
    }

    // ─── MAUL: HEAD / SKIN — red glow effect ───
    if (
      characterType === 'maul' &&
      (matName.includes('head') || matName.includes('aistandard'))
    ) {
      child.material = getOrCreateMaterial(THREE, 'maulSkin', {
        color: BRAND.maulSkin,
        emissive: BRAND.maulRed,
        emissiveIntensity: 0.6,
        roughness: 0.55,
        metalness: 0.05
      });
      return;
    }

    // ─── CLOTH / DRESS / BODY / GLOVE / HELMET ───
    if (
      matName.includes('cloth') ||
      matName.includes('dress') ||
      matName.includes('glove') ||
      matName.includes('body') ||
      matName.includes('head') ||
      meshName.includes('helmet') ||
      meshName.includes('belt') ||
      meshName.includes('chest') ||
      meshName.includes('hip') ||
      meshName.includes('arm') ||
      meshName.includes('neck') ||
      meshName.includes('dress') ||
      meshName.includes('hand') ||
      meshName.includes('hiza') ||
      meshName.includes('kata') ||
      meshName.includes('mune')
    ) {
      child.material = getOrCreateMaterial(THREE, 'cloth', {
        color: BRAND.base,
        emissive: 0x030308,
        emissiveIntensity: 0.1,
        roughness: 0.8,
        metalness: 0.15
      });
      return;
    }

    // ─── FALLBACK ───
    child.material = getOrCreateMaterial(THREE, 'fallback', {
      color: BRAND.surface,
      emissive: 0x030308,
      emissiveIntensity: 0.1,
      roughness: 0.7,
      metalness: 0.2
    });
  });
}
