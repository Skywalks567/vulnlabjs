import { NextResponse } from 'next/server';

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
    content: 'Security audit completed. Input is now sanitized.',
    timestamp: '2026-05-27T12:05:00Z',
  },
];

function sanitizeHtml(str: string) {
  return str.replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
      default:
        return m;
    }
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';

  // FIXED: Sanitize search query
  const safeSearch = sanitizeHtml(search);

  return NextResponse.json({
    status: 'SUCCESS',
    search: safeSearch,
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
      author: sanitizeHtml(author.trim()),
      content: sanitizeHtml(content.trim()), // FIXED: Added server-side sanitization
      timestamp: new Date().toISOString(),
    };

    comments.push(newComment);
    return NextResponse.json({ status: 'SUCCESS', comment: newComment });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 500 });
  }
}
