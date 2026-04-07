# D-Blanks Admin: Games & Training Management

## Goal

Enable admin to manage games and training courses from the admin panel, display them on public pages, and allow users to enroll in courses with dummy payment. Replace all static placeholder data with live database content.

---

## Success Criteria

- [ ] Admin can add/edit/delete games from `/admin/games`
- [ ] Admin can add/edit/delete courses from `/admin/courses` with rich fields
- [ ] Games display dynamically on landing page "Featured Titles" and `/games`
- [ ] Courses page (`/courses`) fetches from MongoDB (not placeholder data)
- [ ] Users can view course detail page and enroll with a form
- [ ] Dummy payment simulates success (no real payment gateway)
- [ ] Admin dashboard shows game + course + enrollment stats
- [ ] All pages build without errors (`npm run build`)

---

## Tech Stack (Already in Use)

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB + Mongoose
- **Auth**: NextAuth v4 (JWT)
- **UI**: Tailwind CSS + shadcn/ui + Framer Motion
- **State**: Zustand
- **Validation**: Zod
- **Upload**: Cloudinary (already configured)
- **Payments**: PhonePe (bypass mode for dummy)

---

## Field Analysis

### Course Fields (Admin Creates These)

**CURRENT Course Model — what's missing:**

| Field | Status |
|-------|--------|
| title | ✅ |
| slug | ✅ |
| shortDescription | ✅ |
| fullDescription | ✅ |
| duration | ✅ |
| schedule | ✅ |
| price | ✅ |
| originalPrice | ✅ |
| category | ✅ |
| tags | ✅ |
| thumbnailUrl | ✅ |
| syllabusUrl | ✅ |
| totalSeats | ✅ |
| enrolledCount | ✅ |
| meetLink | ✅ |
| instructorName | ✅ |
| isPublished | ✅ |
| **NEW — level** | ❌ |
| **NEW — learningOutcomes[]** | ❌ |
| **NEW — curriculum[]** | ❌ |
| **NEW — prerequisites[]** | ❌ |
| **NEW — promoVideoUrl** | ❌ |
| **NEW — softwareRequired[]** | ❌ |
| **NEW — batchStartDate** | ❌ |
| **NEW — enrollmentDeadline** | ❌ |
| **NEW — earlyBirdPrice** | ❌ |
| **NEW — earlyBirdDeadline** | ❌ |
| **NEW — discount** | ❌ |
| **NEW — isFeatured** | ❌ |
| **NEW — lifetimeAccess** | ❌ |
| **NEW — certificateIncluded** | ❌ |
| **NEW — recordingAccess** | ❌ |
| **NEW — supportEmail** | ❌ |
| **NEW — whatsappGroupLink** | ❌ |
| **NEW — totalHours** | ❌ |
| **NEW — projectsCount** | ❌ |
| **NEW — language** | ❌ |

**Admin Course Form Fields (with rationale):**

| Field | Type | Why It Matters |
|-------|------|---------------|
| **Title** | text | Required — course name |
| **Slug** | auto-generate | URL-friendly, unique identifier |
| **Short Description** | text (120 chars) | For cards, SEO meta |
| **Full Description** | textarea | Detailed course pitch |
| **Level** | select (Beginner/Intermediate/Advanced) | Filter/search, student expectation setting |
| **Category** | select | Already exists — keep |
| **Tags** | multi-text | SEO, related courses, filters |
| **Price** | number | Required |
| **Original Price** | number | Show discount |
| **Discount %** | number | Auto-calculate savings |
| **Early Bird Price** | number | Limited-time offer |
| **Early Bird Deadline** | date | Auto-expire discount |
| **Duration** | text (e.g. "45 Hours | 6 Weeks") |
| **Total Hours** | number | Numeric for filters |
| **Schedule** | text | Already exists |
| **Batch Start Date** | date | Student commitment |
| **Enrollment Deadline** | date | Urgency |
| **Total Seats** | number | Already exists |
| **Instructor Name** | text | Already exists |
| **Meet Link** | URL | Already exists |
| **WhatsApp Group Link** | URL | Community building |
| **Promo Video (YouTube)** | URL | Auto-extract embed ID for course detail page |
| **Learning Outcomes** | list (add/remove) | What student will build/know |
| **Curriculum/Modules** | list (title + description per module) | Syllabus breakdown |
| **Prerequisites** | list | Entry-level requirements |
| **Software Required** | list | Tools student needs |
| **Certificate Included** | toggle | Trust signal |
| **Lifetime Access** | toggle | Value proposition |
| **Recording Access** | toggle | Flexibility |
| **Thumbnail** | image upload | Already exists |
| **Syllabus PDF** | file upload | Already exists |
| **Is Featured** | toggle | Homepage spotlight |
| **Is Published** | toggle | Already exists |

### Enrollment Form (Student Fills This)

**CURRENT Enrollment Model — what's missing:**

| Field | Status |
|-------|--------|
| courseId | ✅ |
| courseName | ✅ |
| studentName | ✅ |
| email | ✅ |
| phone | ✅ |
| whatsappNumber | ✅ |
| collegeName | ✅ |
| branch | ✅ |
| semester | ✅ |
| rollNumber | ✅ |
| city | ✅ |
| paymentStatus | ✅ |
| paymentId | ✅ |
| paymentAmount | ✅ |
| paymentDate | ✅ |
| enrollmentStatus | ✅ |
| confirmationEmailSent | ✅ |
| **NEW — year** | ❌ |
| **NEW — paymentMethod** | ❌ |
| **NEW — referrer** | ❌ |

**Student Enrollment Form Fields:**

| Field | Type | Why It Matters |
|-------|------|---------------|
| **Student Name** | text | Already exists |
| **Email** | email | Already exists |
| **Phone** | text | Already exists |
| **WhatsApp Number** | text (optional) | Already exists |
| **College Name** | text | Already exists |
| **Branch/Stream** | text | Already exists |
| **Year** | select (1st/2nd/3rd/4th/Graduated) | Better targeting |
| **Semester** | select | Already exists |
| **Roll Number** | text | Already exists |
| **City** | text | Already exists |
| **Referrer** | text (optional) | "How did you hear about us" — marketing insight |
| **Preferred Payment Method** | select (UPI/Card/Net Banking) | Dummy now, real later |
| **Course Summary** | display only | Read-only course info before payment |

### Game Fields (Admin Creates These)

| Field | Type | Why It Matters |
|-------|------|---------------|
| **Title** | text | Required |
| **Slug** | auto-generate | URL-friendly |
| **Genre** | select (RPG/Racing/Strategy/etc.) | Filterable |
| **Short Description** | text | For cards |
| **Full Description** | textarea | Detail page |
| **Download Link** | URL | Primary CTA |
| **YouTube Trailer** | URL | Auto-extract embed ID |
| **Thumbnail** | image | Cards and detail |
| **Gallery Images** | multi-image | Game detail page |
| **Platforms** | multi-select (PC/Console/Mobile) | Filterable |
| **Rating** | number (0-5) | Social proof |
| **Release Date** | date | Freshness |
| **Is Featured** | toggle | Homepage spotlight |
| **Is Published** | toggle | Draft/publish |

---

## File Structure

```
src/
├── models/
│   ├── Game.ts              # NEW - Game mongoose schema
│   └── Course.ts             # UPDATE - Add missing fields
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Landing - featured games from DB
│   │   ├── games/page.tsx        # Games - all games from DB
│   │   ├── courses/page.tsx      # Courses - from DB (replace placeholder)
│   │   └── courses/[slug]/
│   │       └── page.tsx          # Course detail (enhance)
│   └── admin/
│       ├── games/page.tsx         # NEW - Games management
│       ├── courses/page.tsx       # UPDATE - Add missing fields
│       └── layout.tsx             # UPDATE - Add games nav
├── components/
│   ├── GameCard.tsx               # NEW - Reusable game card
│   ├── GameForm.tsx               # NEW - Game add/edit dialog
│   ├── CourseForm.tsx             # UPDATE - Extended course form
│   └── CourseDetail.tsx           # NEW - Course detail component
└── lib/
    ├── validations.ts             # Add gameSchema, extended courseSchema
    └── placeholder-data.ts        # Remove from public pages
```

---

## Task Breakdown

### Phase 1: Database & Schema (Game + Extended Course)

- [ ] **Task 1**: Create `src/models/Game.ts` with full schema → **Verify**: File exists, no TypeScript errors
- [ ] **Task 2**: Update `src/models/Course.ts` — add: `level`, `learningOutcomes[]`, `curriculum[]` (with module title + lessons), `prerequisites[]`, `promoVideoUrl`, `softwareRequired[]`, `batchStartDate`, `enrollmentDeadline`, `earlyBirdPrice`, `earlyBirdDeadline`, `discount`, `isFeatured`, `lifetimeAccess`, `certificateIncluded`, `recordingAccess`, `supportEmail`, `whatsappGroupLink`, `totalHours`, `projectsCount`, `language` → **Verify**: Schema compiles, all fields present
- [ ] **Task 3**: Update `src/models/Enrollment.ts` — add: `year`, `paymentMethod`, `referrer` → **Verify**: Schema compiles
- [ ] **Task 4**: Add `gameSchema` and update `courseSchema` in `src/lib/validations.ts` → **Verify**: Zod schemas validate correctly
- [ ] **Task 5**: Create `/api/games` (GET, POST) and `/api/games/[id]` (GET, PATCH, DELETE) routes → **Verify**: All CRUD endpoints work
- [ ] **Task 6**: Update `/api/admin/courses` (POST/PATCH) to handle new fields → **Verify**: New fields save to DB

### Phase 2: Admin — Course Form Enhancement

- [ ] **Task 7**: Create enhanced `src/components/CourseForm.tsx` with all new fields: level select, learning outcomes (add/remove list), curriculum modules (add module → add lessons), prerequisites list, software required list, promo video URL (with YouTube embed preview), batch dates, early bird pricing, toggles (certificate, lifetime access, recordings, featured), discount % auto-calculates price savings → **Verify**: Form renders all fields, list fields allow add/remove
- [ ] **Task 8**: Update `src/app/admin/courses/page.tsx` to use CourseForm with new fields → **Verify**: All existing courses show, edit pre-fills all fields

### Phase 3: Admin — Games Management

- [ ] **Task 9**: Create `src/components/GameForm.tsx` dialog with: title, slug, genre, description, longDescription, downloadLink, YouTube URL (with preview), thumbnail, gallery images (multi-upload), platforms (multi-select), rating, isFeatured, isPublished → **Verify**: Form renders, validates, uploads
- [ ] **Task 10**: Create `src/app/admin/games/page.tsx` — list all games with thumbnail, title, genre, platform, featured/published badges; add/edit/delete via dialog; publish toggle → **Verify**: Games list works, CRUD works
- [ ] **Task 11**: Update `src/app/admin/layout.tsx` sidebar — add Games nav item with `Gamepad2` icon → **Verify**: Sidebar shows Games

### Phase 4: Public — Games Display

- [ ] **Task 12**: Update landing page (`src/app/(public)/page.tsx`) Featured Titles → fetch `/api/games?featured=true&limit=3`, replace static placeholder → **Verify**: Featured games load from DB
- [ ] **Task 13**: Update `/games` page → fetch `/api/games`, keep genre/platform filters, use new GameCard → **Verify**: Filters work, game cards display
- [ ] **Task 14**: Create `src/components/GameCard.tsx` with: thumbnail, genre badge, title, short description, rating, platform tags, download button, "Watch Trailer" button (opens modal with YouTube embed) → **Verify**: Card renders on both pages

### Phase 5: Public — Courses (Live Data + Detail)

- [ ] **Task 15**: Update `/courses` page → fetch `/api/courses`, replace placeholder data, show level badges, discount badges, early bird tags → **Verify**: Courses load from MongoDB
- [ ] **Task 16**: Update/create `src/app/(public)/courses/[slug]/page.tsx` — fetch from `/api/courses/[slug]`, show: title, description, level, duration, schedule, instructor, batch dates, pricing (with early bird + discount calc), learning outcomes, curriculum accordion, prerequisites, software, promo video (YouTube embed), CTA (Enroll Now), certificate/lifetime access/recording badges → **Verify**: Full course detail page renders

### Phase 6: Enrollment + Payment

- [ ] **Task 17**: Enhance `/enroll/[courseId]` page — show course summary card (title, price, dates), student form (name, email, phone, whatsapp, college, branch, year, semester, roll, city, referrer, payment method select), dummy payment button → **Verify**: Form submits, enrollment created
- [ ] **Task 18**: Create `/api/payment/dummy` route — always succeeds, marks enrollment `paid` → **Verify**: Enrollment marked paid, success page shown
- [ ] **Task 19**: Update `/payment/success` and `/payment/failure` pages → **Verify**: Appropriate messages with enrollment details

### Phase 7: Admin Dashboard + Stats

- [ ] **Task 20**: Update `/api/admin/stats` — add: total games, featured games count → **Verify**: API returns game stats
- [ ] **Task 21**: Update admin dashboard — add: game stats cards, recent games mini-list → **Verify**: Dashboard shows games section

### Phase 8: Cleanup + Verification

- [ ] **Task 22**: Remove placeholder data from public pages (keep as fallback only) → **Verify**: No placeholder data visible on public pages
- [ ] **Task 23**: Run `npm run build` → **Verify**: Build succeeds, all pages compile
- [ ] **Task 24**: Commit all changes → **Verify**: All code pushed to `main`

---

## Phase X: Verification

- [ ] `npm run build` → Success (no errors)
- [ ] `npm run dev` → All pages load
- [ ] Admin: Can add game with all fields + gallery + YouTube trailer
- [ ] Admin: Can add course with all fields (modules, outcomes, pricing)
- [ ] Admin: Can publish/unpublish games + courses
- [ ] Landing page: Featured games load from DB
- [ ] Games page: All games display with filters, trailer modal works
- [ ] Courses page: Courses load from DB with level/discount badges
- [ ] Course detail: Full info displays, promo video plays, enroll CTA works
- [ ] Enrollment form: All fields submit, dummy payment succeeds
- [ ] Admin dashboard: Shows games + courses + enrollment stats
- [ ] All public pages have zero placeholder data

---

## Notes

- **YouTube URL**: Extract video ID from `youtube.com/watch?v=X`, `youtu.be/X`, `youtube.com/embed/X` → store embed URL `https://www.youtube.com/embed/{id}`
- **Image uploads**: Reuse existing `ImageUploader` component
- **Gallery**: Multi-image upload, store array of Cloudinary URLs
- **Curriculum modules**: Each module has `{ title: string, lessons: string[] }`, stored as subdocument array
- **Discount calc**: `discount = ((originalPrice - price) / originalPrice) * 100`
- **Early bird logic**: If `new Date() < earlyBirdDeadline`, show `earlyBirdPrice` else show `price`
- **Dummy payment**: Skip PhonePe entirely, directly mark enrollment `paid`
- **Referrer field**: Simple text input — "How did you hear about us?"
- **Payment method select**: UPI / Card / Net Banking / Other (informational for now)
- **Task parallelization**: Tasks 1-3 parallel; 4-6 depend on 1-3; 7-8 depend on 4; 9-11 parallel; 12-14 depend on 5; 15-16 depend on 6; 17-19 depend on 15-16; 20-21 depend on 1-3; 22-24 final
