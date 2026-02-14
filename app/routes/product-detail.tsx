import { Link } from "react-router";

// TODO: Import Route type and create a loader that fetches a single product by ID
// import type { Route } from "./+types/product-detail";

// export async function loader({ params }: Route.LoaderArgs) {
//   // Fetch product by params.id from Supabase
//   return { product: null };
// }

export default function ProductDetail() {
  // TODO: Use loaderData to display product details

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Products
      </Link>
      <div className="bg-white rounded-xl shadow p-8">
        <p className="text-gray-500">Implement the loader to display product details here!</p>
      </div>
    </div>
  );
}
