import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { nextTask } from "@/lib/demo-state";
import { useI18n } from "@/lib/i18n";
import { progressOf, useStore } from "@/lib/store";
import { buyerCase, getPro } from "@/data/case";
import { getProperty } from "@/data/properties";
import { DemoTag, LangToggle, Page, PropertyCard, btnPrimary } from "@/components/site";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Buyer workspace — NINHO" },
      { name: "description", content: "A sample buyer's overview: journey stage, deadlines, tasks, saved homes and professionals." },
      { property: "og:title", content: "Buyer workspace — NINHO" },
      { property: "og:description", content: "Follow a fictional purchase journey in Portugal." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t, l, date } = useI18n();
  const { tasks, favourites, activity } = useStore();
  const pct = progressOf(tasks);
  const next = nextTask(tasks);
  const open = tasks.filter((x) => x.status !== "done").sort((a, b) => a.due.localeCompare(b.due));
  const saved = favourites.map(getProperty).filter((p) => !!p);

  return (
    <Page>
      <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3"><p className="eyebrow">{t("dash.eyebrow")}</p><DemoTag /></div>
          <LangToggle />
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl">{t("dash.welcome")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("dash.sub")}</p>

        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          <div className="bg-card p-6">
            <p className="eyebrow">{t("dash.stage")}</p>
            <p className="mt-2 font-serif text-2xl">{l(buyerCase.stage)}</p>
          </div>
          <div className="bg-card p-6">
            <p className="eyebrow">{t("dash.progress")}</p>
            <p className="mt-2 font-serif text-2xl">{pct}%</p>
            <div className="mt-3 h-1.5 bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="bg-card p-6">
            <p className="eyebrow">{t("dash.next")}</p>
            <p className="mt-2 text-sm">{next ? l(next.title) : t("dash.allDone")}</p>
          </div>
        </div>
        <Link to="/dashboard/case/$id" params={{ id: buyerCase.id }} className={`${btnPrimary} mt-6`}>{t("dash.openCase")} <ArrowRight className="h-4 w-4" /></Link>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <section>
            <div className="flex items-baseline justify-between"><h2 className="text-2xl">{t("dash.deadlines")}</h2>
              <Link to="/dashboard/case/$id" params={{ id: buyerCase.id }} className="text-sm underline">{t("dash.viewAll")}</Link></div>
            {open.length === 0 ? <p className="mt-4 text-muted-foreground">{t("dash.allDone")}</p> : (
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {open.slice(0, 5).map((x) => (
                  <li key={x.id} className="flex items-center justify-between gap-4 py-3">
                    <span>{l(x.title)}<span className="block text-xs text-muted-foreground">{t(`status.${x.status}`)} · {getPro(x.proId)?.name}</span></span>
                    <span className="shrink-0 text-sm text-muted-foreground">{date(x.due)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="text-2xl">{t("dash.pros")}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {buyerCase.proIds.map(getPro).map((p) => p && (
                <li key={p.id} className="flex items-center gap-4 py-3">
                  <span className="flex h-10 w-10 items-center justify-center bg-forest-soft font-serif text-primary">{p.initials}</span>
                  <span>{p.name}<span className="block text-xs text-muted-foreground">{t(`cat.${p.category}`)} · {t("dir.fictional")}</span></span>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-2xl">{t("dash.activity")}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {activity.slice(0, 5).map((a) => (
                <li key={a.id} className="border-l-2 border-terracotta pl-3">{l(a.text)}<span className="block text-xs text-muted-foreground">{date(a.at)}</span></li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl">{t("dash.saved")}</h2>
          {saved.length === 0 ? (
            <div className="mt-4 border border-dashed border-border p-10 text-center">
              <p className="text-muted-foreground">{t("dash.savedEmpty")}</p>
              <Link to="/properties" className={`${btnPrimary} mt-4`}>{t("dash.savedCta")}</Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{saved.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
          )}
        </section>
      </div>
    </Page>
  );
}
