import { createFileRoute } from "@tanstack/react-router";
import { CONTACT, PageHero, PageShell, Reveal, SectionLabel } from "@/components/site/shared";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Couture Panafricaine" },
      { name: "description", content: `Joignez nos ateliers de Cotonou et Lomé. Téléphone ${CONTACT.phone}.` },
      { property: "og:title", content: "Contact — Couture Panafricaine" },
      { property: "og:description", content: "Cotonou & Lomé — Téléphone, email, ateliers." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Écrivez-nous,"
        italic="appelez-nous."
        intro="Nos conseillers privés vous répondent sous 24 heures. Pour une demande urgente, joignez-nous directement par téléphone."
      />

      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          {/* Contact details */}
          <div className="lg:col-span-5 space-y-10">
            <Reveal>
              <div>
                <SectionLabel index="01" label="Téléphone" />
                <a
                  href={CONTACT.phoneHref}
                  className="mt-6 block font-display text-3xl text-ivory transition-colors hover:text-accent lg:text-5xl"
                >
                  {CONTACT.phone}
                </a>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/40">
                  Lun — Sam · 9h00 — 19h00 (GMT)
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <SectionLabel index="02" label="Email" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-6 block font-display text-2xl text-ivory transition-colors hover:text-accent lg:text-3xl break-all"
                >
                  {CONTACT.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <SectionLabel index="03" label="Ateliers" />
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {CONTACT.cities.map((c) => (
                    <div key={c} className="rounded-sm border border-border bg-graphite/40 p-6">
                      <div className="font-display text-xl text-ivory">{c.split(" — ")[0]}</div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                        {c.split(" — ")[1]}
                      </div>
                      <p className="mt-4 text-sm text-ivory/60 leading-relaxed">
                        Sur rendez-vous uniquement.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="lg:col-span-7 glass-panel rounded-md p-8 lg:p-12">
              <h2 className="font-display text-2xl text-ivory">Adressez-nous un message</h2>
              <p className="mt-3 text-sm text-ivory/55">
                Une question, un projet, une commande spéciale — nous lisons chaque message.
              </p>

              <form className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  { label: "Prénom", type: "text" },
                  { label: "Nom", type: "text" },
                  { label: "Email", type: "email" },
                  { label: "Téléphone", type: "tel" },
                ].map((f) => (
                  <label key={f.label} className="block">
                    <span className="eyebrow mb-2 block">{f.label}</span>
                    <input
                      type={f.type}
                      className="w-full border-b border-border bg-transparent py-3 text-ivory placeholder:text-ivory/30 focus:border-accent focus:outline-none"
                      placeholder={f.label}
                    />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <span className="eyebrow mb-2 block">Sujet</span>
                  <select className="w-full appearance-none border-b border-border bg-transparent py-3 text-ivory focus:border-accent focus:outline-none">
                    <option className="bg-graphite">Consultation privée</option>
                    <option className="bg-graphite">Commande sur-mesure</option>
                    <option className="bg-graphite">Demande presse</option>
                    <option className="bg-graphite">Autre</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="eyebrow mb-2 block">Message</span>
                  <textarea
                    rows={5}
                    className="w-full border-b border-border bg-transparent py-3 text-ivory placeholder:text-ivory/30 focus:border-accent focus:outline-none resize-none"
                    placeholder="Votre projet…"
                  />
                </label>
                <div className="sm:col-span-2 mt-4 flex justify-end">
                  <button type="button" className="btn-luxe">
                    Envoyer le message <span>→</span>
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
