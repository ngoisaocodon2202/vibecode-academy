Written for: developers onboarding onto this repo's database layer.

# Database Schema

PostgreSQL via Prisma ORM. Schema source of truth: [prisma/schema.prisma](../prisma/schema.prisma).

## Models

| Model | Purpose |
|---|---|
| `User` | Account record. `role` is `STUDENT \| INSTRUCTOR \| ADMIN`. `passwordHash` is Argon2id, never plaintext. |
| `Session` | One row per active login. `tokenHash` is SHA-256 of the raw cookie value; the raw value is never stored. |
| `PasswordResetToken` | One row per reset request. Same hash-only pattern as `Session`. `usedAt` prevents reuse, `expiresAt` enforces a 1-hour window. |
| `Category` | Course taxonomy. |
| `Course` | Top-level course. `status` is `DRAFT \| PUBLISHED \| ARCHIVED`. |
| `CourseModule` | Groups lessons within a course, ordered by `position`. |
| `Lesson` | Individual lesson; `slug` is unique per module. |
| `Enrollment` | Links a `User` to a `Course`; unique on `(userId, courseId)`. |
| `LessonProgress` | Per-user, per-lesson completion/position tracking; unique on `(userId, lessonId)`. |

## Running migrations

```bash
npx prisma migrate dev --name <description>   # create + apply a new migration
npx prisma generate                             # regenerate the client only
npx prisma studio                               # browse data in a GUI
```

Migrations live in `prisma/migrations/` and are applied in order. Never edit an already-applied migration file — create a new one instead.

## Connection

`DATABASE_URL` is read from `.env.local` (not committed). See [.env.example](../.env.example) for the expected format. `prisma.config.ts` loads `.env.local` explicitly.
