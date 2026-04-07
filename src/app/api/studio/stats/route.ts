import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enrollment } from '@/models/Enrollment';
import { Enroller } from '@/models/Enroller';
import { Game } from '@/models/Game';

export async function GET() {
  try {
    await dbConnect();

    // Total games (published)
    const totalGames = await Game.countDocuments({ isPublished: true });

    // Featured games count
    const featuredGames = await Game.countDocuments({ 
      isFeatured: true, 
      isPublished: true 
    });

    // Total enrollments (paid)
    const totalEnrollments = await Enrollment.countDocuments({
      paymentStatus: 'paid'
    });

    // Total enrollers (students who enrolled in courses)
    const totalEnrollers = await Enroller.countDocuments();

    return NextResponse.json({
      totalGames,
      featuredGames,
      totalEnrollments,
      totalEnrollers
    });
  } catch (error) {
    console.error('Error fetching studio stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch studio stats' },
      { status: 500 }
    );
  }
}
