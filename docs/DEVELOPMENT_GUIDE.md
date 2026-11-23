Written for: anyone setting up this repo locally for the first time.

# Development Guide

## Prerequisites

- Node.js 20+ and npm
- A running PostgreSQL server (local or cloud)

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in real values, see below
npx prisma migrate dev       # applies schema, creates tables
npm run dev                  # starts http://localhost:3000
```

## Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string, e.g. `postgresql://postgres:yourpassword@localhost:5432/vibecode_academy?schema=public` |
| `AUTH_SECRET` | Not currently used by the signing logic (tokens are random + hashed, not signed), reserved for future JWT/signing needs. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `APP_URL` | Base URL used to build links such as the password-reset URL |

`.env.local` is gitignored. Never commit real credentials.

## Creating the first admin account

There is no admin-signup UI by design — admin accounts must be promoted manually to avoid a public privilege-escalation path. After registering a normal account through `/register`, promote it directly in the database:

```bash
psql "$DATABASE_URL" -c "UPDATE users SET role = 'ADMIN' WHERE email = 'you@example.com';"
```

Or via Prisma Studio: `npx prisma studio`, open the `users` table, edit the `role` column.

## Common commands

```bash
npm run dev          # dev server (Turbopack)
npm run build         # production build
npm run start         # run the production build
npm run lint          # ESLint
npx tsc --noEmit      # type-check only
npx prisma studio     # browse the database
```

## Testing the auth flow manually

1. Register at `/register`.
2. Check the server terminal for `[dev] Password reset link for ...` after submitting `/forgot-password` — there is no real email delivery yet.
3. Logout clears the `session_token` cookie; check DevTools Application tab to confirm it's `HttpOnly`.
