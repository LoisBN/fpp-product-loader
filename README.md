# Product Catalog — React Router Loaders

Build a product catalog using React Router v7 loaders to fetch data before the page renders.

## What You'll Learn
- Loader functions in React Router v7
- loaderData to access fetched data in components
- Dynamic route parameters
- Route types from generated types
- Error boundaries and error handling

## Tech Stack
- **React Router v7** (framework mode) — pages and routing
- **Supabase** — database and auth
- **Tailwind CSS v4** — styling
- **TypeScript** — type-safe JavaScript

## Getting Started

```bash
# 1. Clone this repo
git clone https://github.com/LoisBN/fpp-product-loader.git
cd fpp-product-loader

# 2. Install dependencies
npm install

# 3. Copy the environment file
cp .env.example .env
# Add your Supabase URL and anon key to .env

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## Project Structure

```
fpp-product-loader/
├── app/
│   ├── routes/
│   │   ├── home.tsx              # Product grid with loader
│   │   ├── product-detail.tsx    # Single product with loader
│   │   └── routes.ts             # Route definitions
│   └── lib/
│       └── supabase.ts           # Supabase client setup
├── .env.example
├── package.json
└── README.md
```

## Exercise Tasks

1. **Create products table** — Add columns: id, name, description, price, image_url, created_at
2. **Write loader in home.tsx** — Fetch all products before page renders
3. **Display product grid** — Use loaderData to show products with images and prices
4. **Create detail page** — New route with id parameter and its own loader
5. **Handle errors** — Add error boundary and graceful error messages

## Hints

- Import Route type: `import type { Route } from "./+types/home"`
- Loader signature: `export async function loader({}: Route.LoaderArgs)`
- Access data in component: `export default function Home({ loaderData }: Route.ComponentProps)`
- Use loaderData.products or loaderData.product depending on the route
- Dynamic routes use `$id.tsx` naming convention in React Router v7

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
