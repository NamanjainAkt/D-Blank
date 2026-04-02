import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { Admin } from '@/models/Admin';

async function seedAdmin() {
  await dbConnect();

  const email = process.env.ADMIN_EMAIL || 'admin@dblanks.in';
  const password = process.env.ADMIN_PASSWORD || 'Dblanks@2024';

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
  console.log('Password:', password);
  console.log('⚠️  Please change the password after first login!');
}

seedAdmin().catch(console.error);
