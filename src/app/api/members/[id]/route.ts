import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Member } from '@/models/Member';
import { memberUpdateSchema } from '@/lib/validations';

// GET /api/members/[id] - Get single member
// PUT /api/members/[id] - Update member
// DELETE /api/members/[id] - Delete member
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const member = await Member.findById(id);

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({ member });
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const result = memberUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    // Check handle uniqueness if updating handle
    if (result.data.handle) {
      const existing = await Member.findOne({
        handle: result.data.handle,
        _id: { $ne: id },
      });
      if (existing) {
        return NextResponse.json(
          { error: 'Handle already exists' },
          { status: 400 }
        );
      }
    }

    const member = await Member.findByIdAndUpdate(
      id,
      { ...result.data, updatedAt: new Date() },
      { new: true }
    );

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({ member });
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
  }
}