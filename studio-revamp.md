# Studio Page Revamp Plan

## Overview

The D-Blanks Studio page (`src/app/(public)/studio/page.tsx`) currently uses static placeholder data from `@/lib/placeholder-data.ts`. This plan outlines how to make it dynamic by fetching real data from the database, including games, team information, and statistics.

**Goal:** Transform the studio page from static placeholders to dynamic, database-driven content while preserving the existing cyberpunk/neon aesthetic.

---

## Project Type

**WEB** - Next.js 16 application with React 18, TypeScript, Tailwind CSS

---

## Success Criteria

1. Studio page displays real game data from the database instead of placeholder data
2. Featured games section shows actual published games with images, genres, ratings
3. Stats section displays real counts (total games, featured games count, etc.)
4. Page maintains the existing cyberpunk/neon aesthetic
5. No authentication required for public studio data
6. Page remains performant with proper loading states
7. All existing sections (Leadership, Team, Achievements, CTA) remain functional with either dynamic or static data

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** MongoDB with Mongoose
- **Data Fetching:** Server Components + client-side loading where needed
- **Styling:** Tailwind CSS (existing)

---

## File Structure

```
src/
├── app/
│   ├── (public)/
│   │   └── studio/
│   │       └── page.tsx          # Modified - fetch real data
│   └── api/
│       └── studio/
│           └── stats/
│               └── route.ts      # NEW - public stats endpoint
├── models/
│   └── Game.ts                   # Existing - has isFeatured field
└── lib/
    └── placeholder-data.ts       # Keep for fallback/team data
```

---

## Task Breakdown

### Task 1: Create Public Studio Stats API

**Agent:** `backend-specialist` | **Skill:** `api-patterns`

**INPUT:** Need a public (no auth) API endpoint that provides studio statistics

**OUTPUT:** New API route at `/api/studio/stats` returning:
- Total published games count
- Featured games count
- Games by genre breakdown
- Average rating

**VERIFY:** 
- [ ] API returns JSON with stats
- [ ] No authentication required
- [ ] Works when called via fetch

**Dependencies:** None

---

### Task 2: Create Public Games API for Studio

**Agent:** `backend-specialist` | **Skill:** `api-patterns`

**INPUT:** Need an endpoint to fetch published games for display on studio page

**OUTPUT:** New API route at `/api/studio/games` returning:
- Featured games (isFeatured: true)
- Top rated games
- Can limit to specific count (e.g., top 6)

**VERIFY:**
- [ ] Returns array of published games
- [ ] Includes title, genre, rating, thumbnailUrl, platforms
- [ ] No auth required

**Dependencies:** Task 1 (can run in parallel)

---

### Task 3: Add Game Fields for Display (Optional Review)

**Agent:** `database-architect` | **Skill:** `database-design`

**INPUT:** Review if Game model has all fields needed for studio display

**OUTPUT:** Confirm Game model fields are sufficient for:
- Thumbnail/cover image
- Title, genre, rating
- Platform icons
- If missing, add fields or use placeholder

**VERIFY:**
- [ ] Game model has required display fields

**Dependencies:** None (quick review)

---

### Task 4: Update Studio Page - Add Client Data Fetching

**Agent:** `frontend-specialist` | **Skill:** `react-best-practices`

**INPUT:** Modify studio page to fetch and display real game data

**OUTPUT:** Updated `src/app/(public)/studio/page.tsx`:
- Add useEffect to fetch studio stats from `/api/studio/stats`
- Add useEffect to fetch featured games from `/api/studio/games`
- Add loading states (skeleton/spinner)
- Update Stats section to show real numbers
- Add Featured Games section between Hero and Leadership
- Keep Leadership/Team sections (can use placeholder or move to DB later)

**VERIFY:**
- [ ] Page loads and shows real game count
- [ ] Featured games section displays actual games from DB
- [ ] Stats show dynamic numbers
- [ ] Loading states work during data fetch
- [ ] Cyberpunk aesthetic preserved
- [ ] No console errors

**Dependencies:** 
- Task 1 (stats API)
- Task 2 (games API)

---

### Task 5: Add Loading Skeleton Components

**Agent:** `frontend-specialist` | **Skill:** `frontend-design`

**INPUT:** Enhance UX with proper loading states

**OUTPUT:** Add skeleton loaders or fallback UI for:
- Stats section while loading
- Games grid while loading

**VERIFY:**
- [ ] No layout shift during loading
- [ ] Smooth transition from skeleton to content

**Dependencies:** Task 4

---

### Task 6: Error Handling & Fallback

**Agent:** `frontend-specialist` | **Skill:** `react-best-practices`

**INPUT:** Handle API failures gracefully

**OUTPUT:** Add error boundaries and fallback:
- If API fails, show static placeholder data
- Log error for debugging
- Don't break the page

**VERIFY:**
- [ ] Page works even if API is down
- [ ] Static data shows as fallback

**Dependencies:** Task 4

---

### Task 7: Phase X - Verification

**Agent:** Verification by running checks

**VERIFY:**
- [ ] `npm run build` succeeds (no type errors)
- [ ] `npm run lint` passes
- [ ] Page renders at http://localhost:3000/studio
- [ ] Console shows no critical errors
- [ ] Stats section shows numbers (real or fallback)
- [ ] Featured games display (if any in DB)
- [ ] Aesthetic preserved (no broken styles)

---

## Dependencies Graph

```
                    ┌─────────────────────┐
                    │   Task 3: Review    │
                    │   Game Model        │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Task 1: Stats  │  │ Task 2: Games   │  │   NO BLOCKER    │
│     API        │  │     API         │  │   (Parallel)    │
└────────┬────────┘  └────────┬────────┘
         │                      │
         └──────────┬───────────┘
                    │
                    ▼
            ┌─────────────────┐
            │  Task 4: Update │
            │  Studio Page   │
            └────────┬────────┘
                     │
          ┌─────────┴─────────┐
          │                     │
          ▼                     ▼
┌─────────────────┐  ┌─────────────────┐
│ Task 5: Loading │  │ Task 6: Error   │
│    Skeletons    │  │    Handling     │
└────────┬────────┘  └────────┬────────┘
         └──────────┬──────────┘
                    │
                    ▼
            ┌─────────────────┐
            │ Task 7: Verify  │
            └─────────────────┘
```

---

## Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `src/app/(public)/studio/page.tsx` | Modify | Fetch real data, display games, update stats |
| `src/app/api/studio/stats/route.ts` | Create | Public endpoint for studio statistics |
| `src/app/api/studio/games/route.ts` | Create | Public endpoint for featured games |
| `src/lib/placeholder-data.ts` | No Change | Keep for fallback and team data |

---

## Implementation Notes

1. **Public vs Admin APIs:** The existing `/api/admin/stats` requires authentication. Create new public endpoints under `/api/studio/` that don't require auth.

2. **Game Display:** Show featured games (isFeatured: true) or top-rated published games. If no games in DB yet, fallback to placeholder data.

3. **Team/Leadership Data:** The placeholder data for founders and team members is good. Keep using it or move to a Team model later. For now, focus on games + stats.

4. **Performance:** Use client-side fetching for games data (useEffect) since it's a 'use client' component. This allows showing loading states.

5. **Loading States:** Add simple conditional rendering - show "Loading..." or skeleton while fetching.

---

## Phase X: Verification Checklist

- [ ] Lint: `npm run lint` passes
- [ ] Build: `npm run build` succeeds
- [ ] Runtime: Page loads at http://localhost:3000/studio
- [ ] Data: Stats show numbers (real or fallback)
- [ ] Games: Featured games display (if data exists)
- [ ] Design: Cyberpunk/neon aesthetic intact
- [ ] Console: No critical errors

---

**Plan Created:** April 7, 2026
**Plan File:** `studio-revamp.md`