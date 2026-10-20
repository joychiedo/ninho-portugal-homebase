import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n, localizeLocation } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { professionals, type ProCategory } from "@/data/case";
import { DemoTag, Page, btnOutline, inputCls } from "@/components/site";

export const Route = createFileRoute("/professionals")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Professional directory — NINHO" },
      { name: "description", content: "Fictional demo profiles of lawyers, brokers and relocation consultants in Portugal." },
      { property: "og:title", content: "Professional directory — NINHO" },
      { property: "og:description", content: "Sample professionals supporting international buyers in Portugal." },
    ],
  }),
  component: Directory,
});

const CATS: ProCategory[] = ["legal", "finance", "relocation", "agent", "survey", "tax"];

function Directory() {
  const { t, l, lang } = useI18n();
  const { intros, addIntro } = useStore();
  const [cat, setCat] = useState("");
  const list = professionals.filter((p) => !cat || p.category === cat);
  return (
    <Page>
      <div className="mx-auto max-w-7xl px-5 pt-12 md:px-8">
        <DemoTag />
        <h1 className="mt-4 text-4xl md:text-5xl">{t("dir.title")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("dir.body")}</p>
        <p className="mt-4 border-l-2 border-terracotta bg-terracotta-soft px-3 py-2 text-sm">{t("dir.note")}</p>
        <div className="mt-8 max-w-xs">
          <label htmlFor="d-cat" className="eyebrow mb-1.5 block">{t("dir.category")}</label>
          <select id="d-cat" className={inputCls} value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">{t("dir.allCategories")}</option>
            {CATS.map((c) => <option key={c} value={c}>{t(`cat.${c}`)}</option>)}
          </select>
        </div>
        {list.length === 0 ? <p className="mt-10 text-muted-foreground">{t("dir.empty")}</p> : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => {
              const done = intros.includes(p.id);
              return (
                <li key={p.id} className="flex flex-col border border-border bg-card p-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center bg-forest-soft font-serif text-lg text-primary">{p.initials}</span>
                    <div><p className="font-medium">{p.name}</p><p className="text-xs uppercase tracking-wider text-muted-foreground">{t("dir.fictional")}</p></div>
                  </div>
                  <p className="mt-4 text-sm font-medium">{t(`cat.${p.category}`)}</p>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{l(p.bio)}</p>
                  <p className="mt-4 text-xs text-muted-foreground">{t("dir.location")}: {localizeLocation(p.location, lang)} · {t("dir.languages")}: {p.languages.join(", ")}</p>
                  <Button variant="outline" type="button" disabled={done} onClick={() => addIntro(p.id, p.name)} className={`${btnOutline} mt-5 h-auto whitespace-normal disabled:opacity-70`}>
                    {done ? <><Check className="h-4 w-4" />{t("dir.requested")}</> : t("dir.contact")}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Page>
  );
}
