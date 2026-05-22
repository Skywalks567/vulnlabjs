import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');

    if (!idParam) {
      return NextResponse.json(
        { error: 'Missing "id" parameter.' },
        { status: 400 },
      );
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid "id" parameter.' },
        { status: 400 },
      );
    }

    const currentUserId = parseInt(request.headers.get('X-user-id') || '0', 10);

    // FIXED: Check if the current user has access to the note!
    const note = await prisma.labNote.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!note) {
      return NextResponse.json({ error: 'Note not found.' }, { status: 404 });
    }

    // FIXED: Check if the current user has access to the note!
    if (note.ownerId !== currentUserId) {
      return NextResponse.json(
        { error: 'Unauthorized to view this note.' },
        { status: 403 },
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to retrieve note.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
