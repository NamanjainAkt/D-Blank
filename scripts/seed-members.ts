import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { founders, teamMembers } from '@/lib/placeholder-data';

dotenv.config({ path: '.env.local' });

// Import models to register them with mongoose
import '@/models/Member';

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not found in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const Member = mongoose.models.Member;

    // Clear existing members
    await Member.deleteMany({});
    console.log('Cleared existing members');

    // Transform founders from placeholder data
    const founderDocs = founders.map((f) => ({
      name: f.name,
      designation: f.role,
      bio: f.bio,
      skills: f.skills,
      image: f.image,
      handle: f.name.toLowerCase().replace(/\s+/g, '_'),
      type: 'founder' as const,
      status: 'active' as const,
      socials: f.socials || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Transform team members from placeholder data
    const teamDocs = teamMembers.map((t) => ({
      name: t.name,
      designation: t.role,
      bio: t.bio,
      skills: t.skills,
      image: '', // No image for team members in placeholder data
      handle: t.handle,
      type: 'team' as const,
      status: 'active' as const,
      socials: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Insert all members
    const allMembers = [...founderDocs, ...teamDocs];
    await Member.insertMany(allMembers);

    console.log('\n✅ Seed completed successfully!');
    console.log(`   - Founders: ${founderDocs.length}`);
    console.log(`   - Team Members: ${teamDocs.length}`);
    console.log(`   - Total: ${allMembers.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding members:', error);
    process.exit(1);
  }
}

seed();
