import { createFileRoute } from "@tanstack/react-router";
import maison from "@/assets/maison.jpg";
import ingredients from "@/assets/ingredients.jpg";
import hero from "@/assets/hero.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Notre Histoire — Maison d'Ombre" },
      { name: "description", content: "The story of an independent Parisian perfume house — founded in 2011 on rue de Castiglione." },
      { property: "og:title", content: "Notre Histoire — Maison d'Ombre" },
      { property: "og:description", content: "A house of shadows and light, born in Paris." },
    ],
  }),
  component: Story,
});

const CHAPTERS = [
  { y: "2011", t: "The First Boudoir", d: "Founded by Camille Ordonnaud in a former millinery on rue de Castiglione, with three flacons and one unshakable belief: fragrance should be dangerous." },
  { y: "2014", t: "The Nose Circle", d: "We invite independent perfumers to sign their own compositions — a rare gesture in a house-driven industry." },
  { y: "2019", t: "Atelier Milano", d: "A second atelier opens in a Renaissance palazzo. Rare ingredients begin their slow travel between the two cities." },
  { y: "2024", t: "The Silent Cellar", d: "Under the Paris boutique, a maturation cellar is built. Every extrait rests six months in darkness before it is worn." },
];

function Story() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <img src={maison} alt="" className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
        <div className="relative z-10 mx-auto max-w-[1600px] h-full flex flex-col justify-end px-6 md:px-12 pb-20">
          <Reveal>
            <p className="eyebrow">Notre Histoire</p>
            <h1 className="mt-6 max-w-4xl font-display text-6xl md:text-8xl leading-[0.95] text-foreground">
              A house of <span className="italic text-gold-gradient">shadows</span> and <span className="italic text-gold-gradient">light</span>.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-6 md:px-12 py-32 text-center">
        <Reveal>
          <div className="font-display text-8xl text-gold-gradient leading-none">"</div>
          <p className="mt-6 font-serif text-2xl md:text-3xl italic leading-relaxed text-foreground/85">
            We built this house for those who refuse to smell like the century.
            For lovers of shadow, of resin, of the rare and the disquieting.
          </p>
          <p className="mt-10 text-xs uppercase tracking-[0.35em] text-gold">— Camille Ordonnaud, fondatrice</p>
        </Reveal>
      </section>

      {/* TIMELINE */}
      <section className="border-y border-border bg-ink/60">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-32">
          <Reveal className="mb-20 text-center">
            <p className="eyebrow">Chronologie</p>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-foreground">
              Quatre <span className="italic text-gold-gradient">chapitres</span>
            </h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
            <div className="space-y-24">
              {CHAPTERS.map((c, i) => (
                <Reveal key={c.y} delay={i * 100} className={`relative grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                  <div className={`pl-12 md:pl-0 md:px-12 [direction:ltr]`}>
                    <div className="font-display text-7xl text-gold-gradient">{c.y}</div>
                    <div className="gold-rule mt-4 w-16" />
                    <h3 className="mt-6 font-display text-4xl text-foreground">{c.t}</h3>
                    <p className="mt-4 font-serif text-xl text-foreground/70 leading-relaxed">{c.d}</p>
                  </div>
                  <div className="hidden md:block" />
                  <span className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 h-4 w-4 rounded-full bg-gold shadow-[0_0_0_6px_var(--ink),0_0_20px_var(--gold)]" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 py-32 grid md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative aspect-square overflow-hidden">
            <img src={ingredients} alt="" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="eyebrow">Le Savoir-Faire</p>
          <h2 className="mt-6 font-display text-5xl md:text-6xl text-foreground">
            Slow, <span className="italic text-gold-gradient">unreasonable</span>, ours.
          </h2>
          <div className="gold-rule mt-8 w-24" />
          <p className="mt-8 font-serif text-xl leading-relaxed text-foreground/75">
            Every extrait is macerated for a minimum of six months. We reject
            synthetic musks that shout, and we hunt the world for the raw
            materials others deem too fragile, too costly, too old-fashioned.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              ["Oud Cambodgien", "Wild-harvested"],
              ["Rose de Mai", "Grasse · France"],
              ["Ambre Gris", "Sri Lanka"],
              ["Iris Pallida", "Tuscany"],
            ].map(([a, b]) => (
              <div key={a} className="border-l border-gold/40 pl-4">
                <div className="font-display text-2xl text-foreground">{a}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{b}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FULL BLEED */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={hero} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 h-full flex items-center justify-center px-6 text-center">
          <Reveal>
            <p className="eyebrow">Une Invitation</p>
            <p className="mt-8 font-display text-4xl md:text-6xl leading-tight text-foreground max-w-4xl">
              "Wear a fragrance not to be liked, but to be <span className="italic text-gold-gradient">remembered</span>."
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
