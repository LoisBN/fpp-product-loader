# Product Catalog — React Router Loaders

Build a product catalog using React Router v7 loaders to fetch data before the page renders.

## What You'll Learn

- Loader functions in React Router v7
- `loaderData` to access fetched data in components
- Dynamic route parameters (`$id`)
- Route types from generated types
- Error boundaries and error handling

## Tech Stack

- **React Router v7** (framework mode) — pages and routing
- **Supabase** — database and auth
- **Tailwind CSS v4** — styling
- **TypeScript** — type-safe JavaScript

---

## Exercise: Step-by-Step Instructions

> **Read each step carefully.** We tell you exactly _where_ to do each thing — your VSCode terminal, the Supabase dashboard, a specific file, or Claude.

---

### Step 1: Clone the repository

> 📍 **Where:** Your VSCode terminal (`` Ctrl + ` `` to open it)

```bash
cd ~/Desktop
git clone https://github.com/LoisBN/fpp-product-loader.git
cd fpp-product-loader
code .
```

---

### Step 2: Install dependencies

> 📍 **Where:** Your VSCode terminal

```bash
npm install
```

---

### Step 3: Set up your environment file

> 📍 **Where:** Your VSCode terminal

**On Mac/Linux:**
```bash
cp .env.example .env
```

**On Windows (Command Prompt):**
```bash
copy .env.example .env
```

**On Windows (PowerShell):**
```bash
Copy-Item .env.example .env
```

> 📍 **Where:** VSCode — open the `.env` file

Replace the placeholder values with your Supabase credentials:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> 💡 **Where do I find these?** Supabase dashboard → your project → **Settings** (gear icon) → **API**. Copy "Project URL" and the "anon public" key.

---

### Step 4: Create the products table in Supabase

> 📍 **Where:** Your browser — Supabase Dashboard → SQL Editor

Click **SQL Editor** in the sidebar, then **New Query**, and paste this:

```sql
CREATE TABLE products (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  created_at timestamptz default now()
);
```

Click **"Run"**.

Now add some sample products. Click **New Query** again and paste:

```sql
INSERT INTO products (name, description, price, image_url) VALUES
  ('Wireless Headphones', 'Noise-cancelling over-ear headphones', 79.99, 'https://placehold.co/400x300?text=Headphones'),
  ('Mechanical Keyboard', 'RGB backlit with Cherry MX switches', 129.99, 'https://placehold.co/400x300?text=Keyboard'),
  ('USB-C Hub', '7-in-1 hub with HDMI and card reader', 49.99, 'https://placehold.co/400x300?text=USB-C+Hub'),
  ('Laptop Stand', 'Adjustable aluminum stand', 39.99, 'https://placehold.co/400x300?text=Laptop+Stand');
```

Click **"Run"**.

> 📍 **Where:** Supabase Dashboard → Table Editor

Click **Table Editor** to verify — you should see the `products` table with 4 rows.

> 💡 **What just happened?** You created a products table and filled it with sample data. The app will read from this table using a "loader."

---

### Step 5: Start the app

> 📍 **Where:** Your VSCode terminal

```bash
npm run dev
```

> 📍 **Where:** Your browser

Open [http://localhost:5173](http://localhost:5173). You should see the app (it may show placeholder content until you write the loaders).

---

### Step 6: Write the product list loader

> 📍 **Where:** VSCode — open `app/routes/home.tsx`

Find this file: `app` → `routes` → `home.tsx`. Or press `Ctrl+P` / `Cmd+P` and type `home.tsx`.

This is where you'll write a **loader function** — a special React Router function that fetches data *before* the page renders. Look for the TODO comments in the file.

**What is a loader?** Unlike `useEffect` (which fetches data _after_ the page loads, causing a flash of empty content), a loader fetches data _before_ the page shows up. The user sees a complete page immediately.

> 💡 **Ask Claude!** Try: *"I need to write a React Router v7 loader function that fetches all products from a Supabase table called 'products'. Show me the loader and how to access the data in the component using loaderData."*

---

### Step 7: Write the product detail loader

> 📍 **Where:** VSCode — open `app/routes/product-detail.tsx`

This page shows a **single product** based on the URL (e.g. `/product/3`). You need to:

1. Get the product `id` from the URL parameters
2. Fetch that specific product from Supabase
3. Display it on the page

> 💡 **Ask Claude!** Try: *"I have a React Router v7 route at /product/$id. How do I write a loader that reads the id param and fetches a single product from Supabase?"*

---

### Step 8: Test your work

> 📍 **Where:** Your browser — [http://localhost:5173](http://localhost:5173)

1. The home page should show a grid of products with names, prices, and images
2. Clicking a product should take you to a detail page showing that single product
3. If you go to a product that doesn't exist (e.g. `/product/999`), you should see an error message

---

### Step 9: Commit and push your work

> 📍 **Where:** Your VSCode terminal

```bash
git add .
git commit -m "Implement product loaders"
git push
```

---

## Ask Claude for Help

- **"What's the difference between a loader and useEffect for data fetching?"**
- **"How do I get URL parameters in a React Router v7 loader?"**
- **"How do I handle errors in a loader function?"**
- **"What is loaderData and how do I use it in my component?"**
- **"I'm getting this error: [paste error]. What's wrong?"**

---

## Project Structure

```
app/
├── routes/
│   ├── home.tsx              ← ⭐ Product grid — write the loader here!
│   └── product-detail.tsx    ← ⭐ Single product — write the detail loader here!
└── lib/
    └── supabase.ts           ← Supabase client setup (no need to edit)
```

---

## Troubleshooting

**Page shows "No products found" or is empty:**
- Make sure your `.env` file has the correct Supabase credentials
- Make sure you created the `products` table and inserted sample data (Step 4)
- Check the browser console (`F12` → Console) for errors

**"Cannot find module './+types/home'":**
- Run `npm run dev` once — React Router v7 generates type files automatically on startup

**Product detail page shows nothing:**
- Make sure your route file is named correctly and the `$id` parameter matches
- Check that you're reading the param from the loader args correctly

---

Built for [AI Code Academy](https://aicode-academy.com) — From Prompt to Production course.
