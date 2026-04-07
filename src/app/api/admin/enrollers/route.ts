import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Enroller } from '@/models/Enroller';
import { Enrollment } from '@/models/Enrollment';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    let query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { collegeName: { $regex: search, $options: 'i' } },
      ];
    }

    const enrollers = await Enroller.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ enrollers });
  } catch (error) {
    console.error('Error fetching enrollers:', error);
    return NextResponse.json({ error: 'Failed to fetch enrollers' }, { status: 500 });
  }
}
