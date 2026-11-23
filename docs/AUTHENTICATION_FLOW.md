Written for: developers maintaining or extending the auth system.

# Authentication Flow

Custom session-cookie auth, no third-party auth library. Core logic lives in [src/lib/auth/](../src/lib/auth/).

## How a session works

1. `createSession(userId)` ([session.ts](../src/lib/auth/session.ts)) generates a random 32-byte token, stores its SHA-256 hash in the `sessions` table, and sets it as an HttpOnly, `SameSite=Lax` cookie (`Secure` in production) named `session_token`. Expiry: 30 days.
2. `getCurrentUser()` reads the cookie, hashes it, looks up the matching `Session` row, and returns the associated `User` — or `null` if missing/expired. Expired sessions are deleted on read.
3. `destroyCurrentSession()` deletes the session row and clears the cookie (used by logout).
4. `destroyAllUserSessions(userId)` wipes every session for a user — called after a password reset so old logins stop working immediately.

The raw token never touches the database; only its hash does. This matches the `PasswordResetToken` pattern.

## Password handling

[password.ts](../src/lib/auth/password.ts) wraps `@node-rs/argon2` (Argon2id). Plaintext passwords are never logged or stored.

## Flows

- **Register** ([actions.ts](../src/lib/auth/actions.ts) `registerAction`): validates with Zod, checks for an existing email, hashes the password, creates the user, starts a session, redirects by role.
- **Login** (`loginAction`): rate-limited per IP+email (5 attempts / 15 min via [rate-limit.ts](../src/lib/auth/rate-limit.ts)), returns one generic error for both "no such user" and "wrong password" to avoid leaking which case occurred.
- **Forgot password** (`forgotPasswordAction`): always returns the same success response whether or not the email exists, to prevent account enumeration. In development, the reset link is printed to the server terminal. In production, no email is sent yet — see below.
- **Reset password** (`resetPasswordAction`): validates the token hash exists, is unexpired, and unused; updates the password hash, marks the token used, and revokes all existing sessions for that user.
- **Logout** (`logoutAction`): destroys the current session and redirects to `/login`.

## Production email gap

There is no real email provider wired up. `forgotPasswordAction` logs a warning and does not pretend to send anything. Before relying on this flow in production, add an adapter (Resend, SES, Postmark, etc.) in place of the `console.warn` call in `actions.ts`.

## Rate limiting caveat

[rate-limit.ts](../src/lib/auth/rate-limit.ts) is in-memory and per-process. It resets on deploy/restart and does not coordinate across multiple server instances. Replace with a Redis-backed limiter before scaling horizontally.
