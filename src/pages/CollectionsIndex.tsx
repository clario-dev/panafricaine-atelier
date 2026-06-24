import { Link } from "react-router-dom";
import { COLLECTIONS, PageHero, PageShell, Reveal, SmartImage } from "@/components/site/shared";
import { Seo } from "@/components/site/Seo";

export default function CollectionsIndex() {
  return (
    <PageShell>
      <Seo
        title="Collections — Couture Panafricaine"
        description="Découvrez nos quatre collections : Agbada & Prestige, Ligne Horizon, Femmes Couture, L'Atelier Sur-Mesure."
        image={COLLECTIONS[0]?.cover.src}
      />
      <PageHero
        eyebrow="Collections"
        title="Quatre lignes."
        italic="Un seul geste."
        intro="Du cérémoniel à l'exécutif, du féminin à l'unique — chacune de nos collections traduit une part du vocabulaire panafricain contemporain."
      />

      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto max-w-7xl space-y-6">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                to={`/collections/${c.slug}`}
                className="group relative grid overflow-hidden rounded-sm border border-border bg-graphite/40 transition-all duration-700 hover:border-accent/40 md:grid-cols-12"
              >
                <div className="relative aspect-[4/5] md:col-span-5 md:aspect-auto">
                  <SmartImage
                    image={c.cover}
                    alt={c.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    sizes="(min-width: 768px) 42vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full border border-ivory/20 bg-ink/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-ivory backdrop-blur">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-8 p-8 md:col-span-7 md:p-14">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      Collection N° {c.n}
                    </div>
                    <h2 className="mt-5 font-display text-4xl text-ivory lg:text-6xl">{c.title}</h2>
                    <p className="mt-3 font-display italic text-accent text-xl">{c.tagline}</p>
                    <p className="mt-8 max-w-xl text-ivory/65 leading-relaxed">{c.longDesc}</p>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ivory/70 transition-all duration-500 group-hover:gap-5 group-hover:text-accent">
                    Découvrir la collection <span>→</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
