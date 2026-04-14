import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { Admin } from '@/models/Admin';

async function seedAdmin() {
  await dbConnect();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.');
    process.exit(1);
  }

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    console.log('Admin already exists:', email);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await Admin.create({
    email,
    passwordHash,
    name: 'Admin',
    createdAt: new Date(),
  });

  console.log('Admin created successfully!');
  console.log('Email:', email);
  console.log('⚠️  Password created using ADMIN_PASSWORD environment variable.');
  console.log('⚠️  Please change the password after first login!');
}

seedAdmin().catch(console.error);
