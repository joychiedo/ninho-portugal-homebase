import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Compass, FileCheck2, Lock, Scale, Search, Users } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { useI18n, localizeLocation } from "@/lib/i18n";
import { properties, REGIONS, TYPES } from "@/data/properties";
import { professionals } from "@/data/case";
import { Page, PropertyCard, btnOutline, btnPrimary, inputCls } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NINHO — Find property in Portugal and coordinate your purchase" },
      { name: "description", content: "Discover homes in Lisbon, Porto, Cascais and the Algarve, and organise tasks, documents and professionals for your purchase." },
      { property: "og:title", content: "NINHO — Property in Portugal, coordinated" },
      { property: "og:description", content: "Property discovery and purchase coordination for international buyers in Portugal." },
    ],
  }),
  component: Home,
});

const PRICE_STEPS = [500000, 750000, 1000000, 1500000, 2500000];

function Home() {
  const { t, price, lang } = useI18n();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [max, setMax] = useState("");

  const steps = [
    { icon: Compass, t: t("how.1.t"), b: t("how.1.b") },
    { icon: Users, t: t("how.2.t"), b: t("how.2.b") },
    { icon: FileCheck2, t: t("how.3.t"), b: t("how.3.b") },
  ];

  return (
    <Page>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 md:px-8 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-6 lg:pr-6">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.6rem]">{t("hero.title")}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("hero.body")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/properties" className={btnPrimary}>{t("hero.ctaExplore")} <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/dashboard" className={btnOutline}>{t("hero.ctaWorkspace")}</Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <img src={hero} alt={t("hero.alt")} width={1600} height={1008} className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]" />
        </div>
      </section>

      <section aria-labelledby="search-title" className="mx-auto max-w-7xl px-5 md:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/properties", search: { location: location || undefined, type: type || undefined, max: max ? Number(max) : undefined } });
          }}
          className="grid gap-4 border border-border bg-card p-5 md:grid-cols-4 md:items-end md:p-6"
        >
          <h2 id="search-title" className="sr-only">{t("search.title")}</h2>
          <div>
            <label htmlFor="s-loc" className="eyebrow mb-1.5 block">{t("search.location")}</label>
            <select id="s-loc" className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">{t("search.anyLocation")}</option>
              {REGIONS.map((r) => <option key={r} value={r}>{t(`loc.${r}`)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="s-type" className="eyebrow mb-1.5 block">{t("search.type")}</label>
            <select id="s-type" className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">{t("search.anyType")}</option>
              {TYPES.map((r) => <option key={r} value={r}>{t(`type.${r}`)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="s-max" className="eyebrow mb-1.5 block">{t("search.maxPrice")}</label>
            <select id="s-max" className={inputCls} value={max} onChange={(e) => setMax(e.target.value)}>
              <option value="">{t("search.anyPrice")}</option>
              {PRICE_STEPS.map((p) => <option key={p} value={p}>{price(p)}</option>)}
            </select>
          </div>
          <Button type="submit" className={btnPrimary}><Search className="h-4 w-4" />{t("search.submit")}</Button>
        </form>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t("featured.eyebrow")}</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{t("featured.title")}</h2>
          </div>
          <Link to="/properties" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">{t("featured.all")} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mt-24 border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl">{t("how.title")}</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={i} className="border-t border-foreground pt-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl text-terracotta">0{i + 1}</span>
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-6 text-2xl">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-24 md:px-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{t("pros.eyebrow")}</p>
          <h2 className="mt-3 text-3xl md:text-4xl">{t("pros.title")}</h2>
          <p className="mt-5 max-w-lg text-muted-foreground">{t("pros.body")}</p>
          <Link to="/professionals" className={`${btnOutline} mt-8`}>{t("pros.cta")}</Link>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {professionals.slice(0, 4).map((p) => (
            <li key={p.id} className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-forest-soft font-serif text-primary">{p.initials}</span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">{t(`cat.${p.category}`)} · {localizeLocation(p.location, lang)}</p>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{t("dir.fictional")}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8">
        <p className="eyebrow">{t("trust.eyebrow")}</p>
        <h2 className="mt-3 text-3xl md:text-4xl">{t("trust.title")}</h2>
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {[
            { icon: Compass, k: "1" },
            { icon: Lock, k: "2" },
            { icon: Scale, k: "3" },
          ].map(({ icon: Icon, k }) => (
            <div key={k} className="bg-card p-7">
              <Icon className="h-5 w-5 text-terracotta" />
              <h3 className="mt-5 text-xl">{t(`trust.${k}.t` as "trust.1.t")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`trust.${k}.b` as "trust.1.b")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 bg-primary p-10 text-primary-foreground md:flex-row md:items-center md:p-14">
          <div>
            <h2 className="text-3xl md:text-4xl">{t("cta.title")}</h2>
            <p className="mt-3 max-w-xl opacity-85">{t("cta.body")}</p>
          </div>
          <Link to="/properties" className="inline-flex items-center gap-2 bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary">
            {t("hero.ctaExplore")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Page>
  );
}
