"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const easeOut = [0.16, 1, 0.3, 1] as const;

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

/**
 * Fade-in + translate-y al montar. Respeta prefers-reduced-motion.
 * Usado en hero y bloques key del manifiesto.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  y = 16,
  className = "",
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInOnViewProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

/**
 * Fade-in cuando el elemento entra al viewport. Usado para cards stagger.
 */
export function FadeInOnView({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  className = "",
}: FadeInOnViewProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Imagen con leve scale-out en mount (1.02 → 1.0) durante 1.2s.
 * Usado en hero principal.
 */
export function ImageReveal({ children, className = "" }: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
