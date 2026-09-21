import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero.jpg";
import collection from "@/assets/collection.jpg";
import ingredients from "@/assets/ingredients.jpg";
import bottle1 from "@/assets/bottle1.jpg";
import bottle2 from "@/assets/bottle2.jpg";
import bottle3 from "@/assets/bottle3.jpg";
import { Reveal } from "@/components/Reveal";
import { GsapReveal } from "@/components/GsapReveal";
import { ThreeHero } from "@/components/ThreeHero";
import { ensureGsap } from "@/lib/gsap";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison d'Ombre — Rare Parfums de Paris" },
      { name: "description", content: "An independent Parisian house of rare and confidential fragrances. Discover the collection." },
      { property: "og:title", content: "Maison d'Ombre — Rare Parfums de Paris" },
      { property: "og:description", content: "Rare, radical and confidential fragrances, composed in the heart of Paris." },
    ],
  }),
  component: Index,
});

const FEATURED = [
  { name: "Éclat d'Ambre", family: "Amber · Oud · Saffron", price: "€ 285", img: bottle1 },
  { name: "Nocturne Ambré", family: "Leather · Tobacco · Myrrh", price: "€ 320", img: bottle2 },
  { name: "Velmoré", family: "Rose · Cedar · Iris", price: "€ 260", img: bottle3 },
];

const OLFACTORY = [
  { n: "01", t: "Ambrées", d: "Sillages of resin, benzoin and warm skin." },
  { n: "02", t: "Boisées", d: "Cedar, oud and rare woods from the East." },
  { n: "03", t: "Florales", d: "Rose de Mai, jasmine sambac, tuberose absolute." },
  { n: "04", t: "Cuirs", d: "Suede, birch tar, iris and dark leather." },
];

function Index() {
  const [scrollY, setScrollY] = useState(0);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const on = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      // Hero title staged entrance
      if (heroTitleRef.current) {
        const chars = heroTitleRef.current.querySelectorAll<HTMLElement>("[data-char]");
        gsap.from(chars, {
          yPercent: 120,
          opacity: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.04,
          delay: 0.2,
        });
      }
      if (heroCopyRef.current) {
        gsap.from(heroCopyRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.12,
          delay: 0.8,
        });
      }
      // Marquee horizontal parallax on scroll
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  const title = "Éclat d'Ombre";

  return (
    <div className="-mt-20">
      {/* HERO */}
      <section className="relative h-screen min-h-[760px] overflow-hidden">
        {/* Ken-burns backdrop */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translate3d(0, ${scrollY * 0.35}px, 0) scale(${1 + scrollY * 0.0004})` }}
        >
          <img src={hero} alt="" className="h-full w-full object-cover animate-ken-burns opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        </div>

        {/* Three.js iridescent sphere + particles */}
        <ThreeHero className="absolute inset-0 z-[1]" />

        {/* Radial gold glow */}
        <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: "var(--gradient-radial-glow)" }} />

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 md:px-12 pb-24">
          <div className="glass-panel rounded-3xl p-8 md:p-14 max-w-3xl">
            <p className="eyebrow mb-8">Nouvelle Extrait · MMXXVI</p>
            <h1
              ref={heroTitleRef}
              className="font-display text-[13vw] md:text-[8vw] leading-[0.9] tracking-tight text-foreground overflow-hidden"
            >
              <span className="block overflow-hidden">
                {title.split("").map((c, i) => (
                  <span key={i} data-char className="inline-block">
                    {c === " " ? "\u00A0" : c}
                  </span>
                ))}
              </span>
              <span className="italic font-serif text-gold-gradient block mt-2">de Paris</span>
            </h1>
            <div ref={heroCopyRef}>
              <div className="gold-rule mt-10 w-40" />
              <p className="mt-8 max-w-lg font-serif text-xl md:text-2xl leading-relaxed text-foreground/85">
                A single drop of golden shadow — amber crystallised over saffron,
                black oud and a whisper of Damascus rose.
              </p>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link to="/collection" className="btn-luxe">Discover the flacon</Link>
                <Link to="/story" className="btn-luxe" style={{ borderColor: "transparent", color: "var(--foreground)" }}>
                  The composition
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-muted-foreground">
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-gold to-transparent animate-pulse" />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border py-6 overflow-hidden bg-ink/60" ref={marqueeRef}>

        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {["Paris — 2011", "Extrait de Parfum", "Édition Confidentielle", "Made in France", "Cruelty Free", "Rare Ingredients", "Paris — 2011", "Extrait de Parfum"].map((t, j) => (
                <span key={j} className="flex items-center px-10 font-display text-2xl tracking-[0.3em] text-foreground/60">
                  {t}
                  <span className="mx-10 text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 py-32">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <p className="eyebrow">La Collection</p>
          <h2 className="mt-6 font-display text-5xl md:text-7xl text-foreground">
            Three <span className="italic text-gold-gradient">confidences</span>
          </h2>
          <div className="gold-rule mt-8 mx-auto w-24" />
          <p className="mt-8 font-serif text-xl text-foreground/70">
            Each flacon is a chapter — composed slowly, hand-poured in our
            Parisian atelier and sealed with wax.
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3">
          {FEATURED.map((p, i) => (
            <Reveal key={p.name} delay={i * 150} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-ink aspect-[3/4]">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70" />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="h-px w-6 bg-gold" />
                  <span className="text-[10px] uppercase tracking-[0.35em] text-gold">N° 0{i + 1}</span>
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="btn-luxe py-3 px-6 text-[10px]">Découvrir</span>
                </div>
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <div>
                  <h3 className="font-display text-3xl text-foreground">{p.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.family}</p>
                </div>
                <span className="font-serif text-xl text-gold">{p.price}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SPLIT MANIFESTO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-32 grid gap-16 md:grid-cols-2 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={collection} alt="" loading="lazy" className="h-full w-full object-cover animate-float" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="eyebrow">Le Manifeste</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05] text-foreground">
              Fragrance as an <span className="italic text-gold-gradient">act of rebellion</span>.
            </h2>
            <div className="gold-rule mt-8 w-24" />
            <p className="mt-8 font-serif text-xl leading-relaxed text-foreground/75">
              We stand against the ordinary. Each composition is signed by an
              independent nose we admire, blended without compromise, and left
              to mature for six months in dark cellars beneath rue de Castiglione.
            </p>
            <p className="mt-6 font-serif text-xl leading-relaxed text-foreground/75">
              What you wear on your skin is not a product. It is a manifesto.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10">
              {[
                { k: "14", v: "Years of confidences" },
                { k: "37", v: "Signed compositions" },
                { k: "3", v: "Ateliers · Paris" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display text-5xl text-gold-gradient">{s.k}</div>
                  <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* OLFACTORY FAMILIES */}
      <section
        className="relative py-32 border-y border-border"
        style={{
          backgroundImage: `linear-gradient(to bottom, var(--background) 0%, transparent 30%, transparent 70%, var(--background) 100%), url(${ingredients})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative mx-auto max-w-[1600px] px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-20">
            <p className="eyebrow">Familles Olfactives</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-foreground">
              Four <span className="italic text-gold-gradient">territories</span>
            </h2>
          </Reveal>
          <div className="grid gap-px bg-border md:grid-cols-4">
            {OLFACTORY.map((o, i) => (
              <Reveal key={o.n} delay={i * 100} className="group relative bg-background p-10 min-h-[340px] flex flex-col justify-between transition-colors duration-500 hover:bg-ink">
                <div className="font-display text-5xl text-gold/40 group-hover:text-gold transition-colors duration-500">{o.n}</div>
                <div>
                  <h3 className="font-display text-3xl text-foreground">{o.t}</h3>
                  <div className="gold-rule mt-4 w-10" />
                  <p className="mt-4 font-serif text-lg text-foreground/70">{o.d}</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL TEASE */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 py-32">
        <div className="flex items-end justify-between mb-16">
          <Reveal>
            <p className="eyebrow">Le Journal</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-foreground">
              Notes from the <span className="italic text-gold-gradient">atelier</span>
            </h2>
          </Reveal>
          <Link to="/journal" className="hidden md:inline-block link-underline text-[11px] uppercase tracking-[0.3em] text-gold">
            All entries →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { t: "The Alchemy of Ambergris", d: "On the mysterious grey gold of the sea.", img: bottle1 },
            { t: "A Night with Roja Dove", d: "Confidences from a master perfumer.", img: bottle2 },
            { t: "The Return of Oud Cambodge", d: "Sourcing the rarest woods of Southeast Asia.", img: bottle3 },
          ].map((a, i) => (
            <Reveal key={a.t} delay={i * 120} className="group">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                <img src={a.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              </div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-gold">Chapitre · 0{i + 1}</p>
              <h3 className="mt-3 font-display text-2xl text-foreground group-hover:text-gold transition-colors">{a.t}</h3>
              <p className="mt-2 font-serif text-lg text-foreground/60">{a.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
          <Reveal>
            <p className="eyebrow">Visite Privée</p>
            <h2 className="mt-6 font-display text-6xl md:text-8xl leading-[0.95] text-foreground">
              Enter the <span className="italic text-gold-gradient">boudoir</span>
            </h2>
            <p className="mt-10 font-serif text-xl md:text-2xl text-foreground/70">
              Book an olfactory consultation in our Parisian atelier — one hour,
              one nose, one thousand confidences.
            </p>
            <div className="mt-12">
              <Link to="/contact" className="btn-luxe">Reserve a visit</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
