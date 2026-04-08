import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Member } from '@/models/Member';

// PATCH /api/members/[id]/status - Toggle member status (active/inactive)
export async function PATCH(
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

    // Toggle status
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { status: newStatus, updatedAt: new Date() },
      { new: true }
    );

    return NextResponse.json({ member: updatedMember });
  } catch (error) {
    console.error('Error toggling member status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}