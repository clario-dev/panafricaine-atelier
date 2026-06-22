import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PageHero, PageShell, Reveal, CONTACT } from "@/components/site/shared";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Consultation — Couture Panafricaine" },
      { name: "description", content: "Réservez votre consultation privée. Quatre étapes feutrées pour ouvrir le dialogue avec nos artisans." },
      { property: "og:title", content: "Consultation — Couture Panafricaine" },
      { property: "og:description", content: "Atelier virtuel — Réservez une consultation privée." },
    ],
  }),
  component: ConsultationPage,
});

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

function ConsultationPage() {
  const [step, setStep] = useState(0);
  const [creation, setCreation] = useState<string | null>(null);
  const [textile, setTextile] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const steps = ["Création", "Étoffe", "Date", "Coordonnées"];
  const canNext = [creation, textile, date, true][step];

  return (
    <PageShell>
      <PageHero
        eyebrow="Atelier Virtuel"
        title="Réservez votre"
        italic="consultation privée."
        intro="Quatre étapes feutrées pour ouvrir le dialogue. Nos artisans reprennent contact sous 24 heures."
      />

      <section className="relative px-6 pb-32 lg:px-16 lg:pb-48">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="space-y-4 text-ivory/60 text-sm leading-relaxed">
                <p>
                  Une conversation privée, sans engagement. Vous décrivez votre projet — nous
                  vous proposons étoffes, coupes et délais.
                </p>
                <p>
                  Préférez-vous appeler directement ? <br />
                  <a href={CONTACT.phoneHref} className="text-accent hover:underline">{CONTACT.phone}</a>
                </p>
              </div>
              <ol className="mt-10 hidden lg:block space-y-3">
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
            </Reveal>
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
                      className={`h-px w-8 transition-all duration-700 ${i <= step ? "bg-accent" : "bg-border"}`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                    <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full border border-accent/40">
                      <motion.svg viewBox="0 0 24 24" className="size-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                            creation === c.id ? "border-accent bg-accent/5" : "border-border hover:border-ivory/30"
                          }`}
                        >
                          <div>
                            <div className="font-display text-lg text-ivory">{c.label}</div>
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/40">{c.sub}</div>
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
                          className={`group overflow-hidden rounded-sm border text-left transition-all ${textile === t.id ? "border-accent" : "border-border hover:border-ivory/30"}`}
                        >
                          <div className="aspect-[5/2] w-full" style={{ background: t.swatch }} />
                          <div className="flex items-center justify-between p-4">
                            <div>
                              <div className="font-display text-base text-ivory">{t.label}</div>
                              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/40">{t.origin}</div>
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
      </section>
    </PageShell>
  );
}
