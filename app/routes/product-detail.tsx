import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { motion } from "framer-motion";

// TODO: Import Route type and create a loader that fetches a single product by ID
// import type { Route } from "./+types/product-detail";
// import { supabase } from "~/lib/supabase";

// export async function loader({ params }: Route.LoaderArgs) {
//   const { data, error } = await supabase
//     .from("products")
//     .select("*")
//     .eq("id", params.id)
//     .single();
//
//   if (error || !data) {
//     throw new Response("Product not found", { status: 404 });
//   }
//   return { product: data };
// }

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  in_stock: boolean;
};

export default function ProductDetail(/*{ loaderData }: Route.ComponentProps*/) {
  // TODO: Use loaderData to display product details
  // const { product } = loaderData;
  const product: Product | null = null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span>Back to Products</span>
          </Link>
        </motion.div>

        {product ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-8xl">📦</span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-10 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <p className="text-gray-600 mb-6 flex-grow">
                  {product.description}
                </p>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {!product.in_stock && (
                      <span className="px-4 py-2 bg-gray-100 text-gray-500 font-medium rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <button
                    disabled={!product.in_stock}
                    className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all ${
                      product.in_stock
                        ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {product.in_stock ? "Add to Cart" : "Currently Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Empty state when loader not implemented */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl mb-6"
            >
              🔍
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Product Details
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Implement the loader function to fetch and display product details.
              Use <code className="bg-gray-100 px-2 py-1 rounded text-sm">params.id</code> to get the product ID from the URL.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Error Boundary for handling loader errors (e.g., product not found)
export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Product Not Found";
      message = "The product you're looking for doesn't exist or has been removed.";
    } else {
      title = `${error.status} ${error.statusText}`;
      message = error.data || "Something went wrong loading this product.";
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          📦
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-500 mb-8">{message}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          ← Browse Products
        </Link>
      </motion.div>
    </div>
  );
}

