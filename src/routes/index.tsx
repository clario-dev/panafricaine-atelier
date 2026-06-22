import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/logo.asset.json";
import heroDrape from "@/assets/hero-drape.jpg";
import embroidery from "@/assets/atelier-embroidery.jpg";
import collAgbada from "@/assets/collection-agbada.jpg";
import collHorizon from "@/assets/collection-horizon.jpg";
import collSurMesure from "@/assets/collection-surmesure.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Couture Panafricaine — L'Art de la Mesure" },
      { name: "description", content: "Maison de couture panafricaine sur-mesure. Créations exclusives où l'excellence artisanale rencontre l'élégance contemporaine africaine." },
      { property: "og:title", content: "Couture Panafricaine — L'Art de la Mesure" },
      { property: "og:description", content: "Maison de couture panafricaine sur-mesure." },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Accueil", href: "#accueil" },
  { label: "L'Atelier", href: "#atelier" },
  { label: "Collections", href: "#collections" },
  { label: "Sur-Mesure", href: "#sur-mesure" },
  { label: "Consultation", href: "#consultation" },
  { label: "Contact", href: "#contact" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#accueil" className={`flex items-center gap-3 ${className}`}>
      <img src={logoAsset.url} alt="Couture Panafricaine" className="h-9 w-9 object-contain" />
      <div className="hidden sm:flex flex-col leading-none">
        <span className="font-display text-[15px] tracking-tight text-ivory">COUTURE</span>
        <span className="font-mono text-[9px] tracking-[0.3em] text-accent uppercase">Panafricaine</span>
      </div>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
        scrolled ? "top-3" : "top-6"
      }`}
    >
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-accent"
            >
              {item.label}
              <span className="absolute bottom-1 left-4 right-4 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#consultation" className="hidden md:inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-all hover:bg-accent hover:text-ink">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Réserver
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
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
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border/50 py-3 font-display text-2xl text-ivory hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function AfricaOutline({ className = "" }: { className?: string }) {
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

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="accueil" ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img
          src={heroDrape}
          alt=""
          className="h-full w-full object-cover opacity-50"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
      </motion.div>

      {/* Africa outline */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2.5, delay: 0.5 }}
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 w-[55vw] max-w-[700px] text-accent"
      >
        <AfricaOutline className="w-full" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative flex min-h-screen flex-col justify-center px-6 pt-32 pb-24 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="hairline w-12" />
          <span className="eyebrow">Maison · Établie · Sur-Mesure</span>
        </motion.div>

        <h1 className="max-w-5xl text-[clamp(2.75rem,9vw,8.5rem)] font-display text-ivory">
          {["L'Art de la", "Mesure,"].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
            className="block italic font-light text-accent"
            style={{ fontFamily: '"Clash Display", serif', fontStyle: "italic" }}
          >
            L'Héritage en Mouvement.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-10 max-w-xl text-base leading-relaxed text-ivory/65 md:text-lg"
        >
          Des créations sur mesure où l'excellence artisanale rencontre l'élégance
          contemporaine africaine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a href="#consultation" className="btn-luxe">
            Réserver une Consultation
            <span aria-hidden>→</span>
          </a>
          <a href="#collections" className="btn-ghost-luxe">
            Découvrir les Collections
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/40">Scroll</span>
          <div className="h-12 w-px overflow-hidden bg-ivory/15">
            <motion.div
              animate={{ y: [-48, 48] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-6 w-px bg-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[10px] tracking-[0.3em] text-accent">{index}</span>
      <span className="hairline w-12" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

function Atelier() {
  return (
    <section id="atelier" className="relative px-6 py-32 lg:px-16 lg:py-48">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal>
          <div className="lg:col-span-5">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={embroidery}
                alt="Broderie dorée sur étoffe noire — Couture Panafricaine"
                loading="lazy"
                width={1080}
                height={1600}
                className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-border" />
            </div>
            <div className="mt-6 flex items-baseline justify-between">
              <span className="eyebrow">Détail · Broderie d'or</span>
              <span className="font-mono text-xs text-ivory/40">N°001 — Atelier Lagos</span>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pt-16">
          <Reveal>
            <SectionLabel index="01" label="L'Atelier" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-[clamp(2.25rem,5vw,4.5rem)] font-display text-ivory">
              Une Nouvelle <br />
              Génération <br />
              <span className="text-accent italic font-light">de Couture.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 max-w-xl space-y-6 text-ivory/65 leading-relaxed">
              <p>
                Au cœur de notre maison, chaque pièce naît d'un dialogue entre l'héritage
                panafricain et la rigueur d'une coupe contemporaine. Nous taillons pour
                celles et ceux qui considèrent le vêtement comme une architecture.
              </p>
              <p>
                Costumes d'apparat, agbadas cérémoniels, robes d'exception : nos artisans
                conjuguent étoffes nobles, broderies main et finitions invisibles dans un
                seul geste — celui de la précision.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10">
              {[
                { k: "Étoffes", v: "Sélectionnées en Afrique de l'Ouest, Italie & Japon" },
                { k: "Coupe", v: "Patronage individuel à partir de 32 mensurations" },
                { k: "Finitions", v: "Surpiqûres et broderies main exclusivement" },
                { k: "Délai", v: "De 6 à 12 semaines selon la création" },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="eyebrow mb-2">{row.k}</dt>
                  <dd className="text-sm text-ivory/80 leading-relaxed">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const COLLECTIONS = [
  {
    id: "agbada",
    n: "Collection 01",
    title: "Agbada & Prestige",
    desc: "Tailleur cérémoniel de haute tradition, brodé main fil d'or.",
    img: collAgbada,
    tag: "Cérémonie",
  },
  {
    id: "horizon",
    n: "Collection 02",
    title: "Ligne Horizon",
    desc: "Vestiaire exécutif moderne, coupe sculptée, étoffes techniques.",
    img: collHorizon,
    tag: "Executive",
  },
  {
    id: "surmesure",
    n: "Collection 03",
    title: "L'Atelier Sur-Mesure",
    desc: "Créations uniques, dialogue d'une vie entre client et artisan.",
    img: collSurMesure,
    tag: "Exclusif",
  },
];

function Collections() {
  return (
    <section id="collections" className="relative px-6 py-32 lg:px-16 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div className="max-w-2xl">
              <SectionLabel index="02" label="Collections" />
              <h2 className="mt-8 text-[clamp(2.25rem,5vw,4.5rem)] font-display text-ivory">
                Trois lignes. <br />
                <span className="text-accent italic font-light">Un seul geste.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-ivory/60 leading-relaxed">
              Chaque collection traduit une part du vocabulaire panafricain
              contemporain — du cérémoniel au quotidien d'apparat.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <article
                className={`group relative overflow-hidden rounded-sm bg-graphite ${
                  i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"
                }`}
              >
                <div className={`relative ${i === 0 ? "aspect-[4/5] lg:aspect-[5/6]" : "aspect-[4/3]"} overflow-hidden`}>
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-all duration-[1600ms] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-border transition-all duration-700 group-hover:ring-accent/60" />
                  <span className="absolute left-4 top-4 rounded-full border border-ivory/20 bg-ink/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-ivory backdrop-blur">
                    {c.tag}
                  </span>
                </div>
                <div className="relative p-6 lg:p-8">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                    <span>{c.n}</span>
                    <span className="text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Explorer →
                    </span>
                  </div>
                  <h3 className={`mt-4 font-display text-ivory ${i === 0 ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"}`}>
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-ivory/55 leading-relaxed">{c.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "I", title: "Consultation Privée", desc: "Échange intime sur la création et le port souhaité." },
  { n: "II", title: "Sélection des Étoffes", desc: "Curation d'étoffes nobles et de matières précieuses." },
  { n: "III", title: "Conception & Patronage", desc: "Patron individuel taillé à vos 32 mensurations." },
  { n: "IV", title: "Ajustements", desc: "Deux à trois essayages dans le silence de l'atelier." },
  { n: "V", title: "Livraison Exclusive", desc: "Remise cérémonielle, écrin signé Couture Panafricaine." },
];

function Craftsmanship() {
  return (
    <section className="relative px-6 py-32 lg:px-16 lg:py-48 grain">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="03" label="Savoir-Faire Signature" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] font-display text-ivory">
            Cinq gestes. <span className="text-accent italic font-light">Une seule pièce.</span>
          </h2>
        </Reveal>

        <div className="mt-24 relative">
          {/* stitching line */}
          <svg
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-2 w-full lg:block text-accent/60"
            viewBox="0 0 1200 8"
            preserveAspectRatio="none"
            aria-hidden
          >
            <line x1="0" y1="4" x2="1200" y2="4" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
          <ol className="grid gap-12 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="relative">
                  <div className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-full border border-accent/40 bg-ink font-mono text-xs text-accent">
                    {s.n}
                  </div>
                  <h3 className="mt-8 text-center font-display text-xl text-ivory">{s.title}</h3>
                  <p className="mt-3 text-center text-xs leading-relaxed text-ivory/55">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const CREATIONS = [
  { id: "costume", label: "Costume", sub: "Tailleur exécutif" },
  { id: "agbada", label: "Agbada", sub: "Cérémoniel d'apparat" },
  { id: "boubou", label: "Boubou", sub: "Tradition contemporaine" },
  { id: "robe", label: "Robe de Cérémonie", sub: "Pièce d'exception" },
  { id: "exec", label: "Tenue Exécutive", sub: "Vestiaire moderne" },
  { id: "exclusive", label: "Création Exclusive", sub: "Sur invitation" },
];

const TEXTILES = [
  { id: "wool", label: "Laine Italienne", origin: "Biella, Italie", swatch: "linear-gradient(135deg,#1a1a1a,#0a0a0a)" },
  { id: "silk", label: "Soie Sauvage", origin: "Mysore, Inde", swatch: "linear-gradient(135deg,#2b2b2b,#1a1a1a 60%,#DCEB00 200%)" },
  { id: "bazin", label: "Bazin Riche", origin: "Bamako, Mali", swatch: "linear-gradient(135deg,#0c1f0c,#0a0a0a)" },
  { id: "aso", label: "Aso-Oké d'Or", origin: "Iseyin, Nigeria", swatch: "linear-gradient(135deg,#3a2e0a,#0a0a0a 70%)" },
];

function Configurator() {
  const [step, setStep] = useState(0);
  const [creation, setCreation] = useState<string | null>(null);
  const [textile, setTextile] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const steps = ["Création", "Étoffe", "Date", "Coordonnées"];
  const canNext = [creation, textile, date, true][step];

  return (
    <section id="consultation" className="relative px-6 py-32 lg:px-16 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel index="04" label="Atelier Virtuel" />
              <h2 className="mt-8 text-[clamp(2rem,4vw,3.5rem)] font-display text-ivory">
                Réservez votre <br />
                <span className="text-accent italic font-light">consultation privée.</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm text-ivory/55 leading-relaxed">
                Quatre étapes feutrées pour ouvrir le dialogue. Nos artisans
                reprennent contact sous 24 heures.
              </p>
            </Reveal>
            <div className="mt-10 hidden lg:block">
              <ol className="space-y-3">
                {steps.map((s, i) => (
                  <li
                    key={s}
                    className={`flex items-center gap-4 font-mono text-xs transition-all ${
                      i === step ? "text-accent" : i < step ? "text-ivory/50" : "text-ivory/25"
                    }`}
                  >
                    <span className={`inline-block size-6 rounded-full border text-center leading-[22px] ${i <= step ? "border-accent" : "border-border"}`}>
                      {i + 1}
                    </span>
                    <span className="uppercase tracking-[0.2em]">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="relative lg:col-span-8 glass-panel rounded-md p-8 lg:p-12">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/40">
                  Étape {step + 1} / {steps.length}
                </span>
                <div className="flex gap-1">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-px w-8 transition-all duration-700 ${
                        i <= step ? "bg-accent" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full border border-accent/40">
                      <motion.svg
                        viewBox="0 0 24 24"
                        className="size-8 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          d="M5 12l5 5L20 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>
                    <h3 className="font-display text-3xl text-ivory">Demande confirmée.</h3>
                    <p className="mt-4 text-sm text-ivory/60">
                      Un conseiller de la Maison vous contactera sous 24 heures.
                    </p>
                  </motion.div>
                ) : step === 0 ? (
                  <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="mb-8 font-display text-2xl text-ivory">Choisissez votre création</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CREATIONS.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setCreation(c.id)}
                          className={`group flex items-start justify-between gap-4 rounded-sm border p-5 text-left transition-all ${
                            creation === c.id
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-ivory/30"
                          }`}
                        >
                          <div>
                            <div className="font-display text-lg text-ivory">{c.label}</div>
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                              {c.sub}
                            </div>
                          </div>
                          <span className={`mt-1 size-3 rounded-full border transition-all ${creation === c.id ? "border-accent bg-accent" : "border-ivory/30"}`} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 1 ? (
                  <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="mb-8 font-display text-2xl text-ivory">Sélection du textile</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {TEXTILES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTextile(t.id)}
                          className={`group overflow-hidden rounded-sm border text-left transition-all ${
                            textile === t.id ? "border-accent" : "border-border hover:border-ivory/30"
                          }`}
                        >
                          <div className="aspect-[5/2] w-full" style={{ background: t.swatch }} />
                          <div className="flex items-center justify-between p-4">
                            <div>
                              <div className="font-display text-base text-ivory">{t.label}</div>
                              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                                {t.origin}
                              </div>
                            </div>
                            {textile === t.id && <span className="font-mono text-[10px] text-accent">SÉLECTIONNÉ</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="mb-8 font-display text-2xl text-ivory">Date & Heure</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <label className="block">
                        <span className="eyebrow mb-3 block">Date souhaitée</span>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full border-b border-border bg-transparent py-3 font-display text-xl text-ivory focus:border-accent focus:outline-none"
                        />
                      </label>
                      <label className="block">
                        <span className="eyebrow mb-3 block">Créneau</span>
                        <select className="w-full appearance-none border-b border-border bg-transparent py-3 font-display text-xl text-ivory focus:border-accent focus:outline-none">
                          <option className="bg-graphite">10h00 — Matin</option>
                          <option className="bg-graphite">14h00 — Après-midi</option>
                          <option className="bg-graphite">17h00 — Fin de journée</option>
                        </select>
                      </label>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <h3 className="mb-8 font-display text-2xl text-ivory">Coordonnées</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {["Prénom", "Nom", "Email", "Téléphone"].map((f) => (
                        <label key={f} className="block">
                          <span className="eyebrow mb-2 block">{f}</span>
                          <input
                            className="w-full border-b border-border bg-transparent py-3 text-ivory placeholder:text-ivory/30 focus:border-accent focus:outline-none"
                            placeholder={f}
                          />
                        </label>
                      ))}
                      <label className="block sm:col-span-2">
                        <span className="eyebrow mb-2 block">Message</span>
                        <textarea
                          rows={3}
                          className="w-full border-b border-border bg-transparent py-3 text-ivory placeholder:text-ivory/30 focus:border-accent focus:outline-none resize-none"
                          placeholder="Précisez votre projet de création…"
                        />
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!submitted && (
                <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/50 hover:text-ivory disabled:opacity-30"
                  >
                    ← Retour
                  </button>
                  {step < steps.length - 1 ? (
                    <button
                      onClick={() => canNext && setStep((s) => s + 1)}
                      disabled={!canNext}
                      className="btn-luxe disabled:opacity-40"
                    >
                      Continuer <span>→</span>
                    </button>
                  ) : (
                    <button onClick={() => setSubmitted(true)} className="btn-luxe">
                      Confirmer la demande <span>→</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  { t: "Excellence artisanale", d: "Le geste avant la machine, toujours." },
  { t: "Créations uniques", d: "Aucune pièce ne ressemble à une autre." },
  { t: "Héritage panafricain", d: "Une mémoire textile traversée par le présent." },
  { t: "Service personnalisé", d: "Une conversation, pas une transaction." },
];

function Pillars() {
  return (
    <section id="sur-mesure" className="relative px-6 py-32 lg:px-16 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="05" label="Engagement & Excellence" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-3xl text-[clamp(2rem,4.5vw,4rem)] font-display text-ivory">
            Quatre principes <br />
            <span className="text-accent italic font-light">non négociables.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-sm border border-border bg-graphite/40 p-8 transition-all duration-700 hover:-translate-y-1 hover:border-accent/40">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">0{i + 1}</span>
                <h3 className="mt-8 font-display text-2xl text-ivory leading-tight">{p.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/55">{p.d}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border bg-ink px-6 pt-24 pb-10 lg:px-16">
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
              14, Rue de l'Étoffe<br />
              Lagos · Paris · Dakar<br />
              <a className="mt-3 inline-block text-ivory hover:text-accent" href="mailto:atelier@couture-panafricaine.com">
                atelier@couture-panafricaine.com
              </a>
            </address>
          </div>

          <div className="lg:col-span-2">
            <span className="eyebrow">Maison</span>
            <ul className="mt-6 space-y-3 text-sm text-ivory/70">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-accent">{n.label}</a></li>
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

function CursorGlow() {
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

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-ivory">
      <CursorGlow />
      <Nav />
      <Hero />
      <Atelier />
      <Collections />
      <Craftsmanship />
      <Configurator />
      <Pillars />
      <Footer />
    </main>
  );
}
