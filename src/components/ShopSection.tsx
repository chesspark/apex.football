"use client";

import { useState } from "react";
import { ShoppingBag, Star, ChevronDown } from "lucide-react";

interface Product {
  id: string;
  name: string;
  brand: string;
  category: "shirt" | "shoes";
  price: number;
  image: string;
  colors: string[];
  rating: number;
  badge?: string;
}

const products: Product[] = [
  { id: "s1", name: "Morocco 2026 Home Jersey", brand: "PUMA", category: "shirt", price: 89.99, image: "🇲🇦", colors: ["#FF0000", "#008000"], rating: 4.9, badge: "CAN Champions" },
  { id: "s2", name: "Real Madrid 25/26 Home", brand: "Adidas", category: "shirt", price: 94.99, image: "⚪", colors: ["#FFFFFF", "#FFD700"], rating: 4.8 },
  { id: "s3", name: "FC Barcelona 25/26 Home", brand: "Nike", category: "shirt", price: 94.99, image: "🔵🔴", colors: ["#A50044", "#004D98"], rating: 4.7 },
  { id: "s4", name: "Manchester City 25/26 Home", brand: "PUMA", category: "shirt", price: 89.99, image: "🔵", colors: ["#6CABDD", "#FFFFFF"], rating: 4.7 },
  { id: "s5", name: "Liverpool 25/26 Home", brand: "Nike", category: "shirt", price: 89.99, image: "🔴", colors: ["#C8102E", "#FFFFFF"], rating: 4.8 },
  { id: "s6", name: "Brazil 2026 Home Jersey", brand: "Nike", category: "shirt", price: 94.99, image: "🇧🇷", colors: ["#FFD700", "#008000"], rating: 4.8 },
  { id: "s7", name: "Al-Nassr 25/26 Home", brand: "Adidas", category: "shirt", price: 84.99, image: "💛", colors: ["#FFD700", "#0000FF"], rating: 4.6 },
  { id: "s8", name: "PSG 25/26 Home", brand: "Nike", category: "shirt", price: 94.99, image: "🔵", colors: ["#004170", "#FF0000"], rating: 4.7 },
  { id: "s9", name: "Bayern Munich 25/26 Home", brand: "Adidas", category: "shirt", price: 89.99, image: "🔴", colors: ["#DC052D", "#FFFFFF"], rating: 4.7 },
  { id: "s10", name: "Argentina 2026 Home", brand: "Adidas", category: "shirt", price: 94.99, image: "🇦🇷", colors: ["#75AADB", "#FFFFFF"], rating: 4.9 },
  { id: "sh1", name: "Nike Mercurial Superfly 10", brand: "Nike", category: "shoes", price: 274.99, image: "👟", colors: ["#FFD700", "#000000"], rating: 4.9, badge: "Mbappé's Choice" },
  { id: "sh2", name: "Adidas Predator Elite", brand: "Adidas", category: "shoes", price: 249.99, image: "👟", colors: ["#000000", "#FF0000"], rating: 4.8, badge: "Bellingham's Pick" },
  { id: "sh3", name: "PUMA Future Ultimate", brand: "PUMA", category: "shoes", price: 229.99, image: "👟", colors: ["#0000FF", "#FFFFFF"], rating: 4.7 },
  { id: "sh4", name: "Nike Phantom GX 2 Elite", brand: "Nike", category: "shoes", price: 259.99, image: "👟", colors: ["#FF6B6B", "#000000"], rating: 4.8, badge: "Haaland's Boot" },
  { id: "sh5", name: "Adidas X Crazyfast", brand: "Adidas", category: "shoes", price: 239.99, image: "👟", colors: ["#008000", "#FFD700"], rating: 4.7 },
  { id: "sh6", name: "PUMA King Ultimate", brand: "PUMA", category: "shoes", price: 199.99, image: "👟", colors: ["#000000", "#FFD700"], rating: 4.6 },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-[var(--surface)] border border-[var(--border-clr)] rounded-2xl overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-300 hover:-translate-y-1">
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-[var(--accent)] text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
          {product.badge}
        </div>
      )}

      <div className="h-40 flex items-center justify-center bg-gradient-to-br from-[var(--surface)] to-[var(--surface-hover)]">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
      </div>

      <div className="p-4">
        <div className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider mb-1">
          {product.brand}
        </div>
        <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3 h-3 text-[var(--accent)]" fill="var(--accent)" />
          <span className="text-xs text-[var(--muted)]">{product.rating}</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {product.colors.map((c, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border border-[var(--border-clr)]"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-black text-[var(--accent)]">
            ${product.price}
          </span>
          <button className="px-4 py-1.5 bg-[var(--accent)] text-black text-xs font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-transform">
            <ShoppingBag className="w-3.5 h-3.5 inline mr-1" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopSection() {
  const [category, setCategory] = useState<"all" | "shirt" | "shoes">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");

  const filtered = products
    .filter((p) => category === "all" || p.category === category)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
    });

  return (
    <section id="shop" className="py-24 bg-[var(--background)] scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest">
              Official Gear
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[var(--foreground)] mt-2">
              Shop
            </h2>
            <p className="text-[var(--muted)] mt-1">
              Wear what the pros wear — jerseys, boots, and more.
            </p>
          </div>

          <div className="flex gap-2">
            {(["all", "shirt", "shoes"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  category === c
                    ? "bg-[var(--accent)] text-black"
                    : "bg-[var(--surface)] text-[var(--muted)] border border-[var(--border-clr)] hover:text-[var(--foreground)]"
                }`}
              >
                {c === "all" ? "All" : c === "shirt" ? "Jerseys" : "Boots"}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-[var(--muted)] uppercase tracking-wider">Sort:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none pl-3 pr-7 py-1.5 bg-[var(--surface)] border border-[var(--border-clr)] rounded-lg text-xs text-[var(--muted)] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--muted)] pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
