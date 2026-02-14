// TODO: Import Route type from the generated types
// TODO: Create a loader function that fetches products from Supabase
// import type { Route } from "./+types/home";

// export async function loader({}: Route.LoaderArgs) {
//   // Fetch products from Supabase here
//   return { products: [] };
// }

export default function Home(/*{ loaderData }: Route.ComponentProps*/) {
  // TODO: Use loaderData to access products fetched by the loader

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
      <p className="text-gray-600 mb-6">Learn React Router loaders by building a product catalog.</p>

      {/* TODO: Map over products and render a grid of product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          <p>Create a "products" table in Supabase and implement the loader to see products here!</p>
        </div>
      </div>
    </div>
  );
}
