# PLAN: GSAP Visibility & Animation Fix

This plan outlines the steps to resolve visibility issues in the D-Blanks project caused by the removal of GSAP. We will replace broken GSAP logic with a standard `IntersectionObserver` pattern and CSS transitions, ensuring all sections are visible and performant.

## 1. Audit Phase

### 1.1 Identify GSAP Dependencies
- [ ] Scan `src/` directory for remaining `gsap` imports.
- [ ] List all components using `gsap` for entry animations, scroll triggers, or state updates.
- [ ] Specifically check the following target files for broken logic:
    - `src/components/sections/FoundersSection.tsx`
    - `src/components/sections/TestimonialsSection.tsx`
    - `src/components/sections/WhyChooseUs.tsx`
    - `src/components/sections/GradientHeading.tsx`
    - `src/components/sections/SplitText.tsx`
    - `src/components/sections/FeatureCard.tsx`

### 1.2 Identify Invisible Elements
- [ ] Audit elements with `opacity-0` that rely on GSAP or faulty `IntersectionObserver` state to become visible.
- [ ] Check nested components (e.g., `micro/` components inside `FeatureCard`) for visibility issues.

---

## 2. Fix Phase

### 2.1 Standardize Animation Pattern
- [ ] Use the `AnimatedContent.tsx` component as the primary pattern for entry animations.
- [ ] For components where `AnimatedContent` is not suitable, use a consistent `IntersectionObserver` + `isVisible` state + Tailwind transition pattern.

### 2.2 Re-implement Target Sections
- [ ] **FoundersSection**: Verify `IntersectionObserver` triggers correctly. Ensure `ChromaGrid` handles missing GSAP gracefully (use CSS for hover effects).
- [ ] **TestimonialsSection**: Ensure the header and columns become visible on scroll.
- [ ] **WhyChooseUs**: Fix subtitles and `FeatureCard` entry animations.
- [ ] **GradientHeading & SplitText**: Fix the character-level staggered animations using CSS `transition-delay` instead of GSAP timelines.
- [ ] **FeatureCard**: Replace GSAP `fromTo` with `AnimatedContent` or CSS transitions.

### 2.3 Fix Micro-Interaction Components
- [ ] **PortfolioStack**: Replace GSAP `set` and `timeline` with CSS states.
- [ ] **OutcomeTimeline**: Replace GSAP scale/opacity animations with CSS.
- [ ] **ToolStack**: Replace GSAP marquee logic with pure CSS animations (keyframes).
- [ ] **MentorshipFlow**: Replace the complex GSAP timeline with a simpler CSS-based pulse/progress animation.

### 2.4 Remove GSAP Completely
- [ ] Once all components are migrated, remove `src/lib/gsap.ts` and all its imports.
- [ ] Update `package.json` to remove `gsap` if it's still listed.

---

## 3. Verification Phase

### 3.1 Browser Testing (MCP Chrome DevTools)
- [ ] **Visibility Check**: Verify all sections appear as intended when scrolled into view.
- [ ] **Interactivity Check**: Ensure hover effects (e.g., in `ChromaGrid`, `FeatureCard`) are functional.
- [ ] **Console Check**: Verify no "GSAP dummy context error" warnings remain.

### 3.2 Responsive Check
- [ ] Verify animations and visibility on Mobile (375px), Tablet (768px), and Desktop (1440px).

---

## 4. Performance & Optimization Phase

### 4.1 Lighthouse Audits
- [ ] Run Lighthouse Mobile audit on home page.
- [ ] Run Lighthouse Desktop audit on home page.
- [ ] Goal: Performance score > 90 (due to removal of heavy libraries).

### 4.2 Optimization
- [ ] Use `content-visibility: auto` for off-screen sections if needed.
- [ ] Ensure `priority` flag is set for above-the-fold images.
- [ ] Verify that removing GSAP reduced the total JS bundle size significantly.

---

## ✅ PHASE X COMPLETE
- Lint: [ ]
- Security: [ ]
- Build: [ ]
- Performance Score: [ ]
- Date: 2026-04-15
