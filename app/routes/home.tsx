import { motion } from "framer-motion";
import { Link, useRouteError, isRouteErrorResponse, useNavigation } from "react-router";
// TODO: Import Route type from the generated types
// import type { Route } from "./+types/home";

// TODO: Create a loader function that fetches products from Supabase
// export async function loader({}: Route.LoaderArgs) {
//   const { data, error } = await supabase
//     .from("products")
//     .select("*")
//     .order("name");
//
//   if (error) throw new Response(error.message, { status: 500 });
//   return { products: data ?? [] };
// }

// Check if Supabase is configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isSupabaseConfigured =
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes("placeholder") &&
  !supabaseKey.includes("placeholder");

// Placeholder product type - replace with your Supabase types
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  in_stock: boolean;
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className={`group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 cursor-pointer ${
          !product.in_stock ? "opacity-60" : ""
        }`}
      >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-5xl">📦</span>
        )}
      </div>

      {/* Out of Stock Badge */}
      {!product.in_stock && (
        <div className="absolute top-3 right-3 px-3 py-1 bg-gray-900/80 text-white text-xs font-medium rounded-full">
          Sold Out
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full shadow-sm">
        {product.category}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            disabled={!product.in_stock}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              product.in_stock
                ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {product.in_stock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}

function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("All")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selected === "All"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected === category
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

function ProductCardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-lg w-full animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-lg w-2/3 animate-pulse" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-7 bg-gray-200 rounded-lg w-20 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-xl w-24 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

function LoadingState() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} index={i} />
      ))}
    </>
  );
}

type StatusItemProps = {
  label: string;
  done: boolean;
  hint?: string;
};

function StatusItem({ label, done, hint }: StatusItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
          done
            ? "bg-emerald-500 text-white"
            : "bg-gray-200 text-gray-400"
        }`}
      >
        {done ? "✓" : "○"}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-sm ${done ? "text-gray-600" : "text-gray-900 font-medium"}`}>
          {label}
        </span>
        {!done && hint && (
          <p className="text-xs text-gray-400 mt-0.5 truncate">{hint}</p>
        )}
      </div>
    </div>
  );
}

function SetupStatus({ hasProducts, loaderImplemented }: { hasProducts: boolean; loaderImplemented: boolean }) {
  const allDone = isSupabaseConfigured && loaderImplemented && hasProducts;

  if (allDone) {
    return null; // Hide when everything is set up
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-xs">📋</span>
        </div>
        <h3 className="font-semibold text-gray-900">Setup Progress</h3>
      </div>

      <div className="space-y-3">
        <StatusItem
          label="Connect Supabase"
          done={isSupabaseConfigured}
          hint="Add .env with VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY"
        />
        <StatusItem
          label="Implement loader function"
          done={loaderImplemented}
          hint="Ask Claude Code to write the loader"
        />
        <StatusItem
          label="Fetch products from database"
          done={hasProducts}
          hint="Create products table and add sample data"
        />
      </div>

      {/* Network indicator */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className={`w-2 h-2 rounded-full ${loaderImplemented ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
          <span>
            {loaderImplemented
              ? "Loader active — check Network tab for requests"
              : "No network requests yet — implement the loader first"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-20"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl mb-6"
      >
        🛒
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No products yet
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        {isSupabaseConfigured
          ? "Implement the loader function to fetch products from Supabase."
          : "Connect Supabase first, then implement the loader function."}
      </p>
    </motion.div>
  );
}

export default function Home(/*{ loaderData }: Route.ComponentProps*/) {
  // TODO: Replace this with useLoaderData()
  // const { products } = loaderData;
  const products: Product[] = [];

  // TODO: Add category filter state
  // const [selectedCategory, setSelectedCategory] = useState("All");

  // Check if navigating (useful for showing loading state on client-side navigation)
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // Derive unique categories from products
  const categories = [...new Set(products.map((p) => p.category))];

  // TODO: Filter products by selected category
  // const filteredProducts = selectedCategory === "All"
  //   ? products
  //   : products.filter((p) => p.category === selectedCategory);

  const filteredProducts = products;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Product Catalog
          </h1>
          <p className="text-lg text-gray-500">
            Discover our collection of amazing products
          </p>
        </motion.div>

        {/* Setup Progress */}
        <SetupStatus hasProducts={products.length > 0} loaderImplemented={false} />

        {/* Category Filter */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <CategoryFilter
              categories={categories}
              selected="All"
              onSelect={() => {}}
            />
          </motion.div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            <LoadingState />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Product Count */}
        {products.length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-gray-400 text-sm"
          >
            Showing {filteredProducts.length} of {products.length} products
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Error Boundary for handling loader errors
export function ErrorBoundary() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data || "The page you're looking for doesn't exist.";
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
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl mb-6"
        >
          😵
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-500 mb-8">{message}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
