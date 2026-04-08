# D-Blanks Admin Enhancement Plan

## Executive Summary
This document outlines a comprehensive enhancement plan for the D-Blanks admin panel, addressing: (1) Company Members Management, (2) Coupon Code Panel, and (3) Label Simplification in the Course Creation Form.

---

## 🗂️ Project Details

- **Project Type**: Next.js 16 Web Application (Admin Panel)
- **Tech Stack**: React 18, TypeScript, Tailwind CSS, MongoDB/Mongoose, NextAuth
- **Current State**: Static team members data, no coupon system, confusing cyberpunk labels
- **Target State**: Full CRUD for members, coupon management system, user-friendly labels

---

## Phase 1: Company Members Management

### Overview
Convert static team member data from `placeholder-data.ts` into a fully managed MongoDB-based system with CRUD operations.

### Fields Required (based on Studio page)
| Field | Type | Description |
|-------|------|-------------|
| name | string | Member's full name |
| designation | string | Job title/role (e.g., "Gameplay Programmer") |
| bio | string | Short biography |
| skills | string[] | List of tools/technologies they use |
| image | string | Profile photo URL |
| handle | string | Social media handle (e.g., @lazydeveloper) |
| type | enum | "founder" or "team" |
| status | enum | "active" or "inactive" |
| socials | object | twitter, linkedin, github links |

### Tasks

- [ ] **1.1** Create MongoDB model `Member` in `src/models/Member.ts` → Verify: Model compiles without errors
- [ ] **1.2** Create API routes in `src/app/api/members/` (GET, POST, PUT, DELETE) → Verify: All endpoints return proper JSON
- [ ] **1.3** Create admin page `src/app/admin/members/page.tsx` with list view → Verify: Page renders with table
- [ ] **1.4** Add "Add Member" modal with form (name, designation, bio, skills, image, type) → Verify: Form submits successfully
- [ ] **1.5** Add edit/delete actions per member row → Verify: Edit modal populates, delete shows confirmation
- [ ] **1.6** Add status toggle (active/inactive) in list view → Verify: Toggle updates in database
- [ ] **1.7** Seed existing founders & team members to database → Verify: Data appears in admin panel
- [ ] **1.8** Update Studio page to fetch from API instead of static data → Verify: Public page shows dynamic data

### Dependencies
- Task 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6 (sequential)
- Task 1.7 can run in parallel after 1.6
- Task 1.8 runs after 1.7 (depends on seeded data)

### Verification
- Navigate to `/admin/members` - should see list of all team members
- Add a new member - appears in list immediately
- Edit a member - changes persist after refresh
- Delete a member - removed from list and Studio page

---

## Phase 2: Coupon Code Panel

### Overview
Create a coupon management system to offer fixed-amount discounts on courses.

### Features Required
| Feature | Description |
|---------|-------------|
| Create Coupon | Generate new coupon codes with amount & expiry |
| List Coupons | View all active/expired coupons |
| Edit Coupon | Modify coupon details |
| Delete/Deactivate | Remove or disable coupons |
| Apply to All | Option to apply to any course |
| Usage Tracking | Track how many times a coupon was used |
| Expiry Management | Auto-expire coupons after date |

### Coupon Schema
```typescript
{
  code: string;          // e.g., "WELCOME500"
  description: string;   // e.g., "New Year Offer"
  discountAmount: number; // Fixed amount in ₹ (e.g., 500)
  minPurchase: number;   // Minimum order amount to apply
  maxUses: number;       // Maximum redemption limit
  usedCount: number;     // Times used (auto-tracked)
  validFrom: Date;       // Start date
  validUntil: Date;      // Expiry date
  isActive: boolean;     // Enable/disable coupon
  createdAt: Date;
}
```

### Tasks

- [ ] **2.1** Create MongoDB model `Coupon` in `src/models/Coupon.ts` → Verify: Model compiles
- [ ] **2.2** Create API routes `src/app/api/coupons/` (CRUD endpoints) → Verify: All endpoints work via Postman/curl
- [ ] **2.3** Create admin page `src/app/admin/coupons/page.tsx` → Verify: Page loads with coupon list
- [ ] **2.4** Build "Create Coupon" form (code, amount, dates, limits) → Verify: Creates valid coupon
- [ ] **2.5** Add coupon table with columns: Code, Amount, Uses, Expiry, Status → Verify: All columns display correctly
- [ ] **2.6** Add edit/delete functionality → Verify: Updates persist
- [ ] **2.7** Create usage stats view (graph/table of usage) → Verify: Shows usage count
- [ ] **2.8** Add validation: prevent expired coupon usage at checkout → Verify: Checkout rejects expired coupons

### Dependencies
- Task 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → 2.6 (sequential)
- Task 2.7 can run in parallel with 2.6
- Task 2.8 requires checkout integration (see notes)

### Verification
- Navigate to `/admin/coupons` - see all coupons
- Create "SAVE500" with ₹500 discount - appears in list
- Edit discount to ₹300 - changes persist
- Delete coupon - removed from list

---

## Phase 3: Label Simplification (Course Form)

### Overview
Replace confusing cyberpunk-themed labels with simple, intuitive labels that any admin can understand.

### Current vs. Proposed Labels

| Current Label | Proposed Label |
|---------------|----------------|
| Module Designation | Course Title |
| Access Key (Slug) | URL Slug |
| Category | Category |
| Level | Difficulty Level |
| Deployment Credits (Price) | Price (₹) |
| Base Credits | Original Price (₹) |
| Early Access Credits | Discounted Price |
| Early Access Deadline | Discount Deadline |
| Total Capacity | Total Seats |
| Comm Language | Language |
| Tactical Summary | Short Description |
| Technical Briefing | Full Description |
| Mission Outcomes | What You'll Learn |
| Hardware/Software Requirements | Software Needed |
| Mission Prerequisites | Prerequisites |
| Temporal Deployment (Time) | Duration & Schedule |
| Runtime (Duration) | Duration |
| Total Quantum (Hours) | Total Hours |
| Batch Start | Batch Start Date |
| Enroll Deadline | Enrollment Deadline |
| Operational Cycle | Class Schedule |
| Projects Count | Number of Projects |
| Syllabus Grid | Course Curriculum |
| Initialize Module | Add Module |
| Module Heading | Module Title |
| Module Transmissions (Lessons) | Lessons |
| Module Visual (Thumbnail) | Course Image |
| Technical Matrix (Syllabus PDF) | Syllabus PDF |
| Promo Transmission (YouTube URL) | Promo Video URL |
| Lead Operator (Instructor) | Instructor Name |
| Operator Avatar URL | Instructor Photo URL |
| Operational Room (Meet Link) | Google Meet Link |
| Comm Channel (WhatsApp Link) | WhatsApp Group Link |
| Support Terminal (Email) | Support Email |
| Featured Spotlight | Featured |
| Public Uplink Active | Published |
| Lifetime Auth Grant | Lifetime Access |
| Credential Issuence | Certificate |
| Session Logs Archive | Recording Access |

### Tasks

- [ ] **3.1** Update all labels in `src/components/admin/courses/CourseForm.tsx` → Verify: All labels changed
- [ ] **3.2** Update tab names to simple terms (remove numbering & cyberpunk) → Verify: Tabs read naturally
- [ ] **3.3** Update button text (Confirm Initialization → Save Course) → Verify: Buttons are clear
- [ ] **3.4** Update validation messages to plain language → Verify: Errors are helpful
- [ ] **3.5** Test form with actual course data → Verify: Everything saves correctly

### Dependencies
- All tasks sequential but quick to complete

### Verification
- Open course form - labels are now clear and simple
- Non-technical admin can understand all fields without explanation

---

## Navigation Structure

### Recommended Sidebar Layout
```
Dashboard
├── Overview
├── Courses
├── Enrollments
├── Students
├── Games
├── ─────────
├── Team Management
│   ├── Members (NEW)
│   └── Coupons (NEW)
├── ─────────
└── Settings
```

### Route Mapping
| New Route | File Path |
|-----------|-----------|
| `/admin/members` | `src/app/admin/members/page.tsx` |
| `/admin/members/new` | `src/app/admin/members/new/page.tsx` |
| `/admin/members/[id]/edit` | `src/app/admin/members/[id]/edit/page.tsx` |
| `/admin/coupons` | `src/app/admin/coupons/page.tsx` |
| `/admin/coupons/new` | `src/app/admin/coupons/new/page.tsx` |
| `/admin/coupons/[id]/edit` | `src/app/admin/coupons/[id]/edit/page.tsx` |

---

## Implementation Order (Phase by Phase)

### Phase 1 (Week 1)
- Days 1-2: Create Member model and API routes
- Days 3-4: Build admin page and list view
- Days 5: Add CRUD modals and seed data

### Phase 2 (Week 2)
- Days 1-2: Create Coupon model and API routes
- Days 3-4: Build admin page with forms
- Days 5: Add usage tracking and validation

### Phase 3 (Week 3)
- Day 1: Update all labels in CourseForm
- Day 2: Update tab names and button text
- Day 3: Test entire flow

---

## Technical Notes

### MongoDB Collections
1. **members** - Team members (founders + crew)
2. **coupons** - Discount codes

### API Endpoints
```
Members:
GET    /api/members          - List all
POST   /api/members          - Create new
GET    /api/members/[id]    - Get one
PUT    /api/members/[id]    - Update
DELETE /api/members/[id]     - Delete

Coupons:
GET    /api/coupons          - List all
POST   /api/coupons          - Create new
GET    /api/coupons/[id]     - Get one
PUT    /api/coupons/[id]     - Update
DELETE /api/coupons/[id]     - Delete
POST   /api/coupons/validate - Check if valid
```

### Edge Cases
- **Members**: Handle duplicate names, empty skills array
- **Coupons**: Prevent expired usage, handle concurrent redemptions
- **Course Form**: Preserve existing data when changing labels

---

## Success Criteria

| Phase | Criteria |
|-------|----------|
| Phase 1 | Admin can add/edit/remove members; Studio page fetches from DB |
| Phase 2 | Admin can create coupons; validation rejects invalid/expired |
| Phase 3 | Any admin can understand form without reading docs |

---

## Estimated Timeline
- **Phase 1**: 5 days
- **Phase 2**: 5 days  
- **Phase 3**: 3 days
- **Total**: ~13 days

---

*Plan created: April 9, 2026*
*Status: Ready for implementation*