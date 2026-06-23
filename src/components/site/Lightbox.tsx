import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

export function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev, onClose]);

  // touch swipe
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
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 lg:px-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ivory/60">
              <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-ivory/30">/</span>
              {String(images.length).padStart(2, "0")}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Fermer"
              className="group flex size-12 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all hover:border-accent hover:text-accent"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Image précédente"
            className="group absolute left-3 z-10 flex size-14 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all hover:border-accent hover:text-accent lg:left-8 lg:size-16"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Image suivante"
            className="group absolute right-3 z-10 flex size-14 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-all hover:border-accent hover:text-accent lg:right-8 lg:size-16"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative mx-auto flex h-full w-full items-center justify-center px-16 py-24 lg:px-32"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[index].src}
                alt={images[index].alt}
                className="max-h-full max-w-full object-contain shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-6 pb-8">
            <span className="rounded-full border border-ivory/10 bg-ink/40 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ivory/60 backdrop-blur">
              {images[index].alt}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
