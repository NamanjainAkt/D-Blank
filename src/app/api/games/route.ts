import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Game } from '@/models/Game';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const featured = searchParams.get('featured');
    const platform = searchParams.get('platform');
    const limit = parseInt(searchParams.get('limit') || '0');

    let query: any = { isPublished: true };

    if (genre && genre !== 'All') {
      query.genre = genre;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (platform && platform !== 'All') {
      query.platforms = { $in: [platform] };
    }

    let dbQuery = Game.find(query).sort({ createdAt: -1 });
    
    if (limit > 0) {
      dbQuery = dbQuery.limit(limit);
    }

    const games = await dbQuery;

    return NextResponse.json({ games });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}
