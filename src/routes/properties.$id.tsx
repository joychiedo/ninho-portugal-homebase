import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { validatePropertySearch } from "@/lib/property-search";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { getProperty } from "@/data/properties";
import { DemoTag, FavButton, Page, btnPrimary } from "@/components/site";
import { RequestModal } from "@/components/RequestModal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/properties/$id")({
  validateSearch: (s: Record<string, unknown>) => ({ ...validatePropertySearch(s), returnTo: s.returnTo === "search" ? "search" : undefined }),
  loader: ({ params }) => {
    const p = getProperty(params.id);
    if (!p) throw notFound();
    return { id: p.id, title: p.title.en, summary: p.summary.en };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — NINHO` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} — NINHO` },
          { property: "og:description", content: loaderData.summary },
        ]
      : [{ title: "Property unavailable — NINHO" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: NotFound,
  component: Detail,
});

function NotFound() {
  const { t } = useI18n();
  return (
    <Page>
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-3xl">{t("prop.notFound")}</h1>
        <Link to="/properties" className={`${btnPrimary} mt-8`}>{t("prop.back")}</Link>
      </div>
    </Page>
  );
}

function Detail() {
  const { id } = Route.useParams();
  const p = getProperty(id);
  const search = Route.useSearch();
  const { t, l, price } = useI18n();
  const { requested } = useStore();
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  if (!p) return <NotFound />;
  const n = p.images.length;
  const isRequested = requested.includes(p.id);

  return (
    <Page>
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <Link to="/properties" search={search.returnTo ? validatePropertySearch(search) : {}} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> {t("prop.back")}
        </Link>

        <div className="mt-6 grid gap-3 lg:grid-cols-[2fr_1fr]">
          <div className="relative">
            <img src={p.images[idx]} alt={`${l(p.title)} — ${t("prop.photo", { i: idx + 1, n })}`} width={1200} height={912} className="aspect-[4/3] w-full object-cover lg:aspect-[16/11]" />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Button variant="ghost" type="button" aria-label={t("prop.prev")} onClick={() => setIdx((idx - 1 + n) % n)} className="flex h-11 w-11 p-0 items-center justify-center bg-card"><ChevronLeft className="h-5 w-5" /></Button>
              <span className="bg-card px-3 py-2 text-xs" aria-live="polite">{idx + 1} / {n}</span>
              <Button variant="ghost" type="button" aria-label={t("prop.next")} onClick={() => setIdx((idx + 1) % n)} className="flex h-11 w-11 p-0 items-center justify-center bg-card"><ChevronRight className="h-5 w-5" /></Button>
            </div>
          </div>
          <div className="hidden grid-rows-2 gap-3 lg:grid">
            {p.images.map((src, i) =>
              i === idx ? null : (
                <Button variant="ghost" key={i} type="button" onClick={() => setIdx(i)} aria-label={t("prop.photo", { i: i + 1, n })} className="h-auto rounded-none p-0 overflow-hidden">
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-opacity hover:opacity-85" />
                </Button>
              ),
            )}
          </div>
          <div className="flex gap-2 lg:hidden">
            {p.images.map((src, i) => (
              <Button variant="ghost" key={i} type="button" onClick={() => setIdx(i)} aria-label={t("prop.photo", { i: i + 1, n })} aria-current={i === idx} className={cn("h-16 w-20 p-0 overflow-hidden border-2", i === idx ? "border-primary" : "border-transparent")}>
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </Button>
            ))}
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">{t("prop.imageNote")}</p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <DemoTag />
              <span className="text-xs text-muted-foreground">{t("prop.ref")} {p.ref}</span>
            </div>
            <h1 className="mt-4 text-4xl leading-tight md:text-5xl">{l(p.title)}</h1>
            <p className="mt-3 inline-flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" />{p.area}, {t(`loc.${p.region}`)}</p>

            <dl className="mt-8 grid grid-cols-2 border-y border-border sm:grid-cols-4">
              {[
                [t("prop.type"), t(`type.${p.type}`)],
                [t("prop.bedrooms"), p.beds],
                [t("prop.bathrooms"), p.baths],
                [t("prop.area"), `${p.size} m²`],
              ].map(([k, v], i) => (
                <div key={i} className="border-border py-5 pr-4 sm:border-r sm:pl-4 sm:first:pl-0 sm:last:border-r-0">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1 font-serif text-2xl">{v}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-10">
              <h2 className="text-2xl">{t("prop.description")}</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{l(p.description)}</p>
            </section>
            <section className="mt-10">
              <h2 className="text-2xl">{t("prop.features")}</h2>
              <ul className="mt-4 grid max-w-xl grid-cols-2 gap-3">
                {p.features.map((f) => (
                  <li key={f} className="inline-flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{t(`feat.${f}`)}</li>
                ))}
              </ul>
            </section>
            <section className="mt-10 border-l-2 border-terracotta pl-6">
              <h2 className="text-2xl">{t("prop.neighbourhood")}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{l(p.neighbourhood)}</p>
            </section>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-border bg-card p-6">
              <p className="font-serif text-4xl">{price(p.price)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t("prop.listedBy")}</p>
              <p className="mt-6 text-sm text-muted-foreground">{t("prop.requestBody")}</p>
              <div className="mt-5 flex flex-col gap-3">
                <Button variant="ghost" type="button" disabled={isRequested} onClick={() => setOpen(true)} className={btnPrimary}>
                  {isRequested ? <><Check className="h-4 w-4" />{t("req.done")}</> : t("prop.request")}
                </Button>
                <FavButton id={p.id} name={p.title} variant="full" />
              </div>
            </div>
          </aside>
        </div>
      </div>
      {open && <RequestModal p={p} onClose={() => setOpen(false)} />}
    </Page>
  );
}
