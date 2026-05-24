import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  // SECURE DEFENSE: In a real app, retrieve the session user ID from a cryptographically signed cookie/JWT token.
  // Here, we simulate validating Alice's session (ID: 2) directly against the database record.
  const sessionUserId = 2;

  try {
    const user = await prisma.labUser.findUnique({
      where: { id: sessionUserId },
      select: { role: true },
    });

    // Validates actual database-backed role instead of client-supplied cookie role parameter
    if (user && user.role.toLowerCase() === 'admin') {
      return NextResponse.json({
        status: 'SECURED',
        usersCount: 3,
        flag: 'CTF{broken_access_control_escalation_impossible}',
      });
    }
  } catch (err) {
    console.error('Database session check failed:', err);
  }

  // Safe fallback: deny administrative access
  return NextResponse.json(
    { error: 'Forbidden: Administrative privilege required.' },
    { status: 403 },
  );
}
