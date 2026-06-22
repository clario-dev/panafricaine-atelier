import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroDrape from "@/assets/hero-drape.jpg";
import embroidery from "@/assets/atelier-embroidery.jpg";
import {
  AfricaOutline,
  COLLECTIONS,
  PageShell,
  Reveal,
  SectionLabel,
} from "@/components/site/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Couture Panafricaine — L'Art de la Mesure" },
      { name: "description", content: "Maison de couture panafricaine sur-mesure. Créations exclusives où l'excellence artisanale rencontre l'élégance contemporaine africaine. Ateliers Cotonou & Lomé." },
      { property: "og:title", content: "Couture Panafricaine — L'Art de la Mesure" },
      { property: "og:description", content: "Maison de couture panafricaine sur-mesure." },
    ],
  }),
  component: Index,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img src={heroDrape} alt="" className="h-full w-full object-cover opacity-50" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
      </motion.div>

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
          Des créations sur mesure où l'excellence artisanale rencontre l'élégance contemporaine
          africaine. Ateliers Cotonou & Lomé.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <Link to="/consultation" className="btn-luxe">
            Réserver une Consultation <span aria-hidden>→</span>
          </Link>
          <Link to="/collections" className="btn-ghost-luxe">
            Découvrir les Collections
          </Link>
        </motion.div>

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

function AtelierTeaser() {
  return (
    <section className="relative px-6 py-32 lg:px-16 lg:py-48">
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
              <span className="font-mono text-xs text-ivory/40">N°001 — Atelier Cotonou</span>
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
                Au cœur de notre maison — entre Cotonou et Lomé — chaque pièce naît d'un dialogue
                entre l'héritage panafricain et la rigueur d'une coupe contemporaine.
              </p>
              <p>
                Costumes d'apparat, agbadas cérémoniels, robes d'exception : nos artisans
                conjuguent étoffes nobles, broderies main et finitions invisibles dans un seul
                geste — celui de la précision.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Link to="/atelier" className="btn-ghost-luxe">
                Découvrir l'Atelier <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---- Spectacular Collections Showcase --------------------------------------
function CollectionsMarquee() {
  // duplicate the list for seamless loop
  const loop = [...COLLECTIONS, ...COLLECTIONS, ...COLLECTIONS];

  return (
    <section className="relative overflow-hidden py-32 lg:py-48">
      <div className="px-6 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div className="max-w-2xl">
              <SectionLabel index="02" label="Collections" />
              <h2 className="mt-8 text-[clamp(2.25rem,5vw,4.5rem)] font-display text-ivory">
                Quatre lignes. <br />
                <span className="text-accent italic font-light">Un seul geste.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm text-ivory/60 leading-relaxed">
              Du cérémoniel à l'exécutif, du féminin à l'unique — chaque collection traduit une
              part du vocabulaire panafricain contemporain.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Cinematic auto-scrolling reel */}
      <div className="relative mt-20">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent lg:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent lg:w-48" />

        <motion.div
          className="flex gap-6 lg:gap-10 will-change-transform"
          animate={{ x: ["0%", "-33.3333%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((c, i) => (
            <Link
              key={`${c.slug}-${i}`}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="group relative block shrink-0 overflow-hidden rounded-sm"
              style={{ width: "min(78vw, 480px)" }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-graphite">
                <img
                  src={c.cover}
                  alt={c.title}
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="h-full w-full object-cover transition-transform duration-[2400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-border transition-all duration-700 group-hover:ring-accent/60" />

                <span className="absolute left-5 top-5 rounded-full border border-ivory/20 bg-ink/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-ivory backdrop-blur">
                  {c.tag}
                </span>
                <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/50">
                  N° {c.n}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    Collection
                  </div>
                  <h3 className="mt-3 font-display text-3xl text-ivory lg:text-4xl">{c.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-ivory/65 leading-relaxed">
                    {c.tagline}
                  </p>
                  <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/70 transition-all duration-500 group-hover:gap-4 group-hover:text-accent">
                    Explorer
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 flex justify-center">
        <Link to="/collections" className="btn-luxe">
          Voir toutes les collections <span>→</span>
        </Link>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    { t: "Excellence artisanale", d: "Le geste avant la machine, toujours." },
    { t: "Créations uniques", d: "Aucune pièce ne ressemble à une autre." },
    { t: "Héritage panafricain", d: "Une mémoire textile traversée par le présent." },
    { t: "Service personnalisé", d: "Une conversation, pas une transaction." },
  ];
  return (
    <section className="relative px-6 py-32 lg:px-16 lg:py-48">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="03" label="Engagement & Excellence" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-3xl text-[clamp(2rem,4.5vw,4rem)] font-display text-ivory">
            Quatre principes <br />
            <span className="text-accent italic font-light">non négociables.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
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

function Index() {
  return (
    <PageShell>
      <Hero />
      <AtelierTeaser />
      <CollectionsMarquee />
      <Pillars />
    </PageShell>
  );
}
