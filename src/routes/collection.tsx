import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import bottle1 from "@/assets/bottle1.jpg";
import bottle2 from "@/assets/bottle2.jpg";
import bottle3 from "@/assets/bottle3.jpg";
import collection from "@/assets/collection.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "La Collection — Maison d'Ombre" },
      { name: "description", content: "Signed compositions and rare extraits from independent perfumers. Explore the complete olfactory library." },
      { property: "og:title", content: "La Collection — Maison d'Ombre" },
      { property: "og:description", content: "Rare extraits, signed compositions, hand-poured in Paris." },
    ],
  }),
  component: Collection,
});

const PIECES = [
  { n: "Éclat d'Ambre", f: "Ambrée", nose: "Céline Barel", notes: "Saffron · Amber · Oud", price: "€ 285", img: bottle1 },
  { n: "Nocturne Ambré", f: "Cuir", nose: "Bertrand Duchaufour", notes: "Leather · Tobacco · Myrrh", price: "€ 320", img: bottle2 },
  { n: "Velmoré", f: "Florale", nose: "Nathalie Feisthauer", notes: "Rose · Cedar · Iris", price: "€ 260", img: bottle3 },
  { n: "Ombre Noire", f: "Boisée", nose: "Amélie Bourgeois", notes: "Vetiver · Papyrus · Smoke", price: "€ 295", img: bottle1 },
  { n: "Rose Interdite", f: "Florale", nose: "Julien Rasquinet", notes: "Rose de Mai · Patchouli · Musk", price: "€ 275", img: bottle3 },
  { n: "Cuir de Minuit", f: "Cuir", nose: "Antoine Lie", notes: "Suede · Birch · Iris", price: "€ 310", img: bottle2 },
];

const FILTERS = ["Toutes", "Ambrée", "Boisée", "Florale", "Cuir"] as const;

function Collection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Toutes");
  const items = filter === "Toutes" ? PIECES : PIECES.filter((p) => p.f === filter);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img src={collection} alt="" className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="relative z-10 mx-auto max-w-[1600px] h-full flex flex-col justify-end px-6 md:px-12 pb-16">
          <Reveal>
            <p className="eyebrow">La Collection · 2026</p>
            <h1 className="mt-6 font-display text-7xl md:text-9xl leading-[0.9] text-foreground">
              Every flacon,<br />
              <span className="italic text-gold-gradient">a confession</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-20 z-30 border-y border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-5 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-6 md:gap-10">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] uppercase tracking-[0.3em] transition-colors whitespace-nowrap ${
                  filter === f ? "text-gold" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {items.length} pièces
          </span>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 py-24">
        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.n + i} delay={(i % 3) * 120} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-ink aspect-[3/4]">
                <img
                  src={p.img}
                  alt={p.n}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{p.f}</span>
                  <span className="font-serif text-xl text-foreground">{p.price}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-ink/40">
                  <span className="btn-luxe">Le Flacon</span>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-display text-3xl text-foreground">{p.n}</h3>
                <div className="gold-rule mt-3 w-10" />
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Signé · {p.nose}</p>
                <p className="mt-3 font-serif text-lg text-foreground/70 italic">{p.notes}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
