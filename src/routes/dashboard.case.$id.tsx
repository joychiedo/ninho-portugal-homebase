import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n, localizeLocation } from "@/lib/i18n";
import { progressOf, useStore } from "@/lib/store";
import { buyerCase, getPro, type TaskStatus } from "@/data/case";
import { getProperty } from "@/data/properties";
import { DemoTag, LangToggle, Page, inputCls } from "@/components/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/case/$id")({
  head: () => ({
    meta: [
      { title: "Case workspace — NINHO" },
      { name: "description", content: "Milestones, tasks, appointments and an illustrative document checklist for a sample purchase." },
      { property: "og:title", content: "Case workspace — NINHO" },
      { property: "og:description", content: "A fictional buyer's purchase case in Portugal." },
    ],
  }),
  component: CasePage,
});

const docCls = { requested: "bg-terracotta-soft", received: "bg-forest-soft text-primary", review: "bg-secondary" } as const;

function CasePage() {
  const { id } = Route.useParams();
  const { t, l, date, price, lang } = useI18n();
  const { tasks, setTaskStatus, activity } = useStore();
  if (id !== buyerCase.id)
    return <Page><div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="text-3xl">{t("case.notFound")}</h1><Link to="/dashboard" className="mt-6 inline-block underline">{t("case.back")}</Link></div></Page>;
  const prop = getProperty(buyerCase.propertyId);
  if (!prop) return <Page><p className="px-5 py-24">{t("prop.notFound")}</p></Page>;
  const pct = progressOf(tasks);

  return (
    <Page>
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />{t("case.back")}</Link>
          <LangToggle />
        </div>
        <div className="mt-6 flex items-center gap-3"><p className="eyebrow">{t("case.eyebrow")} {buyerCase.id}</p><DemoTag /></div>
        <h1 className="mt-3 text-4xl md:text-5xl">{buyerCase.buyers}</h1>
        <p className="mt-2 text-muted-foreground">
          {t("case.property")}: <Link to="/properties/$id" params={{ id: prop.id }} className="underline">{l(prop.title)}</Link> · {t("case.budget")}: {price(buyerCase.agreedPrice)}
        </p>
        <div className="mt-6 max-w-md">
          <p className="text-sm">{t("dash.progress")}: <strong>{pct}%</strong></p>
          <div className="mt-2 h-1.5 bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} /></div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl">{t("case.milestones")}</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-6">
            {buyerCase.milestones.map((m) => (
              <li key={m.id} className={cn("border-t-2 pt-3", m.state === "done" ? "border-primary" : m.state === "current" ? "border-terracotta" : "border-border")}>
                <p className="eyebrow">{t(`ms.${m.state}`)}</p>
                <p className="mt-1 font-medium">{l(m.title)}</p>
                <p className="text-xs text-muted-foreground">{date(m.date)}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <section>
            <h2 className="text-2xl">{t("case.tasks")}</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {tasks.map((x) => {
                const done = x.status === "done";
                return (
                  <li key={x.id} className="flex flex-wrap items-center gap-4 py-4">
                    <Button variant="ghost" type="button" onClick={() => setTaskStatus(x.id, done ? "todo" : "done")} aria-label={t(done ? "case.markTodo" : "case.markDone", { t: l(x.title) })}
                      className={cn("flex h-10 w-10 p-0 shrink-0 items-center justify-center border", done ? "border-primary bg-primary text-primary-foreground" : "border-input")}>
                      {done ? <Check className="h-4 w-4" /> : <Circle className="h-2 w-2 opacity-0" />}
                    </Button>
                    <div className="min-w-0 flex-1">
                      <p className={cn(done && "text-muted-foreground line-through")}>{l(x.title)}</p>
                      <p className="text-xs text-muted-foreground">{t("case.due", { d: date(x.due) })} · {t("case.owner", { name: getPro(x.proId)?.name ?? "" })}</p>
                    </div>
                    <label className="sr-only" htmlFor={`st-${x.id}`}>{t("case.status")}</label>
                    <select id={`st-${x.id}`} value={x.status} onChange={(e) => setTaskStatus(x.id, e.target.value as TaskStatus)} className={`${inputCls} w-auto py-1.5`}>
                      {(["todo", "in_progress", "done"] as const).map((s) => <option key={s} value={s}>{t(`status.${s}`)}</option>)}
                    </select>
                  </li>
                );
              })}
            </ul>

            <h2 className="mt-12 text-2xl">{t("case.documents")}</h2>
            <p className="mt-2 text-xs text-muted-foreground">{t("case.docNote")}</p>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {buyerCase.documents.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span>{l(d.title)}</span>
                  <span className={cn("px-2 py-0.5 text-xs", docCls[d.status])}>{t(`doc.${d.status}`)}</span>
                </li>
              ))}
            </ul>
          </section>

          <aside>
            <h2 className="text-2xl">{t("case.pros")}</h2>
            <ul className="mt-4 space-y-3">
              {buyerCase.proIds.map(getPro).map((p) => p && (
                <li key={p.id} className="border border-border bg-card p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{t(`cat.${p.category}`)} · {localizeLocation(p.location, lang)} · {t("dir.fictional")}</p>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-2xl">{t("case.appointments")}</h2>
            <ul className="mt-4 space-y-3">
              {buyerCase.appointments.map((a) => (
                <li key={a.id} className="border-l-2 border-primary pl-3 text-sm">
                  <p className="font-medium">{l(a.title)}</p>
                  <p className="text-xs text-muted-foreground">{date(a.date, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {l(a.mode)} · {getPro(a.proId)?.name}</p>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-2xl">{t("case.activity")}</h2>
            <ul className="mt-4 space-y-3 text-sm" aria-live="polite">
              {activity.slice(0, 8).map((a) => (
                <li key={a.id} className="border-l-2 border-terracotta pl-3">{l(a.text)}<span className="block text-xs text-muted-foreground">{date(a.at)}</span></li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </Page>
  );
}
