import { FEATURES, REGIONS, TYPES, properties } from "@/data/properties";

export type PropertySearch = { location?: string; type?: string; min?: number; max?: number; beds?: number; features?: string; sort?: string };
const choice = (v: unknown, options: readonly string[]) => typeof v === "string" && options.includes(v) ? v : undefined;
const number = (v: unknown) => (typeof v === "number" || typeof v === "string") && v !== "" && Number.isFinite(Number(v)) && Number(v) >= 0 ? Number(v) : undefined;
export function validatePropertySearch(s: Record<string, unknown>): PropertySearch {
  const features = typeof s.features === "string" ? [...new Set(s.features.split(",").filter(f => FEATURES.some(x => x === f)))].join(",") : "";
  return { location: choice(s.location, REGIONS), type: choice(s.type, TYPES), min: number(s.min), max: number(s.max), beds: number(s.beds), features: features || undefined, sort: choice(s.sort, ["priceAsc", "priceDesc", "area"]) };
}
export function searchProperties(s: PropertySearch) {
  const features = s.features?.split(",") ?? [];
  const results = properties.filter(p => (!s.location || p.region === s.location) && (!s.type || p.type === s.type) && (s.min === undefined || p.price >= s.min) && (s.max === undefined || p.price <= s.max) && (s.beds === undefined || p.beds >= s.beds) && features.every(f => p.features.some(x => x === f)));
  if (s.sort === "priceAsc") results.sort((a,b) => a.price-b.price);
  if (s.sort === "priceDesc") results.sort((a,b) => b.price-a.price);
  if (s.sort === "area") results.sort((a,b) => b.size-a.size);
  return results;
}