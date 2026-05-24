import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value || 'user';

  // Vulnerable logic: blindly trusts the client-provided role cookie without session checks
  if (role.toLowerCase() === 'admin') {
    return NextResponse.json({
      status: 'COMPROMISED',
      usersCount: 3,
      flag: 'CTF{broken_access_control_escalation}',
      logs: [
        '[SEC] Access control bypassed via browser devtools cookie tampering.',
        '[DB] Admin connection active.',
        '[SYS] Core administrative vault unlocked.',
      ],
    });
  }

  return NextResponse.json(
    { error: 'Forbidden: Administrative privilege required.' },
    { status: 403 },
  );
}
