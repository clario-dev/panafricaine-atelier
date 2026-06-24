import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback, useMemo, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveRef = useRef<HTMLElement | null>(null);

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const currentLabel = useMemo(() => {
    if (index === null) return "";
    return `${images[index].alt} — image ${index + 1} sur ${images.length}`;
  }, [images, index]);

  useEffect(() => {
    if (!open) return;

    previousActiveRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";

    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        return;
      }

      if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
        if (!nodes || nodes.length === 0) {
          e.preventDefault();
          return;
        }
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (active === first || !dialogRef.current?.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previousActiveRef.current?.focus();
    };
  }, [open, next, prev, onClose]);

  useEffect(() => {
    if (!open) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [open, next, prev]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl"
          onClick={onClose}
          aria-hidden={false}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse immersive de la collection"
            aria-describedby="lightbox-caption"
            className="relative flex h-full w-full items-center justify-center outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 lg:px-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ivory/60" aria-live="polite">
                <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-ivory/30">/</span>
                {String(images.length).padStart(2, "0")}
              </span>
              <button
                onClick={onClose}
                aria-label="Fermer la lightbox"
                className="group flex size-12 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <button
              onClick={prev}
              aria-label="Afficher l'image précédente"
              className="group absolute left-3 z-10 flex size-14 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent lg:left-8 lg:size-16"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>

            <button
              onClick={next}
              aria-label="Afficher l'image suivante"
              className="group absolute right-3 z-10 flex size-14 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent lg:right-8 lg:size-16"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative mx-auto flex h-full w-full flex-col items-center justify-center px-16 py-24 lg:px-32"
                aria-label={currentLabel}
              >
                <img
                  src={images[index].src}
                  alt={images[index].alt}
                  className="max-h-full max-w-full object-contain shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
                />
                <figcaption
                  id="lightbox-caption"
                  className="mt-6 rounded-full border border-ivory/10 bg-ink/40 px-5 py-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/60 backdrop-blur"
                >
                  {images[index].alt}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
