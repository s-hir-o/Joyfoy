import { createFileRoute } from "@tanstack/react-router";
import maison from "@/assets/maison.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison d'Ombre" },
      { name: "description", content: "Reserve a private olfactory consultation at our Paris or Milan ateliers, or write to us in confidence." },
      { property: "og:title", content: "Contact — Maison d'Ombre" },
      { property: "og:description", content: "Book a private consultation or write to us in confidence." },
    ],
  }),
  component: Contact,
});

const BOUTIQUES = [
  { c: "Paris", a: "4 rue de Castiglione · 75001", h: "Lun — Sam · 11h → 19h30", t: "+33 1 42 60 18 22" },
  { c: "Milano", a: "Via della Spiga 15 · 20121", h: "Mar — Sab · 10h → 19h", t: "+39 02 7639 4411" },
  { c: "Tokyo", a: "Ginza 6-8-1 · Chuo-ku", h: "Daily · 12h → 20h", t: "+81 3 6215 9800" },
];

function Contact() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[440px] overflow-hidden">
        <img src={maison} alt="" className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        <div className="relative z-10 mx-auto max-w-[1600px] h-full flex flex-col justify-end px-6 md:px-12 pb-16">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-6 font-display text-7xl md:text-9xl leading-[0.9] text-foreground">
              Écrivez-nous<br />
              <span className="italic text-gold-gradient">en confidence</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-12 py-24 grid md:grid-cols-5 gap-16">
        <Reveal className="md:col-span-3">
          <p className="eyebrow">Consultation Privée</p>
          <h2 className="mt-6 font-display text-4xl md:text-5xl text-foreground">
            An hour, a nose, <span className="italic text-gold-gradient">a thousand confidences</span>.
          </h2>
          <p className="mt-6 font-serif text-lg text-foreground/70 max-w-lg">
            Reserve a one-hour olfactory portrait with one of our advisors. We
            respond in confidence within 24 hours.
          </p>

          <form className="mt-12 grid gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <Field label="Prénom" />
              <Field label="Nom" />
            </div>
            <Field label="Email" type="email" />
            <Field label="Téléphone" type="tel" />
            <div>
              <label className="eyebrow block mb-4">Atelier souhaité</label>
              <div className="flex flex-wrap gap-3">
                {["Paris", "Milano", "Tokyo"].map((b) => (
                  <label key={b} className="cursor-pointer">
                    <input type="radio" name="boutique" className="peer sr-only" defaultChecked={b === "Paris"} />
                    <span className="inline-block border border-border px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-foreground/70 peer-checked:border-gold peer-checked:text-gold transition-colors">
                      {b}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="eyebrow block mb-3">Votre confidence</label>
              <textarea
                rows={5}
                className="w-full bg-transparent border-b border-border py-3 font-serif text-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold transition-colors resize-none"
                placeholder="Parlez-nous des fragrances qui vous ont marqué..."
              />
            </div>
            <div className="pt-6">
              <button className="btn-luxe" type="submit">Envoyer en confidence</button>
            </div>
          </form>
        </Reveal>

        <Reveal delay={200} className="md:col-span-2 space-y-12">
          <div>
            <p className="eyebrow">Les Boutiques</p>
            <div className="mt-8 space-y-10">
              {BOUTIQUES.map((b) => (
                <div key={b.c} className="border-l border-gold/40 pl-6">
                  <h3 className="font-display text-3xl text-foreground">{b.c}</h3>
                  <p className="mt-3 font-serif text-lg text-foreground/70">{b.a}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{b.h}</p>
                  <p className="mt-2 text-sm text-gold">{b.t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-10">
            <p className="eyebrow">Presse & Partenariats</p>
            <p className="mt-4 font-serif text-lg text-foreground/80">presse@maisondombre.paris</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="eyebrow block mb-3">{label}</label>
      <input
        type={type}
        className="w-full bg-transparent border-b border-border py-3 font-serif text-lg text-foreground focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  );
}
