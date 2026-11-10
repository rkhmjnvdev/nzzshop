import { useState } from "react";
import { Search, ShoppingCart, Menu, X, Cpu } from "lucide-react";

const NAV = ["Catalog", "PC Builder", "Pre-built PCs", "Deals", "Contacts"];

export default function Header({ cartCount = 0, onSearch }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button className="md:hidden text-slate-200" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <a href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Cpu className="text-indigo-500" /> NZZ shop
        </a>

        <form onSubmit={submit} className="relative hidden flex-1 md:block">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GPUs, CPUs, motherboards..."
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-4 pr-10 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-slate-400 hover:text-white" aria-label="Search">
            <Search size={18} />
          </button>
        </form>

        <a href="/cart" className="relative ml-auto text-slate-200 hover:text-white md:ml-0" aria-label="Cart">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500 px-1 text-xs font-semibold text-white">
              {cartCount}
            </span>
          )}
        </a>
      </div>

      <nav className="hidden border-t border-slate-800 md:block">
        <ul className="mx-auto flex max-w-7xl gap-6 px-4 py-2 text-sm text-slate-300">
          {NAV.map((item) => (
            <li key={item}><a href="#" className="hover:text-white">{item}</a></li>
          ))}
        </ul>
      </nav>

      {open && (
        <div className="border-t border-slate-800 px-4 py-3 md:hidden">
          <form onSubmit={submit} className="mb-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white"
            />
          </form>
          <ul className="space-y-2 text-slate-300">
            {NAV.map((item) => (
              <li key={item}><a href="#" className="block py-1 hover:text-white">{item}</a></li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
