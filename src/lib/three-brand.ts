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

export function applyBrandMaterials(
  model: any,
  THREE: any,
  characterType: 'vader' | 'maul'
) {
  model.traverse((child: any) => {
    if (!child.isMesh || !child.material) return;

    const matName = (child.material.name || '').toLowerCase();
    const meshName = (child.name || '').toLowerCase();
    child.material = child.material.clone();
    const m = child.material;

    // ─── EYES ───
    if (
      meshName.includes('eye') ||
      matName.includes('aistandard6') ||
      matName.includes('aistandardsurface6')
    ) {
      m.color = new THREE.Color(BRAND.fuchsia);
      m.emissive = new THREE.Color(BRAND.fuchsia);
      m.emissiveIntensity = 3.0;
      if (m.roughness !== undefined) m.roughness = 0.0;
      if (m.metalness !== undefined) m.metalness = 0.5;
      return;
    }

    // ─── VADER VISOR (GLASS) ───
    if (matName.includes('glass')) {
      m.color = new THREE.Color(0x0a0015);
      m.emissive = new THREE.Color(BRAND.fuchsia);
      m.emissiveIntensity = 0.5;
      if (m.roughness !== undefined) m.roughness = 0.05;
      if (m.metalness !== undefined) m.metalness = 1.0;
      if (m.transparent !== undefined) m.transparent = true;
      if (m.opacity !== undefined) m.opacity = 0.85;
      return;
    }

    // ─── GLOW / WEAPON ───
    if (matName.includes('glow') || matName.includes('weapon')) {
      m.color = new THREE.Color(BRAND.fuchsia);
      m.emissive = new THREE.Color(BRAND.fuchsia);
      m.emissiveIntensity = 2.5;
      if (m.roughness !== undefined) m.roughness = 0.1;
      if (m.metalness !== undefined) m.metalness = 0.6;
      return;
    }

    // ─── HORNS (Maul) — dark with subtle red glow ───
    if (meshName.includes('horn')) {
      m.color = new THREE.Color(0x0a0a0a);
      m.emissive = new THREE.Color(0x300505);
      m.emissiveIntensity = 0.4;
      if (m.roughness !== undefined) m.roughness = 0.4;
      if (m.metalness !== undefined) m.metalness = 0.3;
      return;
    }

    // ─── METAL / UTILITY / PLASTIC ───
    if (
      matName.includes('metal') ||
      matName.includes('utility') ||
      matName.includes('plastic')
    ) {
      m.color = new THREE.Color(BRAND.surface);
      m.emissive = new THREE.Color(0x030308);
      m.emissiveIntensity = 0.15;
      if (m.roughness !== undefined) m.roughness = 0.3;
      if (m.metalness !== undefined) m.metalness = 0.85;
      return;
    }

    // ─── MAUL: HEAD / SKIN — red glow effect ───
    if (
      characterType === 'maul' &&
      (matName.includes('head') || matName.includes('aistandard'))
    ) {
      m.color = new THREE.Color(BRAND.maulSkin);
      m.emissive = new THREE.Color(BRAND.maulRed);
      m.emissiveIntensity = 0.6;
      if (m.roughness !== undefined) m.roughness = 0.55;
      if (m.metalness !== undefined) m.metalness = 0.05;
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
      m.color = new THREE.Color(BRAND.base);
      m.emissive = new THREE.Color(0x030308);
      m.emissiveIntensity = 0.1;
      if (m.roughness !== undefined) m.roughness = 0.8;
      if (m.metalness !== undefined) m.metalness = 0.15;
      return;
    }

    // ─── FALLBACK ───
    m.color = new THREE.Color(BRAND.surface);
    m.emissive = new THREE.Color(0x030308);
    m.emissiveIntensity = 0.1;
    if (m.roughness !== undefined) m.roughness = 0.7;
    if (m.metalness !== undefined) m.metalness = 0.2;
  });
}
