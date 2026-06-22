import { createFileRoute, Link } from "@tanstack/react-router";
import surmesure1 from "@/assets/gallery-surmesure-1.jpg";
import surmesure2 from "@/assets/gallery-surmesure-2.jpg";
import { PageHero, PageShell, Reveal, SectionLabel } from "@/components/site/shared";

export const Route = createFileRoute("/sur-mesure")({
  head: () => ({
    meta: [
      { title: "Sur-Mesure — Couture Panafricaine" },
      { name: "description", content: "Notre service le plus rare : créations sur-mesure uniques, patronnées à vos 32 mensurations, dans nos ateliers de Cotonou et Lomé." },
      { property: "og:title", content: "Sur-Mesure — Couture Panafricaine" },
      { property: "og:description", content: "Une création unique, dialogue d'une vie entre client et artisan." },
      { property: "og:image", content: surmesure1 },
    ],
  }),
  component: SurMesurePage,
});

const PILLARS = [
  { t: "Excellence artisanale", d: "Le geste avant la machine, toujours." },
  { t: "Créations uniques", d: "Aucune pièce ne ressemble à une autre." },
  { t: "Héritage panafricain", d: "Une mémoire textile traversée par le présent." },
  { t: "Service personnalisé", d: "Une conversation, pas une transaction." },
];

const TEXTILES = [
  { id: "wool", label: "Laine Italienne", origin: "Biella, Italie", swatch: "linear-gradient(135deg,#1a1a1a,#0a0a0a)" },
  { id: "silk", label: "Soie Sauvage", origin: "Mysore, Inde", swatch: "linear-gradient(135deg,#2b2b2b,#1a1a1a 60%,#DCEB00 200%)" },
  { id: "bazin", label: "Bazin Riche", origin: "Bamako, Mali", swatch: "linear-gradient(135deg,#0c1f0c,#0a0a0a)" },
  { id: "aso", label: "Aso-Oké d'Or", origin: "Iseyin, Nigeria", swatch: "linear-gradient(135deg,#3a2e0a,#0a0a0a 70%)" },
];

function SurMesurePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sur-Mesure"
        title="Une création."
        italic="Une seule, pour vous."
        intro="Le sur-mesure Couture Panafricaine est notre service le plus rare — un dialogue d'une vie entre vous et nos artisans, dans le silence de nos ateliers de Cotonou et Lomé."
      />

      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img src={surmesure1} alt="Atelier sur-mesure — patronage" loading="lazy" width={1600} height={1200} className="h-full w-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-border" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <img src={surmesure2} alt="Étoffes nobles pliées" loading="lazy" width={1280} height={1600} className="h-full w-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-border" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative px-6 py-32 lg:px-16 lg:py-48">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel index="01" label="Engagement & Excellence" />
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

      {/* Textiles */}
      <section className="relative px-6 py-32 lg:px-16 lg:py-48">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel index="02" label="Textiles d'exception" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 max-w-3xl text-[clamp(2rem,4.5vw,4rem)] font-display text-ivory">
              Une bibliothèque <span className="text-accent italic font-light">d'étoffes nobles.</span>
            </h2>
          </Reveal>
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEXTILES.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <div className="overflow-hidden rounded-sm border border-border">
                  <div className="aspect-[5/3] w-full" style={{ background: t.swatch }} />
                  <div className="p-5">
                    <div className="font-display text-lg text-ivory">{t.label}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                      {t.origin}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto flex max-w-7xl justify-center">
          <Link to="/consultation" className="btn-luxe">
            Commencer une création sur-mesure <span>→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
