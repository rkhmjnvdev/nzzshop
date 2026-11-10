import { useMemo, useState } from "react";
import Header from "../components/layout/Header";
import FilterSidebar, { defaultFilters } from "../components/filters/FilterSidebar";
import ProductCard from "../components/product/ProductCard";
import { mockProducts } from "../data/mockProducts";

export default function Catalog() {
  const [filters, setFilters] = useState(defaultFilters);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const brands = useMemo(() => [...new Set(mockProducts.map((p) => p.brand))], []);

  const visible = useMemo(
    () =>
      mockProducts.filter((p) => {
        if (filters.categories.length && !filters.categories.includes(p.category)) return false;
        if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
        if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [filters, search]
  );

  const addToCart = (product) =>
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      return found
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });

  return (
    <div className="min-h-screen bg-slate-950">
      <Header cartCount={cart.reduce((n, i) => n + i.qty, 0)} onSearch={setSearch} />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <FilterSidebar filters={filters} onChange={setFilters} brands={brands} />
        <section className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
          ))}
          {visible.length === 0 && (
            <p className="col-span-full py-20 text-center text-slate-500">No products match your filters.</p>
          )}
        </section>
      </main>
    </div>
  );
}
