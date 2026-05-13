import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "modelos");

export type ModeloTier = "base" | "adaptado" | "bespoke";

export interface ModeloDimensions {
  width_cm: number;
  depth_cm: number;
  height_cm: number;
  seat_height_cm?: number;
}

export interface ModeloMaterials {
  upholstery: string;
  filling_seat?: string;
  filling_back?: string;
  structure: string;
}

export interface ModeloFrontmatter {
  slug: string;
  name: string;
  tagline: string;
  tier: ModeloTier;
  order: number;
  hero_image: string;
  images: string[];
  dimensions: ModeloDimensions;
  materials: ModeloMaterials;
  price_from_ars: number;
  delivery_days: string;
  config_options?: string[];
  upholstery_options?: string[];
  leg_options?: string[];
}

export interface Modelo {
  frontmatter: ModeloFrontmatter;
  body: string;
}

const readModeloFile = (filename: string): Modelo => {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as ModeloFrontmatter,
    body: content,
  };
};

export const getAllModelos = (): Modelo[] => {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const modelos = files.map(readModeloFile);
  return modelos.sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order,
  );
};

export const getModeloBySlug = (slug: string): Modelo | null => {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const filename of candidates) {
    const full = path.join(CONTENT_DIR, filename);
    if (fs.existsSync(full)) return readModeloFile(filename);
  }
  return null;
};

export const getAllSlugs = (): string[] =>
  getAllModelos().map((m) => m.frontmatter.slug);

export const formatPriceArs = (value: number): string =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
