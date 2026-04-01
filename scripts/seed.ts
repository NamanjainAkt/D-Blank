import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const Course = mongoose.models.Course || mongoose.model('Course', new mongoose.Schema({}, { strict: false }));
const Admin = mongoose.models.Admin || mongoose.model('Admin', new mongoose.Schema({}, { strict: false }));
const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', new mongoose.Schema({}, { strict: false }));

const sampleCourses = [
  {
    title: 'Industrial Automation with Python & IoT',
    slug: 'industrial-automation-python-iot',
    shortDescription: 'Learn Python programming for industrial automation and IoT applications',
    fullDescription: 'This comprehensive course covers Python programming fundamentals, industrial automation concepts, and IoT device integration. Students will work on real-world projects including sensor data collection, automated control systems, and cloud-connected devices.',
    duration: '45 Hours | 6 Weeks',
    schedule: 'Weekdays 7PM–9PM',
    price: 2999,
    originalPrice: 4999,
    category: 'IT & Software',
    tags: ['Python', 'IoT', 'Automation', 'Industry 4.0'],
    totalSeats: 50,
    enrolledCount: 12,
    instructorName: 'Dr. Rahul Sharma',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    isPublished: true,
  },
  {
    title: 'PLC Programming & Industrial Control Systems',
    slug: 'plc-programming-industrial-control',
    shortDescription: 'Master PLC programming and industrial automation with hands-on projects',
    fullDescription: 'Learn Programmable Logic Controllers (PLCs) from basics to advanced programming. Cover ladder logic, function blocks, HMI design, and industrial communication protocols. Includes practical projects with real PLC hardware.',
    duration: '60 Hours | 8 Weeks',
    schedule: 'Weekends 10AM–2PM',
    price: 3499,
    originalPrice: 5999,
    category: 'Electronics',
    tags: ['PLC', 'SCADA', 'HMI', 'Industrial Control'],
    totalSeats: 40,
    enrolledCount: 28,
    instructorName: 'Prof. Anil Kumar',
    meetLink: 'https://meet.google.com/defgh-ijkl',
    isPublished: true,
  },
  {
    title: 'Advanced CAD/CAM & CNC Machining',
    slug: 'cad-cam-cnc-machining',
    shortDescription: 'Design and manufacture with industry-standard CAD/CAM software',
    fullDescription: 'Master computer-aided design and manufacturing with SolidWorks and MasterCAM. Learn CNC programming, toolpath generation, and modern manufacturing techniques. Includes hands-on CNC machine operation.',
    duration: '50 Hours | 7 Weeks',
    schedule: 'Weekdays 6PM–8PM',
    price: 3999,
    originalPrice: 6999,
    category: 'Mechanical',
    tags: ['CAD', 'CAM', 'CNC', 'Manufacturing'],
    totalSeats: 30,
    enrolledCount: 18,
    instructorName: 'Er. Vikram Singh',
    meetLink: 'https://meet.google.com/efghi-jklm',
    isPublished: true,
  },
  {
    title: 'Full Stack Web Development with React',
    slug: 'full-stack-web-development-react',
    shortDescription: 'Build modern web applications with React, Node.js, and MongoDB',
    fullDescription: 'Comprehensive full-stack development course covering React frontend, Node.js backend, MongoDB database, and deployment. Students will build complete web applications throughout the course.',
    duration: '55 Hours | 8 Weeks',
    schedule: 'Weekends 9AM–1PM',
    price: 3999,
    originalPrice: 7999,
    category: 'IT & Software',
    tags: ['React', 'Node.js', 'MongoDB', 'Full Stack'],
    totalSeats: 45,
    enrolledCount: 32,
    instructorName: 'Ms. Priya Patel',
    meetLink: 'https://meet.google.com/fghij-klmno',
    isPublished: true,
  },
  {
    title: 'Building Information Modeling (BIM) with Revit',
    slug: 'building-information-modeling-revit',
    shortDescription: 'Learn BIM methodology and Revit for civil engineering projects',
    fullDescription: 'Master Building Information Modeling using Autodesk Revit. Cover architectural modeling, structural design, MEP systems, and construction documentation. Includes real project exercises.',
    duration: '40 Hours | 5 Weeks',
    schedule: 'Weekdays 5PM–7PM',
    price: 3499,
    originalPrice: 5499,
    category: 'Civil',
    tags: ['BIM', 'Revit', 'Civil Engineering', 'Architecture'],
    totalSeats: 35,
    enrolledCount: 8,
    instructorName: 'Er. Suresh Reddy',
    meetLink: 'https://meet.google.com/ghijk-lmnop',
    isPublished: true,
  },
  {
    title: 'Embedded Systems & Arduino Programming',
    slug: 'embedded-systems-arduino',
    shortDescription: 'Design embedded systems and program microcontrollers with Arduino',
    fullDescription: 'Learn embedded systems fundamentals, microcontroller architecture, and Arduino programming. Build practical projects including home automation, robot control, and sensor interfaces.',
    duration: '35 Hours | 5 Weeks',
    schedule: 'Weekends 2PM–6PM',
    price: 2499,
    originalPrice: 3999,
    category: 'Electronics',
    tags: ['Arduino', 'Embedded Systems', 'Microcontroller', 'Electronics'],
    totalSeats: 40,
    enrolledCount: 22,
    instructorName: 'Dr. Meera Nair',
    meetLink: 'https://meet.google.com/hijkl-mnopq',
    isPublished: true,
  },
];

const sampleEnrollments = [
  { studentName: 'Rahul Kumar', email: 'rahul.kumar@iitd.ac.in', phone: '9876543210', whatsappNumber: '9876543210', collegeName: 'IIT Delhi', branch: 'Computer Science', semester: '6th', rollNumber: 'CS2021067', city: 'Delhi', paymentStatus: 'paid', paymentAmount: 2999, enrollmentStatus: 'confirmed', daysAgo: 5 },
  { studentName: 'Priya Sharma', email: 'priya.sharma@nitm.edu', phone: '9876543211', whatsappNumber: '', collegeName: 'NIT Mumbai', branch: 'Electronics', semester: '5th', rollNumber: 'ECE2021054', city: 'Mumbai', paymentStatus: 'paid', paymentAmount: 3499, enrollmentStatus: 'confirmed', daysAgo: 3 },
  { studentName: 'Amit Patel', email: 'amit.patel@bits.edu', phone: '9876543212', whatsappNumber: '9876543212', collegeName: 'BITS Pilani', branch: 'Mechanical', semester: '7th', rollNumber: 'ME2020042', city: 'Hyderabad', paymentStatus: 'paid', paymentAmount: 3999, enrollmentStatus: 'in_progress', daysAgo: 12 },
  { studentName: 'Sneha Gupta', email: 'sneha.gupta@vit.ac.in', phone: '9876543213', whatsappNumber: '', collegeName: 'VIT Chennai', branch: 'Information Technology', semester: '4th', rollNumber: 'IT2022018', city: 'Chennai', paymentStatus: 'paid', paymentAmount: 3999, enrollmentStatus: 'confirmed', daysAgo: 7 },
  { studentName: 'Vikram Singh', email: 'vikram.singh@iitk.ac.in', phone: '9876543214', whatsappNumber: '9876543214', collegeName: 'IIT Kanpur', branch: 'Electrical', semester: '6th', rollNumber: 'EE2021076', city: 'Kanpur', paymentStatus: 'paid', paymentAmount: 2499, enrollmentStatus: 'confirmed', daysAgo: 2 },
  { studentName: 'Ananya Roy', email: 'ananya.roy@iisc.ac.in', phone: '9876543215', whatsappNumber: '', collegeName: 'IISc Bangalore', branch: 'Civil', semester: '8th', rollNumber: 'CE2019065', city: 'Bangalore', paymentStatus: 'paid', paymentAmount: 3499, enrollmentStatus: 'completed', daysAgo: 45 },
  { studentName: 'Rajesh Kumar', email: 'rajesh.kumar@nitk.edu', phone: '9876543216', whatsappNumber: '9876543216', collegeName: 'NIT Karnataka', branch: 'Computer Science', semester: '5th', rollNumber: 'CS2021102', city: 'Surathkal', paymentStatus: 'paid', paymentAmount: 2999, enrollmentStatus: 'confirmed', daysAgo: 1 },
  { studentName: 'Meera Joshi', email: 'meera.joshi@iitb.ac.in', phone: '9876543217', whatsappNumber: '', collegeName: 'IIT Bombay', branch: 'Electronics', semester: '6th', rollNumber: 'EE2021089', city: 'Mumbai', paymentStatus: 'paid', paymentAmount: 3499, enrollmentStatus: 'in_progress', daysAgo: 15 },
  { studentName: 'Arjun Nair', email: 'arjun.nair@iitm.ac.in', phone: '9876543218', whatsappNumber: '9876543218', collegeName: 'IIT Madras', branch: 'Mechanical', semester: '4th', rollNumber: 'ME2022034', city: 'Chennai', paymentStatus: 'paid', paymentAmount: 3999, enrollmentStatus: 'confirmed', daysAgo: 8 },
  { studentName: 'Kavitha Reddy', email: 'kavitha.reddy@nit.edu', phone: '9876543219', whatsappNumber: '', collegeName: 'NIT Warangal', branch: 'IT', semester: '7th', rollNumber: 'IT2020032', city: 'Warangal', paymentStatus: 'paid', paymentAmount: 3999, enrollmentStatus: 'confirmed', daysAgo: 6 },
  { studentName: 'Suresh Patel', email: 'suresh.patel@guj.in', phone: '9876543220', whatsappNumber: '9876543220', collegeName: 'Gujarat University', branch: 'Computer Science', semester: '5th', rollNumber: 'CS2021087', city: 'Ahmedabad', paymentStatus: 'pending', paymentAmount: 2999, enrollmentStatus: 'pending', daysAgo: 1 },
  { studentName: 'Neha Singh', email: 'neha.singh@pu.ac.in', phone: '9876543221', whatsappNumber: '', collegeName: 'Punjab University', branch: 'Electronics', semester: '6th', rollNumber: 'EC2021076', city: 'Chandigarh', paymentStatus: 'failed', paymentAmount: 3499, enrollmentStatus: 'pending', daysAgo: 3 },
  { studentName: 'Arun Kumar', email: 'arun.kumar@jnu.ac.in', phone: '9876543222', whatsappNumber: '9876543222', collegeName: 'JNU Delhi', branch: 'Electrical', semester: '8th', rollNumber: 'EE2019067', city: 'Delhi', paymentStatus: 'paid', paymentAmount: 2499, enrollmentStatus: 'completed', daysAgo: 60 },
  { studentName: 'Lakshmi Devi', email: 'lakshmi.devi@annauniv.edu', phone: '9876543223', whatsappNumber: '', collegeName: 'Anna University', branch: 'Civil', semester: '5th', rollNumber: 'CE2021034', city: 'Chennai', paymentStatus: 'paid', paymentAmount: 3499, enrollmentStatus: 'in_progress', daysAgo: 20 },
  { studentName: 'Pradeep Yadav', email: 'pradeep.yadav@du.ac.in', phone: '9876543224', whatsappNumber: '9876543224', collegeName: 'Delhi University', branch: 'Mechanical', semester: '4th', rollNumber: 'ME2022012', city: 'Delhi', paymentStatus: 'paid', paymentAmount: 3999, enrollmentStatus: 'confirmed', daysAgo: 4 },
  { studentName: 'Sunita Verma', email: 'sunita.verma@pu.ac.in', phone: '9876543225', whatsappNumber: '', collegeName: 'Pune University', branch: 'IT', semester: '6th', rollNumber: 'IT2021065', city: 'Pune', paymentStatus: 'refunded', paymentAmount: 2999, enrollmentStatus: 'cancelled', daysAgo: 10 },
  { studentName: 'Deepak Rao', email: 'deepak.rao@iitg.ac.in', phone: '9876543226', whatsappNumber: '9876543226', collegeName: 'IIT Guwahati', branch: 'Computer Science', semester: '5th', rollNumber: 'CS2021098', city: 'Guwahati', paymentStatus: 'paid', paymentAmount: 2999, enrollmentStatus: 'confirmed', daysAgo: 9 },
  { studentName: 'Pooja Mehta', email: 'pooja.mehta@coledu.in', phone: '9876543227', whatsappNumber: '', collegeName: 'College of Engineering', branch: 'Electronics', semester: '7th', rollNumber: 'EC2020054', city: 'Pune', paymentStatus: 'paid', paymentAmount: 3499, enrollmentStatus: 'in_progress', daysAgo: 25 },
  { studentName: 'Ravi Shankar', email: 'ravi.shankar@nitc.ac.in', phone: '9876543228', whatsappNumber: '9876543228', collegeName: 'NIT Calicut', branch: 'Mechanical', semester: '6th', rollNumber: 'ME2021078', city: 'Kozhikode', paymentStatus: 'paid', paymentAmount: 3999, enrollmentStatus: 'confirmed', daysAgo: 11 },
  { studentName: 'Gopal Krishnan', email: 'gopal.krishnan@vtu.ac.in', phone: '9876543229', whatsappNumber: '', collegeName: 'VTU Belgaum', branch: 'Civil', semester: '8th', rollNumber: 'CE2019045', city: 'Belgaum', paymentStatus: 'paid', paymentAmount: 3499, enrollmentStatus: 'completed', daysAgo: 55 },
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Admin.deleteMany({});
    await Enrollment.deleteMany({});
    console.log('Cleared existing data');

    // Create courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`Created ${sampleCourses.length} courses`);

    // Create admin user
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@dblanks.in',
      passwordHash,
      name: 'Admin',
    });
    console.log('Created admin user');

    // Create enrollments with course references
    const courseIds = {
      'industrial-automation-python-iot': courses[0]._id,
      'plc-programming-industrial-control': courses[1]._id,
      'cad-cam-cnc-machining': courses[2]._id,
      'full-stack-web-development-react': courses[3]._id,
      'building-information-modeling-revit': courses[4]._id,
      'embedded-systems-arduino': courses[5]._id,
    };

    const courseNameMap: Record<string, string> = {};
    sampleCourses.forEach((c, i) => {
      courseNameMap[c.slug] = c.title;
    });

    const enrollmentsToInsert = sampleEnrollments.map((e) => ({
      ...e,
      courseId: courseIds[sampleEnrollments.indexOf(e) % 6 === 0 ? 'industrial-automation-python-iot' : sampleEnrollments.indexOf(e) % 6 === 1 ? 'plc-programming-industrial-control' : sampleEnrollments.indexOf(e) % 6 === 2 ? 'cad-cam-cnc-machining' : sampleEnrollments.indexOf(e) % 6 === 3 ? 'full-stack-web-development-react' : sampleEnrollments.indexOf(e) % 6 === 4 ? 'building-information-modeling-revit' : 'embedded-systems-arduino'],
      courseName: courseNameMap[sampleEnrollments.indexOf(e) % 6 === 0 ? 'industrial-automation-python-iot' : sampleEnrollments.indexOf(e) % 6 === 1 ? 'plc-programming-industrial-control' : sampleEnrollments.indexOf(e) % 6 === 2 ? 'cad-cam-cnc-machining' : sampleEnrollments.indexOf(e) % 6 === 3 ? 'full-stack-web-development-react' : sampleEnrollments.indexOf(e) % 6 === 4 ? 'building-information-modeling-revit' : 'embedded-systems-arduino'],
      paymentDate: e.paymentStatus === 'pending' || e.paymentStatus === 'failed' || e.enrollmentStatus === 'pending' || e.enrollmentStatus === 'cancelled' ? undefined : new Date(Date.now() - e.daysAgo * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - e.daysAgo * 24 * 60 * 60 * 1000),
    }));

    // Distribute enrollments across courses
    const distributedEnrollments = sampleEnrollments.map((e, i) => {
      const slug = sampleCourses[i % 6].slug;
      const courseIndex = i % 6;
      return {
        ...e,
        courseId: courses[courseIndex]._id,
        courseName: courseNameMap[slug],
        paymentDate: e.paymentStatus === 'paid' ? new Date(Date.now() - e.daysAgo * 24 * 60 * 60 * 1000) : undefined,
        createdAt: new Date(Date.now() - e.daysAgo * 24 * 60 * 60 * 1000),
      };
    });

    await Enrollment.insertMany(distributedEnrollments);
    console.log(`Created ${distributedEnrollments.length} enrollments`);

    console.log('\n✅ Seed completed successfully!');
    console.log(`   - Courses: ${sampleCourses.length}`);
    console.log(`   - Enrollments: ${distributedEnrollments.length}`);
    console.log(`   - Admin: ${process.env.ADMIN_EMAIL || 'admin@dblanks.in'}`);
    console.log(`   - Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
