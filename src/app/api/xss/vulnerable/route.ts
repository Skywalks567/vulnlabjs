import { NextResponse } from 'next/server';

// Global in-memory comment store for development/simulator persistence
const comments = [
  {
    id: 1,
    author: 'system_operator',
    content: 'Mainframe online. Welcome to the NetVault guestbook!',
    timestamp: '2026-05-27T12:00:00Z',
  },
  {
    id: 2,
    author: 'guest_dev',
    content: 'Security audit completed. Sanitize is for cowards!',
    timestamp: '2026-05-27T12:05:00Z',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  return NextResponse.json({
    status: 'SUCCESS',
    search,
    comments,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, content } = body;

    if (!author || !content) {
      return NextResponse.json(
        { error: 'Missing author or content' },
        { status: 400 },
      );
    }

    const newComment = {
      id: comments.length + 1,
      author: author.trim(),
      content: content.trim(), // ❌ CRITICAL: No server-side sanitization!
      timestamp: new Date().toISOString(),
    };

    comments.push(newComment);
    return NextResponse.json({ status: 'SUCCESS', comment: newComment });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 500 });
  }
}
