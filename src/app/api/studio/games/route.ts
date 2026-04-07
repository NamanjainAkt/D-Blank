import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Game } from '@/models/Game';

export async function GET() {
  try {
    await dbConnect();

    // Fetch featured games sorted by rating (descending)
    const featuredGames = await Game.find({ 
      isFeatured: true, 
      isPublished: true 
    })
      .sort({ rating: -1 })
      .limit(6)
      .select('title slug genre shortDescription thumbnailUrl rating platforms');

    return NextResponse.json(featuredGames);
  } catch (error) {
    console.error('Error fetching featured games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured games' },
      { status: 500 }
    );
  }
}
