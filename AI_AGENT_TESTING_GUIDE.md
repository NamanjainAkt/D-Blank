# VocaLearn AI Agent Testing Guide

## Environment Setup

### Prerequisites
- MongoDB running on `mongodb://localhost:27017/d_blank`
- `.env.local` configured (already set)
- Dev server running: `npm run dev`

### Test Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@vocalearn.in | admin123 |

### Base URL
```
http://localhost:3000
```

---

## Database State (After Seed)

### Courses (6)
| # | Title | Slug | Price | Enrolled |
|---|-------|------|-------|----------|
| 1 | Industrial Automation with Python & IoT | industrial-automation-python-iot | ₹2,999 | 12 |
| 2 | PLC Programming & Industrial Control | plc-programming-industrial-control | ₹3,499 | 28 |
| 3 | Advanced CAD/CAM & CNC Machining | cad-cam-cnc-machining | ₹3,999 | 18 |
| 4 | Full Stack Web Development with React | full-stack-web-development-react | ₹3,999 | 32 |
| 5 | Building Information Modeling (BIM) | building-information-modeling-revit | ₹3,499 | 8 |
| 6 | Embedded Systems & Arduino | embedded-systems-arduino | ₹2,499 | 22 |

### Enrollments (20)
- 14 Paid & Confirmed
- 3 Paid & In Progress
- 3 Completed
- 1 Pending Payment
- 1 Failed Payment
- 1 Refunded/Cancelled

---

## Test Execution Order

### Phase 1: Public Pages (No Auth Required)

#### 1.1 Home Page
```
GET /
```
**Checks:**
- [ ] Page loads without errors (HTTP 200)
- [ ] Hero section visible
- [ ] Course cards displayed (should show 6 courses)
- [ ] Footer visible
- [ ] Navigation links work

#### 1.2 Course Listing
```
GET /courses
```
**Checks:**
- [ ] All 6 courses displayed
- [ ] Category filter dropdown present
- [ ] Search functionality present
- [ ] Clicking course card navigates to detail page

#### 1.3 Course Detail
```
GET /courses/industrial-automation-python-iot
GET /courses/plc-programming-industrial-control
GET /courses/full-stack-web-development-react
```
**Checks:**
- [ ] Full course details displayed
- [ ] Price shown correctly
- [ ] "Enroll Now" button present
- [ ] Course syllabus/description visible
- [ ] Instructor name displayed

#### 1.4 Contact Page
```
GET /contact
```
**Checks:**
- [ ] Contact form visible
- [ ] Name, email, phone, message fields present
- [ ] Submit button functional

#### 1.5 About Page
```
GET /about
```
**Checks:**
- [ ] Page loads correctly
- [ ] Company information displayed

#### 1.6 Legal Pages
```
GET /privacy-policy
GET /terms-of-service
GET /refund-policy
```
**Checks:**
- [ ] All legal pages accessible
- [ ] Content renders properly

---

### Phase 2: Enrollment Flow (Student)

#### 2.1 Start Enrollment
```
GET /enroll/[courseId]
```
**Steps:**
1. Navigate to any course detail page
2. Click "Enroll Now" button
3. Verify multi-step form loads

**Expected:** Redirects to `/enroll/[courseId]` with 3-step form

#### 2.2 Step 1: Personal Information
```
Form Data:
- studentName: "Test Student Agent"
- email: "agent.test@email.com"
- phone: "9998887771"
- whatsappNumber: "9998887771"
- city: "Test City"
```
**Validation Tests:**
- [ ] Empty name shows error
- [ ] Invalid email shows error
- [ ] Phone < 10 digits shows error
- [ ] Valid data proceeds to Step 2

#### 2.3 Step 2: Academic Details
```
Form Data:
- collegeName: "Test University"
- branch: "Computer Science"
- semester: "5th"
- rollNumber: "TEST2024001"
```
**Validation Tests:**
- [ ] Empty college shows error
- [ ] Empty branch shows error
- [ ] Valid data proceeds to Step 3

#### 2.4 Step 3: Review & Submit
**Checks:**
- [ ] All entered data displayed for review
- [ ] Course details shown correctly
- [ ] Price matches course price
- [ ] "Complete Enrollment (Test Mode)" button present

#### 2.5 Complete Enrollment
**Action:** Click submit button

**Expected:**
- [ ] Redirects to `/payment/success`
- [ ] Success message displayed
- [ ] Enrollment ID shown
- [ ] Test Mode banner visible

---

### Phase 3: Admin Portal

#### 3.1 Admin Login
```
POST /api/auth/signin
Data: { email: "admin@vocalearn.in", password: "admin123" }
```
**Steps:**
1. Navigate to `/admin/login`
2. Enter credentials
3. Click Sign In

**Expected:**
- [ ] Login succeeds
- [ ] Redirects to `/admin/dashboard`
- [ ] Session cookie set

#### 3.2 Dashboard Stats
```
GET /admin/dashboard
```
**Expected Data (based on seed):**
- Total Enrollments: 20
- Total Revenue: ₹68,975 (14 paid enrollments)
- Pending Payments: 1
- Course breakdown visible

**Checks:**
- [ ] Stats cards display correct numbers
- [ ] Recent enrollments list shows (up to 10)
- [ ] Course enrollment chart/graph present

#### 3.3 Student Management
```
GET /admin/students
```
**Checks:**
- [ ] All 20 students listed
- [ ] Pagination works (if > 10)
- [ ] Search by name/email functional
- [ ] Filter by course works
- [ ] Filter by status works

**API Test:**
```
GET /api/admin/students?search=Rahul
GET /api/admin/students?status=paid
GET /api/admin/students?course=[courseId]
```

#### 3.4 Student Detail View
```
GET /admin/students/[studentId]
```
**Checks:**
- [ ] Personal info displayed
- [ ] Academic info displayed
- [ ] Payment status shown
- [ ] Enrollment status shown
- [ ] Payment date displayed (if paid)

#### 3.5 Export to CSV
```
GET /api/admin/export/students
```
**Checks:**
- [ ] CSV file downloads
- [ ] Contains all student columns
- [ ] Proper CSV format

#### 3.6 Course Management
```
GET /admin/courses
```
**Checks:**
- [ ] All 6 courses listed
- [ ] Edit button for each course
- [ ] Delete button for each course
- [ ] Publish/Unpublish toggle works

**API Tests:**
```
GET /api/admin/courses
GET /api/admin/courses/[courseId]
PUT /api/admin/courses/[courseId] (update title)
```

#### 3.7 Add New Course
```
POST /api/admin/courses
Data: {
  title: "AI & Machine Learning Fundamentals",
  slug: "ai-ml-fundamentals",
  shortDescription: "Learn AI and ML basics",
  fullDescription: "Complete ML course",
  duration: "40 Hours",
  schedule: "Weekends 10AM-2PM",
  price: 4999,
  category: "IT & Software",
  tags: ["AI", "ML", "Python"],
  totalSeats: 30,
  instructorName: "Dr. AI Expert",
  isPublished: true
}
```
**Checks:**
- [ ] Course created successfully
- [ ] Appears in course list
- [ ] Visible on public `/courses` page

#### 3.8 Edit Course
```
PUT /api/admin/courses/[courseId]
Data: { title: "Updated Title" }
```
**Checks:**
- [ ] Course updated
- [ ] Changes reflected in public pages

#### 3.9 Delete Course
```
DELETE /api/admin/courses/[courseId]
```
**Checks:**
- [ ] Course removed from list
- [ ] No longer visible on public pages

#### 3.10 Admin Stats API
```
GET /api/admin/stats
```
**Expected Response:**
```json
{
  "totalEnrollments": 20,
  "totalRevenue": 68975,
  "pendingPayments": 1,
  "enrollmentsByCourse": [...],
  "recentEnrollments": [...]
}
```

---

### Phase 4: Payment Flow

#### 4.1 Payment Bypass (Test Mode)
Since `NEXT_PUBLIC_BYPASS_PAYMENT=true`, payment is bypassed.

**Test:**
1. Complete enrollment form
2. Verify direct redirect to success page
3. Check enrollment created in database

#### 4.2 Success Page
```
GET /payment/success?enrollmentId=[id]
```
**Checks:**
- [ ] Success message displayed
- [ ] Enrollment ID visible
- [ ] Test Mode indicator shown
- [ ] "Go to Home" button works

#### 4.3 Failure Page
```
GET /payment/failure
```
**Checks:**
- [ ] Failure message displayed
- [ ] "Try Again" button present

---

### Phase 5: API Testing

#### 5.1 Public APIs
```
GET /api/courses                    → List all published courses
GET /api/courses/[slug]             → Single course details
```

#### 5.2 Enrollment API
```
POST /api/enroll
Data: {
  courseId: "[id]",
  studentName: "API Test",
  email: "api@test.com",
  phone: "9998887771",
  collegeName: "Test College",
  branch: "IT",
  semester: "5th",
  rollNumber: "TEST001",
  city: "Test City"
}
```
**Expected:** Creates enrollment with `paymentStatus: "pending"`

#### 5.3 Payment APIs
```
POST /api/payment/initiate
POST /api/payment/verify
```

---

## Error Handling Tests

### 6.1 Invalid Course Slug
```
GET /courses/nonexistent-course
```
**Expected:** 404 or redirect to courses list

### 6.2 Invalid Student ID
```
GET /admin/students/invalid123
```
**Expected:** 404 page or error message

### 6.3 Unauthorized Access
```
GET /admin/dashboard (without login)
```
**Expected:** Redirect to login page

### 6.4 Form Validation
Submit forms with:
- Empty required fields
- Invalid email format
- Phone with letters
- Negative price values

**Expected:** Client-side validation errors displayed

---

## UI/UX Tests

### 7.1 Responsive Design
Test on different viewport sizes:
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1280px width

**Checks:**
- [ ] Navigation collapses on mobile
- [ ] Course cards stack properly
- [ ] Forms remain usable
- [ ] No horizontal scrolling

### 7.2 Theme Toggle
```
GET /
```
**Steps:**
1. Click theme toggle (sun/moon icon)
2. Verify light/dark mode switches

### 7.3 Loading States
**Checks:**
- [ ] Spinner shown during page transitions
- [ ] Loading skeleton during data fetch

### 7.4 Error States
**Checks:**
- [ ] Network error shows retry option
- [ ] 404 pages styled appropriately

---

## Database Verification

After each test that modifies data, verify in MongoDB:

### Collections
- `courses` - Course documents
- `admins` - Admin users
- `enrollments` - Student enrollments

### Sample Queries
```javascript
// Count enrollments by status
db.enrollments.aggregate([
  { $group: { _id: "$paymentStatus", count: { $sum: 1 } } }
])

// Find enrollments for a course
db.enrollments.find({ courseId: ObjectId("...") })

// Calculate revenue
db.enrollments.aggregate([
  { $match: { paymentStatus: "paid" } },
  { $group: { _id: null, total: { $sum: "$paymentAmount" } } }
])
```

---

## Test Summary Checklist

### Must Pass (Critical)
- [ ] Home page loads with courses
- [ ] Course detail pages work
- [ ] Enrollment form completes successfully
- [ ] Payment bypass works in test mode
- [ ] Admin login works
- [ ] Admin dashboard shows correct stats
- [ ] Student list displays all enrollments
- [ ] Course CRUD operations work

### Should Pass (Important)
- [ ] Search and filters work
- [ ] CSV export functions
- [ ] Form validation prevents bad data
- [ ] Mobile responsive design
- [ ] Theme toggle works

### Nice to Pass (Enhancement)
- [ ] Loading states visible
- [ ] Error messages helpful
- [ ] Animations smooth
- [ ] Accessibility good

---

## Running Tests

### Manual Testing
1. Start dev server: `npm run dev`
2. Open browser to `http://localhost:3000`
3. Follow test scenarios above

### API Testing with curl
```bash
# Test public API
curl http://localhost:3000/api/courses

# Test course detail
curl http://localhost:3000/api/courses/industrial-automation-python-iot

# Admin stats (after auth)
curl -b cookies.txt http://localhost:3000/api/admin/stats
```

### Database Inspection
```bash
mongosh mongodb://localhost:27017/d_blank
```

---

## Known Test Data

### Test Student Accounts
| Name | Email | Phone | Course | Status |
|------|-------|-------|--------|--------|
| Rahul Kumar | rahul.kumar@iitd.ac.in | 9876543210 | Industrial Automation | Paid |
| Priya Sharma | priya.sharma@nitm.edu | 9876543211 | PLC Programming | Paid |
| Amit Patel | amit.patel@bits.edu | 9876543212 | CAD/CAM | Paid |
| Sneha Gupta | sneha.gupta@vit.ac.in | 9876543213 | Full Stack | Paid |
| Ananya Roy | ananya.roy@iisc.ac.in | 9876543215 | BIM | Completed |
| Suresh Patel | suresh.patel@guj.in | 9876543220 | Industrial Automation | Pending |
| Neha Singh | neha.singh@pu.ac.in | 9876543221 | PLC Programming | Failed |
| Sunita Verma | sunita.verma@pu.ac.in | 9876543225 | Industrial Automation | Refunded |

---

## Success Criteria

All critical tests must pass for the application to be considered functional. Report any failures with:
1. URL/endpoint tested
2. Expected behavior
3. Actual behavior
4. Steps to reproduce
5. Browser/environment details
