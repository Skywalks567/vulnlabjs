[← Back](../../README.md)

# VulnLabJS: Broken Access Control (Vertical Privilege Escalation) Writeup

This document provides a comprehensive technical walkthrough of the Broken Access Control (Vertical Privilege Escalation) vulnerability lab module in VulnLabJS. It covers the architectural context, root cause analysis, exploitation methodology, and remediation blueprint.

---

## 1. Laboratory Context

The laboratory simulates an administrative dashboard within an enterprise system. The environment seeds the following user contexts:

- **Alice** (User ID: 2, Role: user) — The low-privileged authenticated user simulated in the interface.
- **Administrator** (User ID: 1, Role: admin) — The high-privileged administrative context with access to restricted operational nodes and systems.

By default, standard users (such as Alice) can only view their user profile and simulated Gateway Telemetry stats. Accessing the administrative console requires a role verification check by the backend server.

---

## 2. Vulnerability Analysis

### Root Cause

The vulnerability exists in the lack of robust server-side role validation. Instead of verifying the active user session against a server-managed privilege store (such as the database), the backend API blindly extracts a client-controlled cookie parameter (`role`) to determine access.

### Vulnerable Code Implementation

```typescript
// File: src/app/api/broken-access/vulnerable/route.ts
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
```

Since the HTTP client can manipulate and submit any cookies along with their requests, the server-side authorization check can be completely bypassed by injecting the `role=admin` cookie.

---

## 3. Exploitation Walkthrough

To exploit this vulnerability using real-world browser tools:

1. **Observe Default Behavior**: When loading the vulnerable target, you are authenticated as Alice. The Administrative Panel card displays a "Locked" status, and attempts to access the administration section fail with an "Unauthorized" status code.
2. **Open Browser Developer Tools**: Press `F12` or right-click and select `Inspect` to open the Developer Tools.
3. **Navigate to Cookie Storage**:
   - On Chrome, Edge, and other Chromium browsers: Select the **Application** tab, expand **Cookies** in the left sidebar, and select the target host URL.
   - On Firefox: Select the **Storage** tab, expand **Cookies** in the left sidebar, and select the target host URL.
4. **Inject Cookie Parameter**:
   - Double-click the empty row under the cookie table to add a new cookie.
   - Set the cookie Name to `role`.
   - Set the cookie Value to `admin`.
5. **Re-evaluate Authorization**: Return to the simulated web interface and click the **🔄 REFRESH** button. The frontend fetches the database state again with the newly injected cookie, granting access to the administrative logs and returning the administrative capture flag.

---

## 4. Defense-in-Depth Mitigation Blueprint

Securing the application against vertical privilege escalation requires shifting authority over user privileges from the client side to the server side.

### Strategy A: Database-Backed Server-Side Validation

Always validate user privileges by querying the database using a cryptographically signed, secure user identifier from the active session.

```typescript
// Secure validation matching src/app/api/broken-access/fixed/route.ts
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
        flag: 'CTF{broken_access_control_escalation}',
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
```

### Strategy B: Secure and Restrictive Cookie Attributes

Configure session cookies with attributes that minimize client-side exposure:

- **HttpOnly**: Restricts cookie access strictly to HTTP requests, preventing browser JavaScript (and potentially malicious XSS scripts) from reading or tampering with the cookie.
- **Secure**: Ensures the cookie is only transmitted over encrypted HTTPS connections.
- **SameSite=Strict**: Instructs the browser to only send cookies on same-site requests, mitigating Cross-Site Request Forgery (CSRF).
