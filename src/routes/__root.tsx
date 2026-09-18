import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 font-serif text-6xl text-foreground">Page introuvable</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you seek has drifted like a fleeting fragrance.
        </p>
        <div className="mt-10">
          <Link to="/" className="btn-luxe">Return to Maison</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">A moment</p>
        <h1 className="mt-6 font-serif text-4xl text-foreground">This page did not unfold</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-luxe">Try again</button>
          <Link to="/" className="btn-luxe">Go home</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maison d'Ombre — Rare Parfums de Paris" },
      { name: "description", content: "An independent Parisian house dedicated to rare, radical and confidential fragrances." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: `${import.meta.env.BASE_URL}fragrance-icon.svg`, type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Italiana&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const NAV = [
  { to: "/", label: "Maison" },
  { to: "/collection", label: "Collection" },
  { to: "/story", label: "Histoire" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 transition-all duration-500 mx-auto max-w-[1600px] px-4 md:px-8`}
    >
      <div className={`glass rounded-full transition-all duration-500 ${scrolled ? "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]" : ""}`}>
      <div className="flex items-center justify-between px-6 md:px-8 py-3">

        <Link to="/" className="group flex items-center gap-3">
          <span className="font-display text-2xl tracking-widest text-gold">M<span className="text-foreground/60">·</span>O</span>
          <span className="hidden sm:block h-4 w-px bg-border" />
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Maison d'Ombre · Paris</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-underline text-[11px] uppercase tracking-[0.28em] text-foreground/80 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-6">
          <button className="text-[11px] uppercase tracking-[0.28em] text-foreground/60 hover:text-gold transition-colors">EN / FR</button>
          <button className="btn-luxe py-2.5 px-5 text-[10px]">Boutique</button>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-gold text-xs tracking-[0.3em] uppercase"
          aria-label="Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      </div>
      {open && (
        <div className="md:hidden mt-2 glass rounded-2xl">
          <div className="flex flex-col px-6 py-6 gap-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-foreground/80"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink text-foreground/70">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-widest text-gold">MAISON D'OMBRE</div>
          <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-foreground/70">
            Parfums rares et confidentiels, imaginés à Paris depuis 2011.
            An independent house for the connoisseurs of shadow and light.
          </p>
          <div className="gold-rule mt-10 max-w-xs" />
          <p className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
            4 rue de Castiglione · 75001 Paris
          </p>
        </div>
        <div>
          <p className="eyebrow mb-6">Maison</p>
          <ul className="space-y-3 text-sm font-serif">
            <li><Link to="/collection" className="hover:text-gold transition-colors">La Collection</Link></li>
            <li><Link to="/story" className="hover:text-gold transition-colors">Notre Histoire</Link></li>
            <li><Link to="/journal" className="hover:text-gold transition-colors">Le Journal</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Nous écrire</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-6">Confidences</p>
          <p className="text-sm text-muted-foreground mb-4">
            Recevez nos parutions et invitations privées.
          </p>
          <form className="flex border-b border-border pb-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none"
            />
            <button className="text-xs tracking-[0.28em] uppercase text-gold hover:text-foreground transition-colors">→</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Maison d'Ombre · Tous droits réservés</span>
          <span>Paris — Milan — Tokyo</span>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <div className="min-h-screen bg-background flex flex-col grain">
        <Header />
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
