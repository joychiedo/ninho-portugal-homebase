import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { FEATURES, REGIONS, TYPES, type Feature } from "@/data/properties";
import { DemoTag, Page, PropertyCard, btnOutline, inputCls } from "@/components/site";
import { searchProperties, validatePropertySearch, type PropertySearch as S } from "@/lib/property-search";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const num = (v: string) => v === "" ? undefined : Number(v);

export const Route = createFileRoute("/properties/")({
  validateSearch: validatePropertySearch,
  head: () => ({
    meta: [
      { title: "Explore properties in Portugal — NINHO" },
      { name: "description", content: "Search fictional sample homes in Lisbon, Porto, Cascais and the Algarve by price, type, bedrooms and features." },
      { property: "og:title", content: "Explore properties in Portugal — NINHO" },
      { property: "og:description", content: "Filter homes across Lisbon, Porto, Cascais and the Algarve." },
    ],
  }),
  component: Explore,
});

const PRICES = [300000, 500000, 750000, 1000000, 1500000, 2500000];

function Explore() {
  const { t, price } = useI18n();
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/properties/" });
  const [showFilters, setShowFilters] = useState(false);
  const [updating, setUpdating] = useState(false);
  const feats = useMemo(() => (s.features ? (s.features.split(",") as Feature[]) : []), [s.features]);

  const set = (patch: Partial<S>) => navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true, resetScroll: false });

  useEffect(() => {
    setUpdating(true);
    const id = setTimeout(() => setUpdating(false), 250);
    return () => clearTimeout(id);
  }, [s.location, s.type, s.min, s.max, s.beds, s.features, s.sort]);

  const results = useMemo(() => searchProperties(s), [s]);

  const toggleFeat = (f: Feature) => {
    const next = feats.includes(f) ? feats.filter((x) => x !== f) : [...feats, f];
    set({ features: next.length ? next.join(",") : undefined });
  };

  const hasFilters = !!(s.location || s.type || s.min || s.max || s.beds || s.features);

  const filters = (
    <div className="space-y-6">
      <div>
        <label htmlFor="f-loc" className="eyebrow mb-1.5 block">{t("search.location")}</label>
        <select id="f-loc" className={inputCls} value={s.location ?? ""} onChange={(e) => set({ location: e.target.value || undefined })}>
          <option value="">{t("search.anyLocation")}</option>
          {REGIONS.map((r) => <option key={r} value={r}>{t(`loc.${r}`)}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-type" className="eyebrow mb-1.5 block">{t("search.type")}</label>
        <select id="f-type" className={inputCls} value={s.type ?? ""} onChange={(e) => set({ type: e.target.value || undefined })}>
          <option value="">{t("search.anyType")}</option>
          {TYPES.map((r) => <option key={r} value={r}>{t(`type.${r}`)}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="f-min" className="eyebrow mb-1.5 block">{t("explore.minPrice")}</label>
          <select id="f-min" className={inputCls} value={s.min ?? ""} onChange={(e) => set({ min: num(e.target.value) })}>
            <option value="">{t("explore.noMin")}</option>
            {PRICES.map((p) => <option key={p} value={p}>{price(p)}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="f-max" className="eyebrow mb-1.5 block">{t("search.maxPrice")}</label>
          <select id="f-max" className={inputCls} value={s.max ?? ""} onChange={(e) => set({ max: num(e.target.value) })}>
            <option value="">{t("search.anyPrice")}</option>
            {PRICES.map((p) => <option key={p} value={p}>{price(p)}</option>)}
          </select>
        </div>
      </div>
      {s.min !== undefined && s.max !== undefined && s.min > s.max && <p role="alert" className="text-sm text-destructive">{t("explore.priceError")}</p>}
      <fieldset>
        <legend className="eyebrow mb-2">{t("explore.bedrooms")}</legend>
        <div className="flex border border-border">
          {[undefined, 1, 2, 3, 4, 5].map((b) => (
            <Button variant="ghost"
              key={b ?? "any"}
              type="button"
              aria-pressed={s.beds === b}
              onClick={() => set({ beds: b })}
              className={cn("flex-1 border-r border-border py-2 text-sm last:border-r-0", s.beds === b ? "bg-foreground text-background" : "bg-card hover:bg-secondary")}
            >
              {b === undefined ? t("explore.anyBeds") : `${b}+`}
            </Button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-2">{t("explore.features")}</legend>
        <div className="flex flex-wrap gap-2">
          {FEATURES.map((f) => (
            <Button variant="ghost"
              key={f}
              type="button"
              aria-pressed={feats.includes(f)}
              onClick={() => toggleFeat(f)}
              className={cn("border px-3 py-1.5 text-sm", feats.includes(f) ? "border-primary bg-forest-soft text-primary" : "border-border bg-card hover:border-foreground")}
            >
              {t(`feat.${f}`)}
            </Button>
          ))}
        </div>
      </fieldset>
      {hasFilters && (
        <Button variant="ghost" type="button" onClick={() => navigate({ search: { sort: s.sort }, replace: true })} className="text-sm underline underline-offset-4">
          {t("explore.reset")}
        </Button>
      )}
    </div>
  );

  return (
    <Page>
      <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
        <div className="flex flex-wrap items-center gap-3"><DemoTag /></div>
        <h1 className="mt-4 text-4xl md:text-5xl">{t("explore.title")}</h1>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
          <p aria-live="polite" className="text-sm">
            {updating ? t("explore.updating") : results.length === 1 ? t("explore.count1") : t("explore.count", { n: results.length })}
          </p>
          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            <Button variant="ghost" type="button" onClick={() => setShowFilters((v) => !v)} aria-expanded={showFilters} className="inline-flex items-center gap-2 border border-border px-3 py-2 text-sm lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />{showFilters ? t("explore.hideFilters") : t("explore.showFilters")}
            </Button>
            <label htmlFor="f-sort" className="sr-only">{t("explore.sort")}</label>
            <select id="f-sort" className={`${inputCls} min-w-0 flex-1 sm:w-auto`} value={s.sort ?? "featured"} onChange={(e) => set({ sort: e.target.value === "featured" ? undefined : e.target.value })}>
              <option value="featured">{t("explore.sort")}: {t("explore.sort.featured")}</option>
              <option value="priceAsc">{t("explore.sort.priceAsc")}</option>
              <option value="priceDesc">{t("explore.sort.priceDesc")}</option>
              <option value="area">{t("explore.sort.area")}</option>
            </select>
          </div>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside aria-label={t("explore.filters")} className={cn(showFilters ? "block" : "hidden", "lg:block")}>
            <div className="lg:sticky lg:top-32">{filters}</div>
          </aside>
          <div className={cn("transition-opacity", updating && "opacity-50")}>
            {results.length === 0 ? (
              <div className="border border-dashed border-border bg-card px-6 py-20 text-center">
                <h2 className="text-2xl">{t("explore.empty.t")}</h2>
                <p className="mt-2 text-muted-foreground">{t("explore.empty.b")}</p>
                <Button variant="ghost" type="button" onClick={() => navigate({ search: {}, replace: true })} className={`${btnOutline} mt-6`}>{t("explore.reset")}</Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => <PropertyCard key={p.id} p={p} search={s} />)}
              </div>
            )}
          </div>
        </div>
        <p className="mt-10 text-xs text-muted-foreground"><Link to="/" className="underline">NINHO</Link> · {t("demo.banner")}</p>
      </div>
    </Page>
  );
}
