const CATEGORIES = [
  { value: "gpu", label: "Graphics Cards" },
  { value: "cpu", label: "Processors" },
  { value: "motherboard", label: "Motherboards" },
  { value: "ram", label: "Memory" },
  { value: "prebuilt", label: "Pre-built PCs" },
];

export const defaultFilters = { categories: [], brands: [], minPrice: 0, maxPrice: 5000 };

export default function FilterSidebar({ filters, onChange, brands = [], priceCeiling = 5000 }) {
  const toggle = (key, value) => {
    const list = filters[key];
    onChange({
      ...filters,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    });
  };

  const checkbox = "h-4 w-4 rounded border-slate-600 bg-slate-800 accent-indigo-500";
  const row = "flex cursor-pointer items-center gap-2 text-sm text-slate-400 hover:text-white";
  const numInput = "w-full rounded-md border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white";

  return (
    <aside className="w-full space-y-6 self-start rounded-xl border border-slate-800 bg-slate-900 p-5 lg:w-64 lg:shrink-0">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white">Filters</h2>
        <button onClick={() => onChange(defaultFilters)} className="text-xs text-indigo-400 hover:text-indigo-300">
          Reset
        </button>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-300">Category</legend>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c.value} className={row}>
              <input type="checkbox" className={checkbox} checked={filters.categories.includes(c.value)} onChange={() => toggle("categories", c.value)} />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-300">Brand</legend>
        <div className="space-y-2">
          {brands.map((b) => (
            <label key={b} className={row}>
              <input type="checkbox" className={checkbox} checked={filters.brands.includes(b)} onChange={() => toggle("brands", b)} />
              {b}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-300">Price</legend>
        <div className="flex items-center gap-2">
          <input type="number" min={0} value={filters.minPrice} onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) })} className={numInput} aria-label="Minimum price" />
          <span className="text-slate-500">–</span>
          <input type="number" min={0} value={filters.maxPrice} onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })} className={numInput} aria-label="Maximum price" />
        </div>
        <input type="range" min={0} max={priceCeiling} step={50} value={filters.maxPrice} onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })} className="mt-3 w-full accent-indigo-500" />
      </fieldset>
    </aside>
  );
}
