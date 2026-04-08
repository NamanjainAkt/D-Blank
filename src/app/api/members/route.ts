import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Member } from '@/models/Member';
import { memberSchema } from '@/lib/validations';

// GET /api/members - List all members with optional filters
export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const members = await Member.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
  }
}

// POST /api/members - Create new member
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const result = memberSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Check for duplicate handle
    const existingMember = await Member.findOne({ handle: result.data.handle });
    if (existingMember) {
      return NextResponse.json(
        { error: 'Handle already exists' },
        { status: 400 }
      );
    }

    const member = await Member.create(result.data);

    return NextResponse.json({ member }, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
  }
}