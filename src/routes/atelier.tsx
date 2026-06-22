import { createFileRoute, Link } from "@tanstack/react-router";
import embroidery from "@/assets/atelier-embroidery.jpg";
import surmesure1 from "@/assets/gallery-surmesure-1.jpg";
import surmesure2 from "@/assets/gallery-surmesure-2.jpg";
import { PageHero, PageShell, Reveal, SectionLabel, CONTACT } from "@/components/site/shared";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "L'Atelier — Couture Panafricaine" },
      { name: "description", content: "Au cœur de nos ateliers de Cotonou et Lomé : artisans, étoffes nobles et coupe sur-mesure d'inspiration panafricaine." },
      { property: "og:title", content: "L'Atelier — Couture Panafricaine" },
      { property: "og:description", content: "Cotonou & Lomé — l'atelier d'une nouvelle génération de couture." },
      { property: "og:image", content: embroidery },
    ],
  }),
  component: AtelierPage,
});

const STEPS = [
  { n: "I", title: "Consultation Privée", desc: "Échange intime sur la création et le port souhaité." },
  { n: "II", title: "Sélection des Étoffes", desc: "Curation d'étoffes nobles et de matières précieuses." },
  { n: "III", title: "Conception & Patronage", desc: "Patron individuel taillé à vos 32 mensurations." },
  { n: "IV", title: "Ajustements", desc: "Deux à trois essayages dans le silence de l'atelier." },
  { n: "V", title: "Livraison Exclusive", desc: "Remise cérémonielle, écrin signé Couture Panafricaine." },
];

function AtelierPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="L'Atelier"
        title="Une nouvelle génération"
        italic="de couture."
        intro="Entre Cotonou et Lomé, deux ateliers d'exception conjuguent l'héritage textile panafricain et la rigueur d'une coupe contemporaine. Pour celles et ceux qui considèrent le vêtement comme une architecture."
      />

      {/* Two-col editorial */}
      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal>
            <div className="lg:col-span-5">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={embroidery}
                  alt="Broderie or sur étoffe noire — atelier"
                  loading="lazy"
                  width={1080}
                  height={1600}
                  className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-border" />
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <span className="eyebrow">Détail · Broderie d'or</span>
                <span className="font-mono text-xs text-ivory/40">N°001 — Cotonou</span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:pt-8">
            <Reveal>
              <div className="space-y-6 text-ivory/65 leading-relaxed text-base lg:text-lg">
                <p>
                  Notre maison est née d'une conviction : la couture panafricaine méritait sa
                  propre grammaire de luxe, ni copie d'Europe, ni folklore — une voix neuve,
                  exigeante, contemporaine.
                </p>
                <p>
                  Nos ateliers de Cotonou et Lomé réunissent maîtres brodeurs, tailleurs et
                  fileurs autour d'une seule discipline : la précision du geste. Chaque agbada,
                  chaque robe, chaque costume est patronné individuellement.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10">
                {[
                  { k: "Étoffes", v: "Sélectionnées en Afrique de l'Ouest, Italie & Japon" },
                  { k: "Coupe", v: "Patronage individuel à partir de 32 mensurations" },
                  { k: "Finitions", v: "Surpiqûres et broderies main exclusivement" },
                  { k: "Délai", v: "De 6 à 12 semaines selon la création" },
                  { k: "Ateliers", v: "Cotonou (Bénin) · Lomé (Togo)" },
                  { k: "Contact", v: CONTACT.phone },
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

      {/* Process */}
      <section className="relative px-6 py-32 lg:px-16 lg:py-48 grain">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel index="02" label="Savoir-Faire Signature" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] font-display text-ivory">
              Cinq gestes. <span className="text-accent italic font-light">Une seule pièce.</span>
            </h2>
          </Reveal>

          <div className="mt-24 relative">
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

      {/* Atelier images */}
      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img src={surmesure1} alt="Atelier — patronage à la main" loading="lazy" width={1600} height={1200} className="h-full w-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-border" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img src={surmesure2} alt="Étoffes nobles pliées" loading="lazy" width={1280} height={1600} className="h-full w-full object-cover" />
              <div className="absolute inset-0 ring-1 ring-inset ring-border" />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex justify-center">
          <Link to="/consultation" className="btn-luxe">
            Réserver une consultation <span>→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
