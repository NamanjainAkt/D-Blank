import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import { Student } from '@/models/Student';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const semester = searchParams.get('semester') || '';
    const college = searchParams.get('college') || '';

    let query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { collegeName: { $regex: search, $options: 'i' } },
      ];
    }

    if (semester && semester !== 'all') {
      query.semester = semester;
    }

    if (college && college !== 'all') {
      if (college.toLowerCase() === 'others' || college.toLowerCase() === 'other') {
        query.collegeName = { $not: { $regex: /bit/i } };
      } else {
        query.collegeName = { $regex: college, $options: 'i' };
      }
    }

    const students = await Student.find(query).sort({ createdAt: -1 });

    const headers = [
      'Name',
      'Email',
      'Phone',
      'WhatsApp',
      'College',
      'Branch',
      'Year',
      'Semester',
      'Roll Number',
      'City',
      'Referrer',
      'Created At',
    ];

    const rows = students.map((s: any) => [
      s.name,
      s.email,
      s.phone,
      s.whatsappNumber || '',
      s.collegeName,
      s.branch,
      s.year,
      s.semester,
      s.rollNumber,
      s.city,
      s.referrer || '',
      new Date(s.createdAt).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(',')),
    ].join('\n');

    const timestamp = Date.now();

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="students-${timestamp}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting students:', error);
    return NextResponse.json({ error: 'Failed to export students' }, { status: 500 });
  }
}
