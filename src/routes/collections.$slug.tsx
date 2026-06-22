import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { COLLECTIONS, PageShell, Reveal, SectionLabel } from "@/components/site/shared";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = COLLECTIONS.find((c) => c.slug === params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.collection;
    return {
      meta: [
        { title: c ? `${c.title} — Couture Panafricaine` : "Collection" },
        { name: "description", content: c?.longDesc ?? "" },
        { property: "og:title", content: c ? `${c.title} — Couture Panafricaine` : "Collection" },
        { property: "og:description", content: c?.tagline ?? "" },
        ...(c ? [{ property: "og:image", content: c.cover }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pt-48 pb-32 text-center">
        <h1 className="font-display text-5xl text-ivory">Collection introuvable</h1>
        <p className="mt-4 text-ivory/60">Cette collection n'existe pas ou plus.</p>
        <Link to="/collections" className="btn-luxe mt-10 inline-flex">
          Voir toutes les collections <span>→</span>
        </Link>
      </div>
    </PageShell>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection: c } = Route.useLoaderData();
  const next = COLLECTIONS[(COLLECTIONS.findIndex((x) => x.slug === c.slug) + 1) % COLLECTIONS.length];

  return (
    <PageShell>
      {/* Hero with cover */}
      <section className="relative min-h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={c.cover} alt={c.title} className="h-full w-full object-cover opacity-50" width={1280} height={1600} />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        </div>

        <div className="relative flex min-h-[85vh] flex-col justify-end px-6 pb-20 pt-40 lg:px-16 lg:pb-32 lg:pt-48">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <SectionLabel index={`N° ${c.n}`} label={c.tag} />
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 max-w-5xl text-[clamp(2.5rem,8vw,7rem)] font-display text-ivory">
                {c.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 font-display italic text-2xl text-accent lg:text-3xl">{c.tagline}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-ivory/70 md:text-lg">
                {c.longDesc}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery — editorial masonry */}
      <section className="relative px-6 py-32 lg:px-16 lg:py-48">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel index="—" label="Galerie" />
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {c.gallery.map((img: { src: string; w: number; h: number; alt: string }, i: number) => {
              const isHero = i === 0;
              const span = isHero
                ? "lg:col-span-7 lg:row-span-2"
                : i % 3 === 1
                  ? "lg:col-span-5"
                  : "lg:col-span-6";
              const aspect = isHero ? "aspect-[4/5]" : img.w > img.h ? "aspect-[4/3]" : "aspect-[3/4]";
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <figure className={`group relative overflow-hidden rounded-sm bg-graphite ${span}`}>
                    <div className={`relative ${aspect}`}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        width={img.w}
                        height={img.h}
                        className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-border transition-all duration-700 group-hover:ring-accent/50" />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-5 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <span>{img.alt}</span>
                      <span>{String(i + 1).padStart(2, "0")} / {String(c.gallery.length).padStart(2, "0")}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-sm border border-border bg-graphite/40 p-10 lg:grid-cols-2 lg:p-16">
          <div>
            <span className="eyebrow">Commander une création</span>
            <h2 className="mt-5 font-display text-3xl text-ivory lg:text-5xl">
              Faites-vous tailler une pièce <span className="italic font-light text-accent">de la collection {c.title}.</span>
            </h2>
            <p className="mt-6 max-w-md text-ivory/65 leading-relaxed">
              Un conseiller de la Maison vous accompagne dès la première consultation, jusqu'à
              la remise cérémonielle de votre pièce.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 lg:items-end">
            <Link to="/consultation" className="btn-luxe">
              Réserver une consultation <span>→</span>
            </Link>
            <Link
              to="/collections/$slug"
              params={{ slug: next.slug }}
              className="btn-ghost-luxe"
            >
              Collection suivante : {next.title} <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
