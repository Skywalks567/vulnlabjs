# VulnLabJS: Cross-Site Scripting (XSS) Writeup

This document provides a comprehensive technical walkthrough of the Cross-Site Scripting (XSS) vulnerability lab module in VulnLabJS. It covers the architectural context, root cause analysis, exploitation methodology, and remediation blueprint for both Reflected and Stored XSS vectors.

---

## 1. Laboratory Context

The laboratory simulates a communication relay system ("Mock Message Board") with two primary interactive features:

- **Search Matrix:** A search functionality that echoes the user's query back to the screen.
- **Relay Feed:** A public message board where guest users can submit comments that are stored persistently and displayed to all visitors.

These features map to two distinct XSS attack vectors: Reflected XSS (via the Search Matrix) and Stored XSS (via the Relay Feed).

---

## 2. Vulnerability Analysis

### Root Cause

The vulnerability stems from a critical failure in the data flow pipeline: user input is neither sanitized at the backend upon ingestion nor safely encoded at the frontend during rendering. The application explicitly instructs the browser to parse user-supplied data as raw HTML.

### Vulnerable Code Implementation

**Frontend Failure (React):**

```typescript
// File: src/components/labs/xss/vulnerable/MockMessageBoard.tsx

<p
  dangerouslySetInnerHTML={{ __html: c.content }}
  className="text-[#aaa] leading-relaxed break-all"
/>
// CRITICAL FAILURE: By using dangerouslySetInnerHTML, the application explicitly bypasses React's built-in contextual auto-escaping.
```

**Backend Failure (API):**

```typescript
// File: src/app/api/xss/vulnerable/route.ts
export async function POST(request: Request) {
  // ...
  const newComment = {
    id: comments.length + 1,
    author: author.trim(),
    content: content.trim(),
    // CRITICAL FAILURE: No server-side sanitization applied before storage.
    timestamp: new Date().toISOString(),
  };
  // ...
}
```

Because the frontend uses `dangerouslySetInnerHTML` and the backend blindly trusts the input, any HTML or JavaScript injected by the user is executed in the context of the victim's session.

---

## 3. Exploitation Walkthrough

To exploit this vulnerability in the lab simulator, an attacker can craft payloads that force the browser to execute JavaScript.

### Reflected XSS Vector

1. **Locate the Sink:** Navigate to the "Reflected Vector" tab. The search input reflects data directly to the screen.
2. **Craft Payload:** Because standard `<script>` tags injected via `innerHTML` are often ignored by modern browser DOM parsers, we use an element with an immediate event handler.
3. **Execute:** Submit the following payload into the search input:
   ```html
   <img src="x" onerror="alert('Reflected XSS')" />
   ```
   _Result:_ The browser attempts to load an invalid image source (`x`), fires the `onerror` event, and executes the `alert` function.

### Stored XSS Vector

1. **Locate the Sink:** Navigate to the "Stored Vector" tab. The comment submission form saves data to the backend.
2. **Craft Payload:** We need a payload that executes automatically when any user views the feed. An SVG image with an `onload` handler is highly effective.
3. **Execute:** Submit the following payload as a message packet:
   ```html
   <svg onload="alert('Stored XSS')"></svg>
   ```
   _Result:_ The payload is saved. The next time the message board is loaded (by the attacker or a victim), the SVG renders, firing the `onload` event and executing the script.

---

## 4. Defense-in-Depth Mitigation Blueprint

Securing the application against XSS requires ensuring that user input is never interpreted as active executable content by the browser.

### Strategy A: Safe Framework Rendering (Context-Aware Encoding)

Modern frameworks like React inherently protect against XSS if used correctly. Avoid using `dangerouslySetInnerHTML` or raw DOM injection (`innerHTML`). Instead, rely on the framework's native data binding, which automatically applies context-aware HTML encoding.

```tsx
// Secured Frontend Implementation
<p className="text-[#888] leading-relaxed break-all">{c.content}</p>
// By using curly braces, React automatically converts characters like < and > into &lt; and &gt;, neutralizing the script.
```

### Strategy B: Server-Side Sanitization

Defense-in-depth dictates that the backend should not trust the frontend to render data safely. Input should be sanitized or strictly typed before storage. If HTML formatting is genuinely required, use a robust sanitization library (e.g., DOMPurify) or custom escape functions.

```typescript
// Secured Backend Implementation
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

// Apply sanitization before saving to the database
const newComment = {
  author: sanitizeHtml(author.trim()),
  content: sanitizeHtml(content.trim()),
  // Safely escaped before storage
};
```

### Strategy C: Content Security Policy (CSP)

Implement a robust Content Security Policy via HTTP Response Headers to serve as a final safety net. A strong CSP restricts where scripts can be loaded from and disables the execution of inline scripts (`unsafe-inline`), fundamentally breaking the vectors demonstrated in this lab.

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none';
```
