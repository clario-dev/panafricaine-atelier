import { CONTACT, PageHero, PageShell, Reveal, SectionLabel } from "@/components/site/shared";
import { Seo } from "@/components/site/Seo";

const FIELD_CLASS =
  "w-full rounded-2xl border border-border/70 bg-ink/60 px-5 py-4 text-ivory placeholder:text-ivory/30 outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/40";

export default function Contact() {
  return (
    <PageShell>
      <Seo
        title="Contact — Couture Panafricaine"
        description={`Joignez nos ateliers de Cotonou et Lomé. Téléphone ${CONTACT.phone}.`}
      />
      <PageHero
        eyebrow="Contact"
        title="Écrivez-nous,"
        italic="appelez-nous."
        intro="Nos conseillers privés vous répondent sous 24 heures. Pour une demande prioritaire, joignez-nous directement par téléphone ou WhatsApp."
      />

      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-5">
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
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-accent/30 bg-accent/10 p-6 transition-all hover:border-accent hover:bg-accent/15"
                >
                  <div className="eyebrow">WhatsApp</div>
                  <div className="mt-3 font-display text-2xl text-ivory">Réserver</div>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">Échange privé immédiat avec la Maison.</p>
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="rounded-2xl border border-border bg-graphite/40 p-6 transition-all hover:border-accent/40"
                >
                  <div className="eyebrow">Email</div>
                  <div className="mt-3 font-display text-xl text-ivory break-all">{CONTACT.email}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/60">Réponse sous 24 heures ouvrées.</p>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <SectionLabel index="03" label="Ateliers" />
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {CONTACT.cities.map((c) => (
                    <div key={c} className="rounded-2xl border border-border bg-graphite/40 p-6">
                      <div className="font-display text-xl text-ivory">{c.split(" — ")[0]}</div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                        {c.split(" — ")[1]}
                      </div>
                      <p className="mt-4 text-sm text-ivory/60 leading-relaxed">Sur rendez-vous uniquement.</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="glass-panel rounded-[28px] border border-white/8 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] lg:col-span-7 lg:p-12">
              <div className="mb-8 flex flex-col gap-3 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-display text-3xl text-ivory">Adressez-nous un message</h2>
                  <p className="mt-3 max-w-xl text-sm text-ivory/55">
                    Une question, un projet, une commande spéciale — nous lisons chaque message avec attention.
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Réponse privée</span>
              </div>

              <form className="grid gap-6 sm:grid-cols-2">
                {[
                  { label: "Prénom", type: "text", autoComplete: "given-name" },
                  { label: "Nom", type: "text", autoComplete: "family-name" },
                  { label: "Email", type: "email", autoComplete: "email" },
                  { label: "Téléphone", type: "tel", autoComplete: "tel" },
                ].map((f) => (
                  <label key={f.label} className="block">
                    <span className="eyebrow mb-3 block">{f.label}</span>
                    <input type={f.type} autoComplete={f.autoComplete} className={FIELD_CLASS} placeholder={f.label} />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <span className="eyebrow mb-3 block">Sujet</span>
                  <select className={FIELD_CLASS} defaultValue="Commande sur-mesure">
                    <option className="bg-graphite">Commande sur-mesure</option>
                    <option className="bg-graphite">Demande collection</option>
                    <option className="bg-graphite">Rendez-vous atelier</option>
                    <option className="bg-graphite">Presse / Partenariat</option>
                    <option className="bg-graphite">Autre</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="eyebrow mb-3 block">Message</span>
                  <textarea
                    rows={6}
                    className={`${FIELD_CLASS} resize-y`}
                    placeholder="Décrivez votre projet, la collection souhaitée, vos délais ou toute précision utile…"
                  />
                </label>
                <div className="mt-2 flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-relaxed text-ivory/45">
                    Pour un échange plus rapide, vous pouvez aussi réserver directement via WhatsApp.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-luxe">
                      Réserver sur WhatsApp <span>→</span>
                    </a>
                    <button type="button" className="btn-ghost-luxe">
                      Envoyer le message <span>→</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
