# VibeCode Academy

Nền tảng đào tạo AI và Vibe Coding — "Learn AI. Build Anything."

Stack: Next.js (App Router) · TypeScript · Tailwind CSS v4 · PostgreSQL · Prisma · Zod · React Hook Form.

## Chạy project

```bash
npm install
cp .env.example .env.local   # điền DATABASE_URL thật
npx prisma migrate dev
npm run dev
```

Xem chi tiết tại [docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md).

## Tài liệu

- [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) — schema Prisma/PostgreSQL
- [docs/AUTHENTICATION_FLOW.md](docs/AUTHENTICATION_FLOW.md) — luồng đăng nhập/đăng ký/reset mật khẩu
- [docs/DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) — hướng dẫn chạy và cấu hình môi trường
