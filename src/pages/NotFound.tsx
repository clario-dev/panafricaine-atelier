import { Link } from "react-router-dom";
import { PageShell } from "@/components/site/shared";
import { Seo } from "@/components/site/Seo";

export default function NotFound() {
  return (
    <PageShell>
      <Seo title="404 — Couture Panafricaine" description="Page introuvable." />
      <div className="mx-auto max-w-3xl px-6 pt-48 pb-32 text-center">
        <h1 className="font-display text-7xl text-ivory">404</h1>
        <p className="mt-4 text-ivory/60">Cette page n'existe pas ou plus.</p>
        <Link to="/" className="btn-luxe mt-10 inline-flex">
          Retour à l'accueil <span>→</span>
        </Link>
      </div>
    </PageShell>
  );
}
