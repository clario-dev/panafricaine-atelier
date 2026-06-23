# Plan

## Part 1 — Lightbox immersif sur les pages collection

Sur `src/routes/collections.$slug.tsx` (et la version migrée vers React Router) :
- Cliquer sur une image ouvre un overlay plein écran (fond noir #050505, blur, fade-in Framer Motion).
- Navigation : flèches précédent/suivant, touches clavier `←` `→` `Esc`, swipe tactile, indicateur `03 / 08`.
- Bouton fermer (haut droit), légende discrète en bas, transition crossfade entre images.
- Style cohérent luxe : typographie Clash Display pour le compteur, accent jaune `#DCEB00` sur les flèches au hover.
- Composant réutilisable `src/components/site/Lightbox.tsx`.

## Part 2 — Migration TanStack Start SSR → SPA statique Vite

Objectif : `npm run build` produit `dist/index.html` + assets, déployable tel quel sur Hostinger/cPanel.

### Stack cible
- Vite 7 + React 19 (conservés)
- `react-router-dom` v6 en mode `BrowserRouter`
- Tailwind v4 inchangé
- Framer Motion inchangé
- Tous les composants `src/components/**` conservés tels quels
- Toutes les images, styles, polices, contenu SEO conservés

### Changements de fichiers

**Supprimés** :
- `src/routes/` (toute l'arborescence file-based)
- `src/routeTree.gen.ts`
- `src/router.tsx`, `src/server.ts`, `src/start.ts`
- `src/lib/error-capture.ts`, `src/lib/error-page.ts`, `src/lib/lovable-error-reporting.ts`
- Route serveur `sitemap.xml` (si présente)

**Créés** :
- `index.html` à la racine (entrée Vite SPA standard) avec `<div id="root">` et balises SEO de base
- `src/main.tsx` : `createRoot` + `<BrowserRouter>` + `<App />`
- `src/App.tsx` : `<Routes>` listant `/`, `/atelier`, `/collections`, `/collections/:slug`, `/sur-mesure`, `/consultation`, `/contact`, `*` (404)
- `src/pages/Index.tsx`, `Atelier.tsx`, `CollectionsIndex.tsx`, `CollectionDetail.tsx`, `SurMesure.tsx`, `Consultation.tsx`, `Contact.tsx`, `NotFound.tsx` — contenu copié depuis les fichiers `src/routes/*.tsx` actuels, `createFileRoute` retiré, `Link to` adapté à react-router (`<Link to="/collections/agbada-prestige">` etc.)
- `public/sitemap.xml` statique listant toutes les URLs
- `public/robots.txt`
- `public/.htaccess` avec fallback SPA pour Apache/Hostinger :
  ```
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```

**Modifiés** :
- `package.json` : retirer `@tanstack/react-start`, `@tanstack/react-router`, plugins associés ; ajouter `react-router-dom` ; scripts `dev`/`build`/`preview` Vite standards
- `vite.config.ts` : retirer `tanstackStart()` plugin, garder uniquement `@vitejs/plugin-react` + Tailwind ; `base: "./"` pour permettre déploiement dans un sous-dossier cPanel
- `src/components/site/shared.tsx` : remplacer les imports `@tanstack/react-router` (`Link`, `useLocation`) par `react-router-dom`. SEO `<head>` gérée via `react-helmet-async` (ajouté) ou via simple effet `document.title` — j'utiliserai `react-helmet-async` pour conserver toutes les meta SEO actuelles (title, description, og:*).

### SEO statique
- `index.html` racine contient les meta par défaut + favicon + Open Graph générique.
- Chaque page injecte `<Helmet>` avec titre/description/og spécifiques (équivalent fonctionnel de l'actuel `head()` TanStack).
- `public/sitemap.xml` liste : `/`, `/atelier`, `/collections`, `/collections/agbada-prestige`, `/collections/ligne-horizon`, `/collections/femmes-couture`, `/collections/atelier-sur-mesure`, `/sur-mesure`, `/consultation`, `/contact`.

### Vérification
- `npm run build` doit produire `dist/index.html` + `dist/assets/*`.
- Test rapide via `vite preview` que toutes les routes répondent.

### Notes techniques
- Plus aucun code serveur ne subsiste (pas de `createServerFn`, pas de loader serveur, pas de handler API). Tout est client-side.
- L'app reste 100% statique : aucun appel backend, aucune base de données.
- Compatible hébergement mutualisé : déposer le contenu de `dist/` dans `public_html/`.
