import { ShoppingCart } from "lucide-react";

const fmt = (n) => new Intl.NumberFormat("en-US").format(n);

function stockStatus(stock) {
  if (stock === 0) return { label: "Out of stock", cls: "bg-red-500/15 text-red-400" };
  if (stock <= 5) return { label: `Only ${stock} left`, cls: "bg-amber-500/15 text-amber-400" };
  return { label: "In stock", cls: "bg-emerald-500/15 text-emerald-400" };
}

function specBadges(product) {
  const s = product.specs;
  switch (product.category) {
    case "gpu":         return [`${s.memory_gb} GB ${s.memory_type}`, `${s.tdp_w} W`];
    case "cpu":         return [s.socket, `${s.cores}C/${s.threads}T`, `${s.boost_clock_ghz} GHz`];
    case "motherboard": return [s.socket, s.chipset, s.form_factor];
    case "ram":         return [s.type, `${s.capacity_gb} GB`, `${s.speed_mhz} MHz`];
    case "prebuilt":    return [s.cpu, s.gpu, `${s.ram_gb} GB RAM`];
    default:            return [];
  }
}

export default function ProductCard({ product, onAddToCart }) {
  const { name, brand, price, oldPrice, stock, image } = product;
  const status = stockStatus(stock);
  const badges = specBadges(product);
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-indigo-500/60">
      <div className="relative aspect-square bg-slate-950 p-4">
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-contain transition group-hover:scale-105" />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded bg-indigo-500 px-2 py-0.5 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{brand}</p>
          <h3 className="line-clamp-2 text-sm font-semibold text-white">{name}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span key={b} className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-300">{b}</span>
          ))}
        </div>

        <span className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${status.cls}`}>{status.label}</span>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            {oldPrice && <p className="text-xs text-slate-500 line-through">${fmt(oldPrice)}</p>}
            <p className="text-lg font-bold text-white">${fmt(price)}</p>
          </div>
          <button
            disabled={stock === 0}
            onClick={() => onAddToCart?.(product)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
          >
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
