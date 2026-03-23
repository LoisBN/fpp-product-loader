# Product Catalog — React Router Loaders

Build a product catalog that loads data before the page renders — no loading spinners, no empty flash.

## Quick Start

```bash
git clone https://github.com/LoisBN/fpp-product-loader.git
cd fpp-product-loader
npm install
```

Create `.env` with your Supabase credentials, then `npm run dev`.

## Exercise Instructions

This repo is part of the **From Prompt to Production** course.

👉 **[Find the full exercise instructions on the course platform](https://aicode-academy.com)**

## Tech Stack

- React Router v7 (framework mode)
- Supabase
- Tailwind CSS v4
- TypeScript

## Project Structure

```
app/
├── routes/
│   ├── home.tsx              ← Product grid + loader
│   └── product-detail.tsx    ← Single product + loader
├── lib/
│   └── supabase.ts           ← Supabase client
└── routes.ts                 ← Route configuration
```

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
