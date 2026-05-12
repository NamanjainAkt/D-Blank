# PLAN — Fix Admin Panel Export Functionality

## Goal
Restore and expand CSV export across the admin panel. Two endpoints need work: **students** (missing entirely) and **enrollments** (broken filter + incomplete headers).

## Tasks

### Task 1: Create student export API endpoint
**File:** `src/app/api/admin/students/export/route.ts` (NEW)
- Auth guard via `getServerSession` (same pattern as other admin routes)
- Build query from `search`, `semester`, `college` params (mirror the existing `GET /api/admin/students`)
- Query `Student.find()` and return CSV with all model fields:
  `name, email, phone, whatsappNumber, collegeName, branch, year, semester, rollNumber, city, referrer, createdAt`
- Content-Type: `text/csv`, disposition: `attachment; filename="students-{timestamp}.csv"`
- **Verify:** `curl http://localhost:3000/api/admin/students/export?semester=3rd` returns valid CSV with headers

### Task 2: Fix enrollment export endpoint
**File:** `src/app/api/admin/export/route.ts` (MODIFY)
- **Parse `search` param** and add `$or` query clause filtering by `studentName`, `studentEmail`, `phone`, `collegeName`, `rollNumber`, `enrollmentId` (all case-insensitive regex)
- **Parse `enrollmentStatus`** param and add to query
- **Expand CSV headers** to match full Enrollment model:
  `enrollmentId, studentName, studentEmail, phone, whatsappNumber, collegeName, branch, semester, rollNumber, city, courseName, paymentAmount, originalAmount, discountAmount, couponCode, paymentMethod, paymentReferenceId, paymentStatus, enrollmentStatus, adminNote, paymentDate, createdAt`
- Map each row field correctly from the document
- **Verify:** `curl "http://localhost:3000/api/admin/export?search=john&paymentStatus=paid"` returns filtered CSV with all 22 columns

### Task 3: Add export button to Students page
**File:** `src/app/admin/students/page.tsx` (MODIFY)
- Import `Download` icon from `lucide-react`
- Add `handleExport` function that builds params from `search`, `semesterFilter`, `collegeFilter`, calls `/api/admin/students/export`, downloads blob as `students-{timestamp}.csv`
- Add an "Export Registry" button next to the "Add Entity" button in the header using the same `Button` styling as the enrollments page (variant `outline`, `Download` icon, matching the cyberpunk aesthetic)
- **Verify:** Clicking the button in the browser triggers a CSV file download with current filter state

### Task 4: Verify enrollment search filter works end-to-end
**File:** `src/app/admin/enrollments/page.tsx` (NO CHANGES NEEDED — verify only)
- The `handleExport` function (line 145-166) already passes `search` param correctly
- After Task 2, the backend will now respect it
- **Verify:** Type a name in the search bar, click "Export Archive", confirm CSV only contains matching rows

## Done When
- [ ] `GET /api/admin/students/export` returns CSV with all student fields, respecting `search`, `semester`, `college` filters
- [ ] `GET /api/admin/export` returns CSV with all 22 enrollment columns, respecting `search`, `paymentStatus`, `enrollmentStatus`, `course` filters
- [ ] Students page has an "Export Registry" button that downloads a filtered CSV
- [ ] `npm run build` passes with no errors
