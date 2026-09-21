import { createFileRoute } from "@tanstack/react-router";
import bottle1 from "@/assets/bottle1.jpg";
import bottle2 from "@/assets/bottle2.jpg";
import bottle3 from "@/assets/bottle3.jpg";
import ingredients from "@/assets/ingredients.jpg";
import maison from "@/assets/maison.jpg";
import collection from "@/assets/collection.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Le Journal — Maison d'Ombre" },
      { name: "description", content: "Notes, essays and confidences from the atelier — on rare ingredients, independent perfumers and Parisian nights." },
      { property: "og:title", content: "Le Journal — Maison d'Ombre" },
      { property: "og:description", content: "Essays and confidences from the atelier." },
    ],
  }),
  component: Journal,
});

const POSTS = [
  { t: "The Alchemy of Ambergris", cat: "Ingredients", date: "Mars 2026", d: "On the mysterious grey gold of the sea and its slow, salty afterlife.", img: bottle1, featured: true },
  { t: "A Night with Roja Dove", cat: "Confidences", date: "Février 2026", d: "The master perfumer speaks of leather, longing, and London fog.", img: bottle2 },
  { t: "The Return of Oud Cambodge", cat: "Sourcing", date: "Janvier 2026", d: "A journey into the misted forests of Southeast Asia.", img: bottle3 },
  { t: "Iris, or the Melancholy Root", cat: "Ingredients", date: "Décembre 2025", d: "Why iris pallida takes seven years to become a fragrance.", img: ingredients },
  { t: "Behind the Boudoir Door", cat: "Atelier", date: "Novembre 2025", d: "A photographic essay of the rue de Castiglione atelier at midnight.", img: maison },
  { t: "On Loving a Difficult Perfume", cat: "Essai", date: "Octobre 2025", d: "The strange, patient tenderness required by great extraits.", img: collection },
];

function Journal() {
  const [feat, ...rest] = POSTS;
  return (
    <div>
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 pt-24 pb-16">
        <Reveal>
          <p className="eyebrow">Le Journal</p>
          <h1 className="mt-6 font-display text-7xl md:text-9xl leading-[0.9] text-foreground">
            Notes from<br /><span className="italic text-gold-gradient">the atelier</span>
          </h1>
          <div className="gold-rule mt-10 w-32" />
        </Reveal>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 pb-24">
        <Reveal className="group grid md:grid-cols-2 gap-10 items-center cursor-pointer">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            <img src={feat.img} alt="" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105" />
            <span className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.35em] text-gold bg-ink/80 px-4 py-2">
              À la une
            </span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{feat.cat} · {feat.date}</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05] text-foreground group-hover:text-gold transition-colors duration-500">
              {feat.t}
            </h2>
            <div className="gold-rule mt-8 w-16" />
            <p className="mt-8 font-serif text-xl leading-relaxed text-foreground/75">
              {feat.d} A slow essay on what remains when perfume forgets itself
              and becomes something older, deeper — a memory of the sea, a
              whisper carried by wind.
            </p>
            <div className="mt-10">
              <span className="btn-luxe">Read the chapter</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 pb-32 border-t border-border pt-20">
        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.t} delay={(i % 3) * 120} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold">{p.cat} · {p.date}</p>
              <h3 className="mt-3 font-display text-3xl text-foreground group-hover:text-gold transition-colors duration-500">{p.t}</h3>
              <p className="mt-3 font-serif text-lg text-foreground/65">{p.d}</p>
              <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.3em] text-foreground/50 link-underline">Lire →</span>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
