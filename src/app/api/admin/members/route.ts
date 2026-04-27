import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Member } from '@/models/Member';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const members = await Member.find().sort({ createdAt: -1 });

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const data = await request.json();

    const existing = await Member.findOne({ handle: data.handle });
    if (existing) {
      return NextResponse.json({ error: 'Member with this handle already exists' }, { status: 400 });
    }

    const member = await Member.create(data);
    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    console.error('Error creating member:', error);
    return NextResponse.json({ error: error.message || 'Failed to create member' }, { status: 500 });
  }
}