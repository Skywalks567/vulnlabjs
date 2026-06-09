[← Back](../../README.md)

# VulnLabJS: Insecure Direct Object Reference (IDOR) Writeup

This document provides a comprehensive technical walkthrough of the Insecure Direct Object Reference (IDOR) vulnerability lab module in VulnLabJS. It covers the architectural context, root cause analysis, exploitation methodology, and remediation blueprint.

---

## 1. Laboratory Context

The laboratory simulates a multi-tenant personal notes application. The environment seeds three users:

- **Admin** (User ID: 1) — Holds sensitive database schema and system architecture notes.
- **Alice** (User ID: 2) — The authenticated user session simulated in the interface.
- **Bob** (User ID: 3) — An external user holding secret authentication tokens and credentials.

---

## 2. Vulnerability Analysis

### Root Cause

The vulnerability exists within the backend API route responsible for fetching individual note records. The server accepts an arbitrary integer identifier directly from the client-controlled request URL query parameter (`?id=X`). It queries the database using this identifier without validating whether the requesting user owns the record.

### Vulnerable Code Implementation

```typescript
// File: src/app/api/idor/vulnerable/route.ts
const { searchParams } = new URL(request.url);
const id = parseInt(searchParams.get('id') || '', 10);

const note = await prisma.labNote.findUnique({
  where: { id },
});

// CRITICAL FAILURE: Bypasses session verification and ownership validation.
return NextResponse.json({ note });
```

Because the application trusts client-supplied query parameters blindly, an authenticated user (Alice) can view resources belonging to any other user simply by guessing or modifying the numeric identifier.

---

## 3. Exploitation Walkthrough

To exploit this vulnerability in the lab simulator or via direct API interaction:

1. **Observe Default Behavior**: When loading the target, the simulator authenticates as **Alice** and retrieves her personal note via `?id=2`.
2. **Perform Parameter Tampering**: Intercept or modify the request parameter in the query interface or browser address bar. Change the query from `?id=2` to:
   - `?id=1` to query the Administrator's record.
   - `?id=3` to query Bob's record.
3. **Analyze Leaked Information**: The server returns the requested records along with their owner metadata.
   - **ID 1 (Admin)**: Leaks confidential internal system architecture schematics.
   - **ID 3 (Bob)**: Leaks secret access credentials and authentication tokens.

---

## 4. Defense-in-Depth Mitigation Blueprint

Securing the application against IDOR requires a multi-layered verification strategy on the server side.

### Strategy A: Strict Server-Side Ownership Verification

Always validate that the authenticated session identifier matches the owner field of the requested database record before returning any data.

```typescript
// Fetch the record from the database
const note = await prisma.labNote.findUnique({
  where: { id },
});

if (!note) {
  return NextResponse.json({ error: 'Note not found' }, { status: 44 });
}

// Enforce strict access control checking
if (note.ownerId !== sessionUserId) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

### Strategy B: Cryptographic Sessions

Never rely on client-supplied headers (e.g., `X-User-Id`) for identity verification. Manage user identity server-side using cryptographically signed, HTTP-only session cookies or secure JSON Web Tokens (JWT).

### Strategy C: Non-Enumerable Identifiers (UUID v4)

Replace sequential integer keys (`1`, `2`, `3`) with universally unique identifiers (UUID v4). This makes it computationally impossible for attackers to discover other records via simple parameter incrementing or brute-force crawling.

```prisma
// Example Prisma schema update
model LabNote {
  id      String @id @default(uuid())
  title   String
  content String
  ownerId Int
}
```
