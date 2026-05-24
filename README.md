# VulnLabJS — Interactive Web Security Learning Lab

[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS Version](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Prisma Version](https://img.shields.io/badge/Prisma-v7.8.0-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Security Lab](https://img.shields.io/badge/Security-OWASP_Top_10-red?style=for-the-badge)](https://owasp.org)

**VulnLabJS** is an interactive web security learning platform (hands-on security lab) built on **Next.js (App Router)**, **Prisma 7 (with Postgres driver adapter)**, and **Supabase**. This project is specifically designed for developers, students, and security analysts to understand how classic security vulnerabilities (OWASP Top 10) occur in code and how to remediate them.

---

## Labs Roadmap & Topics

This project is designed to simulate real-world vulnerability scenarios across 7 main lab modules:

| Lab Module                                  |  Difficulty  | Focus Area / Description                                                                              | Status / Documentation                               |
| :------------------------------------------ | :----------: | :---------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| **IDOR (Insecure Direct Object Reference)** |   Beginner   | Exploit sensitive data of other users by manipulating predictable object ID parameters.               | Completed ([Writeup](docs/writeups/IDOR.md))         |
| **SQL Injection**                           |   Beginner   | Manipulate relational database queries due to a lack of server-side input sanitization.               | Coming Soon                                          |
| **Cross-Site Scripting (XSS)**              |   Beginner   | Inject malicious JavaScript (Reflected & Stored) to be executed in the victim's browser.              | On Progress                                          |
| **Broken Access Control**                   | Intermediate | Bypass authorization checks, manipulate user roles (role bypass), and bypass administrative controls. | Completed ([Writeup](docs/writeups/BrokenAccess.md)) |
| **Insecure File Upload**                    | Intermediate | Achieve Remote Code Execution (RCE) by uploading malicious files without MIME/extension validation.   | Coming Soon                                          |
| **JWT Misconfiguration**                    | Intermediate | Forge identity tokens due to weak secret keys or missing signature verification.                      | Coming Soon                                          |
| **SSRF Simulation**                         | Intermediate | Exploit the backend server to make unauthorized requests to internal networks/simulated services.     | Coming Soon                                          |

---

## Tech Stack & Architecture

- **Framework:** Next.js 16 (React 19, App Router)
- **Styling:** Tailwind CSS v4 & PostCSS
- **ORM:** Prisma ORM v7 (Modular Client Generation)
- **Database:** Supabase (PostgreSQL)
- **Driver Adapter:** `@prisma/adapter-pg` & `pg` (Node Postgres)
- **Runtime Compiler:** `tsx` & TypeScript

---

## Setup & Installation Guide

Follow the steps below to run the lab in your local environment:

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org) (v20 or higher)
- A [Supabase](https://supabase.com) account (for a free cloud PostgreSQL database)

### 2. Clone the Repository

```bash
git clone https://github.com/Skywalks567/vulnlabjs.git
cd vulnlabjs
```

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env` and input your Supabase database credentials:

```bash
cp .env.example .env
```

Configure your `.env` file with your Supabase credentials:

- `DATABASE_URL`: Uses the pooling connection on port `6543` with the `?pgbouncer=true` parameter (for application runtime).
- `DIRECT_URL`: Uses the direct PostgreSQL connection on port `5432` (for migrations/CLI).
- `JWT_SECRET`: A secure random string for JWT signing.

```env
DATABASE_URL="postgresql://postgres.yourdb:yourpassword@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.yourdb:yourpassword@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
JWT_SECRET="replace-with-a-strong-secret-key"
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Sync Database Schema to Supabase

Use the Prisma CLI to apply the full table schema (`LabUser`, `LabNote`, `LabProduct`) directly to your Supabase database:

```bash
npx prisma db push
```

### 6. Seed the Database

Run the seed script to load mock user accounts (such as `admin`, `alice`, and `bob`) and initial product data into your Supabase database:

```bash
npm run prisma:seed
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start exploring VulnLabJS!

---

## Security Disclaimer & Warning

> [!WARNING]
> **THIS PROJECT IS INTENTIONALLY CONFIGURED WITH SECURITY VULNERABILITIES.**
>
> - Do not deploy this application to public servers, open VPS hosting, or production environments.
> - Use this project only in a local environment (`localhost`) for educational and web security training purposes.
> - The developer is not responsible for any misuse of code or damage caused by using this repository outside of official learning purposes.

---
