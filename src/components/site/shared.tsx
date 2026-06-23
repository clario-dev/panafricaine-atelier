import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import logoAsset from "@/assets/logo.asset.json";

// ---- Collections data ------------------------------------------------------
import collAgbada from "@/assets/collection-agbada.jpg";
import collHorizon from "@/assets/collection-horizon.jpg";
import collSurMesure from "@/assets/collection-surmesure.jpg";
import embroidery from "@/assets/atelier-embroidery.jpg";
import gAgbada1 from "@/assets/gallery-agbada-1.jpg";
import gAgbada2 from "@/assets/gallery-agbada-2.jpg";
import gHorizon1 from "@/assets/gallery-horizon-1.jpg";
import gHorizon2 from "@/assets/gallery-horizon-2.jpg";
import gFemmes1 from "@/assets/gallery-femmes-1.jpg";
import gFemmes2 from "@/assets/gallery-femmes-2.jpg";
import gSurMesure1 from "@/assets/gallery-surmesure-1.jpg";
import gSurMesure2 from "@/assets/gallery-surmesure-2.jpg";

export type Collection = {
  slug: string;
  n: string;
  title: string;
  tag: string;
  tagline: string;
  desc: string;
  longDesc: string;
  cover: string;
  gallery: { src: string; w: number; h: number; alt: string }[];
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "agbada-prestige",
    n: "01",
    title: "Agbada & Prestige",
    tag: "Cérémonie",
    tagline: "Tailleur cérémoniel de haute tradition",
    desc: "Brodé main, fil d'or, étoffes nobles d'Afrique de l'Ouest.",
    longDesc:
      "L'Agbada réinventée — silhouette monumentale, broderie or à la main, étoffes d'Iseyin et de Bamako. Une pièce cérémonielle pensée pour celles et ceux qui considèrent le vêtement comme une architecture vivante.",
    cover: collAgbada,
    gallery: [
      { src: gAgbada1, w: 1280, h: 1600, alt: "Agbada doré porté en studio" },
      { src: gAgbada2, w: 1600, h: 1200, alt: "Broderie or sur soie noire" },
      { src: collAgbada, w: 1280, h: 1600, alt: "Détail cérémoniel" },
      { src: embroidery, w: 1080, h: 1600, alt: "Broderie main fil d'or" },
    ],
  },
  {
    slug: "ligne-horizon",
    n: "02",
    title: "Ligne Horizon",
    tag: "Executive",
    tagline: "Vestiaire exécutif moderne",
    desc: "Coupe sculptée, étoffes techniques, allure architecturée.",
    longDesc:
      "La Ligne Horizon est le vestiaire d'un panafricanisme contemporain — costumes deux-pièces aux épaules naturelles, étoffes italiennes, finitions invisibles. Le pouvoir au quotidien, taillé sans concession.",
    cover: collHorizon,
    gallery: [
      { src: gHorizon1, w: 1280, h: 1600, alt: "Costume noir exécutif" },
      { src: gHorizon2, w: 1600, h: 1200, alt: "Détail boutonnage costume" },
      { src: collHorizon, w: 1280, h: 1600, alt: "Vestiaire exécutif" },
    ],
  },
  {
    slug: "femmes-couture",
    n: "03",
    title: "Femmes Couture",
    tag: "Féminin",
    tagline: "Robes d'exception & cérémonie féminine",
    desc: "Drapés sculptés, perlages, broderies fil d'or.",
    longDesc:
      "Pour la femme panafricaine moderne : robes longues, drapés sculptés, broderies de perles et fil d'or. Chaque création est patronnée individuellement, dans le silence de l'atelier.",
    cover: gFemmes1,
    gallery: [
      { src: gFemmes1, w: 1280, h: 1600, alt: "Robe ivoire cérémonielle" },
      { src: gFemmes2, w: 1280, h: 1600, alt: "Détail épaule brodée or" },
      { src: embroidery, w: 1080, h: 1600, alt: "Détail broderie" },
    ],
  },
  {
    slug: "atelier-sur-mesure",
    n: "04",
    title: "L'Atelier Sur-Mesure",
    tag: "Exclusif",
    tagline: "Créations uniques — sur invitation",
    desc: "Dialogue d'une vie entre client et artisan.",
    longDesc:
      "Notre service le plus rare : une création unique, conçue à quatre mains avec vous, dans nos ateliers de Cotonou et Lomé. Choix des étoffes, croquis, patronage individuel, deux à trois essayages.",
    cover: collSurMesure,
    gallery: [
      { src: collSurMesure, w: 1280, h: 1600, alt: "Pièce sur-mesure" },
      { src: gSurMesure1, w: 1600, h: 1200, alt: "Atelier — patronage" },
      { src: gSurMesure2, w: 1280, h: 1600, alt: "Étoffes nobles pliées" },
    ],
  },
];

// ---- Contact ---------------------------------------------------------------
export const CONTACT = {
  phone: "+229 01 96 68 35 57",
  phoneHref: "tel:+22901966835557",
  email: "atelier@couture-panafricaine.com",
  cities: ["Cotonou — Bénin", "Lomé — Togo"],
};

// ---- Nav -------------------------------------------------------------------
const NAV: { label: string; to: string; sub?: { label: string; to: string }[] }[] = [
  { label: "Accueil", to: "/" },
  { label: "L'Atelier", to: "/atelier" },
  {
    label: "Collections",
    to: "/collections",
    sub: [
      { label: "Toutes les collections", to: "/collections" },
      ...COLLECTIONS.map((c) => ({
        label: c.title,
        to: `/collections/${c.slug}`,
      })),
    ],
  },
  { label: "Sur-Mesure", to: "/sur-mesure" },
  { label: "Consultation", to: "/consultation" },
  { label: "Contact", to: "/contact" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <img src={logoAsset.url} alt="Couture Panafricaine" className="h-9 w-9 object-contain" />
      <div className="hidden sm:flex flex-col leading-none">
        <span className="font-display text-[15px] tracking-tight text-ivory">COUTURE</span>
        <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">Panafricaine</span>
      </div>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenSub(null);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed left-4 right-4 z-50 transition-all duration-500 ${scrolled ? "top-3" : "top-6"}`}
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            if (item.sub) {
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setOpenSub(item.to)}
                  onMouseLeave={() => setOpenSub(null)}
                >
                  <Link
                    to={item.to}
                    className={`group relative inline-flex items-center gap-1 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                      isActive ? "text-accent" : "text-ivory/70 hover:text-accent"
                    }`}
                  >
                    {item.label}
                    <svg width="8" height="8" viewBox="0 0 8 8" className="opacity-60">
                      <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                  </Link>
                  <AnimatePresence>
                    {openSub === item.to && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                      >
                        <div className="glass-panel min-w-[260px] rounded-2xl p-2">
                          {item.sub.map((s) => (
                            <Link
                              key={s.to}
                              to={s.to}
                              className="block rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/75 transition-colors hover:bg-accent/10 hover:text-accent"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  isActive ? "text-accent" : "text-ivory/70 hover:text-accent"
                }`}
              >
                {item.label}
                <span className={`absolute bottom-1 left-4 right-4 h-px bg-accent transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/consultation"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-all hover:bg-accent hover:text-ink"
          >
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Réserver
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className={`h-px w-5 bg-ivory transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-ivory transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel mt-2 rounded-3xl p-6 lg:hidden"
          >
            {NAV.map((item) =>
              item.sub ? (
                <div key={item.to} className="border-b border-border/50">
                  <button
                    onClick={() => setMobileSubOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-3 font-display text-2xl text-ivory hover:text-accent"
                  >
                    {item.label}
                    <span className={`transition-transform ${mobileSubOpen ? "rotate-180" : ""}`}>⌄</span>
                  </button>
                  <AnimatePresence>
                    {mobileSubOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 pl-4">
                          {item.sub.map((s) => (
                            <Link
                              key={s.to}
                              to={s.to}
                              className="block py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/70 hover:text-accent"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block border-b border-border/50 py-3 font-display text-2xl text-ivory hover:text-accent"
                >
                  {item.label}
                </Link>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function AfricaOutline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 600" fill="none" className={className} aria-hidden>
      <path
        d="M232 32c-30 4-58 24-72 42-12 16-22 36-22 50 0 12 6 22 4 38-2 18-18 36-22 56-4 18 6 32 4 50-2 14-14 22-12 38 2 14 16 22 14 36-2 12-16 20-12 36 4 18 28 26 30 44 2 16-14 28-10 44 4 14 24 18 32 32 10 18-2 38 8 56 12 22 40 24 56 42 14 16 14 40 30 54 14 12 38 10 56 22 18 12 24 36 42 46 16 8 38 4 52 14 14 10 16 32 28 44 12 12 32 12 44 24 8 10 8 28 16 36 14-2 28-14 38-30 12-20 14-46 26-66 16-26 46-40 56-68 8-22-4-46 4-68 8-22 32-32 38-54 6-22-10-44-6-66 4-22 26-36 28-58 2-22-20-40-20-62 0-22 22-40 18-62-4-22-30-32-38-52-8-20 4-44-6-62-12-22-42-26-58-44-14-16-12-42-28-56-16-14-42-12-58-26-14-12-14-34-30-44-22-14-50-4-72-16-22-12-30-40-54-46-22-6-46 12-66 10z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[10px] tracking-[0.3em] text-accent">{index}</span>
      <span className="hairline w-12" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden lg:block"
      style={{
        background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, rgba(220,235,0,0.06), transparent 60%)`,
        transition: "background 0.15s linear",
      }}
    />
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-ink px-6 pt-24 pb-10 lg:px-16">
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[60vw] max-w-[800px] text-accent/[0.04]">
        <AfricaOutline className="w-full" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-ivory/55">
              Maison de couture panafricaine. Créations sur mesure pour celles
              et ceux qui considèrent le vêtement comme un manifeste.
            </p>
            <div className="mt-10">
              <span className="eyebrow">Newsletter privée</span>
              <form className="mt-4 flex items-center border-b border-border focus-within:border-accent transition-colors">
                <input
                  type="email"
                  placeholder="votre@adresse.com"
                  className="flex-1 bg-transparent py-3 text-ivory placeholder:text-ivory/30 focus:outline-none"
                />
                <button className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent hover:translate-x-1 transition-transform">
                  S'inscrire →
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-3">
            <span className="eyebrow">Atelier</span>
            <address className="mt-6 not-italic text-sm leading-relaxed text-ivory/70">
              {CONTACT.cities.map((c) => (
                <div key={c}>{c}</div>
              ))}
              <a className="mt-3 inline-block text-ivory hover:text-accent" href={CONTACT.phoneHref}>
                {CONTACT.phone}
              </a>
              <br />
              <a className="mt-1 inline-block text-ivory hover:text-accent" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </address>
          </div>

          <div className="lg:col-span-2">
            <span className="eyebrow">Maison</span>
            <ul className="mt-6 space-y-3 text-sm text-ivory/70">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-accent">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <span className="eyebrow">Suivre</span>
            <ul className="mt-6 space-y-3 text-sm text-ivory/70">
              {["Instagram", "Pinterest", "Vimeo", "LinkedIn"].map((s) => (
                <li key={s}><a href="#" className="hover:text-accent">{s}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/40 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Couture Panafricaine — Tous droits réservés</span>
          <span>L'Art de la Mesure · L'Héritage en Mouvement</span>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-ivory">
      <CursorGlow />
      <Nav />
      {children}
      <Footer />
    </main>
  );
}

export function PageHero({
  eyebrow,
  title,
  italic,
  intro,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: string;
}) {
  return (
    <section className="relative px-6 pt-40 pb-20 lg:px-16 lg:pt-48 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="—" label={eyebrow} />
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-5xl text-[clamp(2.5rem,7vw,6.5rem)] font-display text-ivory">
            {title}
            {italic && (
              <>
                {" "}
                <span className="italic font-light text-accent">{italic}</span>
              </>
            )}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-ivory/65 md:text-lg">{intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
