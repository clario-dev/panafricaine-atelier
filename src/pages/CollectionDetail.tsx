import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Expand } from "lucide-react";
import { COLLECTIONS, CONTACT, PageShell, Reveal, SectionLabel, SmartImage } from "@/components/site/shared";
import { Seo } from "@/components/site/Seo";
import { Lightbox } from "@/components/site/Lightbox";

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const c = COLLECTIONS.find((x) => x.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!c) {
    return (
      <PageShell>
        <Seo title="Collection introuvable — Couture Panafricaine" />
        <div className="mx-auto max-w-3xl px-6 pt-48 pb-32 text-center">
          <h1 className="font-display text-5xl text-ivory">Collection introuvable</h1>
          <p className="mt-4 text-ivory/60">Cette collection n'existe pas ou plus.</p>
          <Link to="/collections" className="btn-luxe mt-10 inline-flex">
            Voir toutes les collections <span>→</span>
          </Link>
        </div>
      </PageShell>
    );
  }

  const next = COLLECTIONS[(COLLECTIONS.findIndex((x) => x.slug === c.slug) + 1) % COLLECTIONS.length];

  return (
    <PageShell>
      <Seo title={`${c.title} — Couture Panafricaine`} description={c.longDesc} image={c.cover.src} />

      <section className="relative min-h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SmartImage
            image={c.cover}
            alt={c.title}
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/60 to-ink" />
        </div>

        <div className="relative flex min-h-[85vh] flex-col justify-end px-6 pb-20 pt-40 lg:px-16 lg:pb-32 lg:pt-48">
          <div className="mx-auto w-full max-w-7xl">
            <Reveal>
              <SectionLabel index={`N° ${c.n}`} label={c.tag} />
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 max-w-5xl text-[clamp(2.5rem,8vw,7rem)] font-display text-ivory">{c.title}</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 font-display italic text-2xl text-accent lg:text-3xl">{c.tagline}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-ivory/70 md:text-lg">{c.longDesc}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-32 lg:px-16 lg:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <SectionLabel index="—" label="Galerie" />
            </Reveal>
            <Reveal delay={0.1}>
              <button
                onClick={() => setLightboxIndex(0)}
                className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/60 transition-colors hover:text-accent md:inline-flex"
                aria-label="Ouvrir la galerie en mode immersif"
              >
                <Expand className="size-4" />
                Mode immersif
              </button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {c.gallery.map((img, i) => {
              const isHero = i === 0;
              const span = isHero ? "lg:col-span-7 lg:row-span-2" : i % 3 === 1 ? "lg:col-span-5" : "lg:col-span-6";
              const aspect = isHero ? "aspect-[4/5]" : img.w > img.h ? "aspect-[4/3]" : "aspect-[3/4]";
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <figure className={`group relative overflow-hidden rounded-sm bg-graphite ${span}`}>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className={`relative block w-full ${aspect} cursor-zoom-in`}
                      aria-label={`Agrandir : ${img.alt}`}
                    >
                      <SmartImage
                        image={img}
                        alt={img.alt}
                        loading={i < 2 ? "eager" : "lazy"}
                        fetchPriority={i < 2 ? "high" : "auto"}
                        sizes={isHero ? "(min-width: 1280px) 58vw, 100vw" : "(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 100vw"}
                        className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-border transition-all duration-700 group-hover:ring-accent/50" />
                      <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-ivory/20 bg-ink/40 text-ivory opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100 group-hover:border-accent group-hover:text-accent">
                        <Expand className="size-4" />
                      </span>
                    </button>
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-5 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
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

      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-sm border border-border bg-graphite/40 p-10 lg:grid-cols-2 lg:p-16">
          <div>
            <span className="eyebrow">Commander une création</span>
            <h2 className="mt-5 font-display text-3xl text-ivory lg:text-5xl">
              Faites-vous tailler une pièce <span className="italic font-light text-accent">de la collection {c.title}.</span>
            </h2>
            <p className="mt-6 max-w-md text-ivory/65 leading-relaxed">
              Un conseiller de la Maison vous accompagne dès le premier échange, jusqu'à la remise cérémonielle de votre pièce.
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4 lg:items-end">
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-luxe">
              Réserver sur WhatsApp <span>→</span>
            </a>
            <Link to={`/collections/${next.slug}`} className="btn-ghost-luxe">
              Collection suivante : {next.title} <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <Lightbox
        images={c.gallery.map((img) => ({ src: img.src, alt: img.alt }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </PageShell>
  );
}
