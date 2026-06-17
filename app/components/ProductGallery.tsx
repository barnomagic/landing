"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface ProductGalleryProps {
  name: string;
  images: string[];
}

// Convención de 5 shots: [0]=hero, [1..3]=perfil/angular/detalle, [4]=oxblood.
const CAPTIONS = [
  "Vista frontal",
  "Perfil",
  "Angular",
  "Detalle",
  "Terciopelo oxblood",
];

interface GalleryButtonProps {
  onClick: () => void;
  label: string;
  children: ReactNode;
}

/** Imagen clickeable que abre el lightbox. Afordancia: cursor zoom + hover scale. */
function GalleryButton({ onClick, label, children }: GalleryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group block w-full cursor-zoom-in overflow-hidden rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxblood"
    >
      {children}
    </button>
  );
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const isOpen = openIndex !== null;
  const total = images.length;

  const caption = useCallback(
    (i: number) => CAPTIONS[i] ?? `${name} · ${i + 1}`,
    [name],
  );

  const open = useCallback((i: number) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setOpenIndex(i);
  }, []);
  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % total)),
    [total],
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + total) % total)),
    [total],
  );

  // Teclado, scroll-lock y focus mientras el lightbox está abierto.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") {
        next();
        return;
      }
      if (e.key === "ArrowLeft") {
        prev();
        return;
      }
      if (e.key === "Tab") {
        // Focus trap básico: cicla entre los controles del diálogo.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      // Restaura el foco a la imagen que disparó la apertura.
      triggerRef.current?.focus();
    };
  }, [isOpen, close, next, prev]);

  const heroImg = images[0];
  const detailImgs = images.slice(1, 4);
  const variantImgs = images.slice(4, 5);
  const hoverScale =
    "transition-transform duration-700 ease-out group-hover:scale-[1.03]";

  return (
    <>
      {/* Hero shot */}
      {heroImg ? (
        <GalleryButton onClick={() => open(0)} label={`Ampliar ${name}`}>
          <ImagePlaceholder
            aspect="4/5"
            src={heroImg}
            alt={`${name} — vista frontal`}
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            label={`Foto pendiente · ${name}`}
            className={hoverScale}
          />
        </GalleryButton>
      ) : null}

      {/* Detalles (perfil / angular / detalle) */}
      {detailImgs.length > 0 && (
        <div className="mt-8 grid grid-cols-3 gap-4 md:gap-6">
          {detailImgs.map((img, idx) => (
            <GalleryButton
              key={img}
              onClick={() => open(idx + 1)}
              label={`Ampliar ${caption(idx + 1)}`}
            >
              <ImagePlaceholder
                aspect="4/5"
                src={img}
                alt={`${name} — ${caption(idx + 1)}`}
                sizes="(min-width: 1024px) 19vw, 33vw"
                label={caption(idx + 1)}
                className={hoverScale}
              />
            </GalleryButton>
          ))}
        </div>
      )}

      {/* Variantes de tela */}
      {variantImgs.length > 0 && (
        <div className="mt-16">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-stone">
            En otras telas
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {variantImgs.map((img, idx) => (
              <figure key={img}>
                <GalleryButton
                  onClick={() => open(4 + idx)}
                  label={`Ampliar ${caption(4 + idx)}`}
                >
                  <ImagePlaceholder
                    aspect="4/5"
                    src={img}
                    alt={`${name} — ${caption(4 + idx)}`}
                    sizes="(min-width: 1024px) 29vw, 50vw"
                    label={caption(4 + idx)}
                    className={hoverScale}
                  />
                </GalleryButton>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-stone">
                  {caption(4 + idx)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {mounted && isOpen &&
        createPortal(
          <motion.div
            key="lightbox"
            ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={`${name} — galería ampliada`}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                onClick={close}
              >
                {/* Cerrar */}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                  aria-label="Cerrar"
                  className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-offwhite/80 transition-colors hover:text-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offwhite sm:right-6 sm:top-6"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>

                {/* Contador */}
                {total > 1 ? (
                  <p className="absolute left-1/2 top-5 -translate-x-1/2 text-xs uppercase tracking-[0.25em] text-offwhite/60 sm:top-7">
                    {(openIndex ?? 0) + 1} / {total}
                  </p>
                ) : null}

                {/* Anterior */}
                {total > 1 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    aria-label="Imagen anterior"
                    className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-offwhite/80 transition-colors hover:text-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offwhite sm:left-5"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                ) : null}

                {/* Imagen ampliada */}
                <motion.figure
                  key={openIndex}
                  onClick={(e) => e.stopPropagation()}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  <div className="relative h-[78vh] w-[90vw] max-w-4xl">
                    <Image
                      src={images[openIndex ?? 0]}
                      alt={`${name} — ${caption(openIndex ?? 0)}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 80vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.25em] text-offwhite/60">
                    {caption(openIndex ?? 0)}
                  </figcaption>
                </motion.figure>

                {/* Siguiente */}
                {total > 1 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    aria-label="Imagen siguiente"
                    className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-offwhite/80 transition-colors hover:text-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offwhite sm:right-5"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                ) : null}
          </motion.div>,
          document.body,
        )}
    </>
  );
}
