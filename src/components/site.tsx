import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Bath, BedDouble, Heart, Maximize, Menu, X } from "lucide-react";
import { useI18n, type L } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export function Wordmark() {
  return (
    <Link to="/" className="font-serif text-2xl tracking-[0.18em] text-foreground" aria-label="NINHO">
      NINHO
    </Link>
  );
}

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t("lang.label")} className={cn("inline-flex border border-border text-xs", className)}>
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l === "pt" ? "pt-PT" : "en"}
          className={cn(
            "px-2.5 py-1.5 font-medium tracking-wide transition-colors",
            lang === l ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l === "en" ? "EN" : "PT"}
        </button>
      ))}
    </div>
  );
}

const navItems = [
  { to: "/properties", key: "nav.explore" },
  { to: "/professionals", key: "nav.professionals" },
  { to: "/dashboard", key: "nav.dashboard" },
] as const;

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="border-b border-border bg-secondary px-4 py-1.5 text-center text-xs text-muted-foreground">{t("demo.banner")}</div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Wordmark />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-foreground underline underline-offset-8 decoration-terracotta" }}
            >
              {t(n.key)}
            </Link>
          ))}
          <LangToggle />
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("nav.close") : t("nav.menu")}
            className="p-2"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background px-5 py-4 md:hidden">
          {navItems.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-serif text-xl last:border-0">
              {t(n.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        <div>
          <p className="eyebrow">{t("footer.product")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:underline">{t(n.key)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">{t("footer.about")}</p>
          <p className="mt-4 text-sm text-muted-foreground">{t("footer.aboutBody")}</p>
        </div>
      </div>
      <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">© 2026 {t("footer.rights")}</div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function FavButton({ id, name, variant = "icon" }: { id: string; name: L; variant?: "icon" | "full" }) {
  const { isFav, toggleFav } = useStore();
  const { t, l } = useI18n();
  const on = isFav(id);
  const aria = t(on ? "prop.unsaveAria" : "prop.saveAria", { name: l(name) });
  if (variant === "full")
    return (
      <button
        type="button"
        onClick={() => toggleFav(id, name)}
        aria-pressed={on}
        className={cn("inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition-colors", on ? "border-terracotta bg-terracotta-soft text-foreground" : "border-border hover:border-foreground")}
      >
        <Heart className={cn("h-4 w-4", on && "fill-terracotta text-terracotta")} />
        {on ? t("prop.saved") : t("prop.save")}
      </button>
    );
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFav(id, name);
      }}
      aria-pressed={on}
      aria-label={aria}
      className="flex h-9 w-9 items-center justify-center border border-border bg-card"
    >
      <Heart className={cn("h-4 w-4", on ? "fill-terracotta text-terracotta" : "text-foreground")} />
    </button>
  );
}

export function Specs({ p, className }: { p: Property; className?: string }) {
  const { t } = useI18n();
  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground", className)}>
      <li className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{t("prop.beds", { n: p.beds })}</li>
      <li className="inline-flex items-center gap-1.5"><Bath className="h-4 w-4" />{t("prop.baths", { n: p.baths })}</li>
      <li className="inline-flex items-center gap-1.5"><Maximize className="h-4 w-4" />{p.size} m²</li>
    </ul>
  );
}

export function PropertyCard({ p }: { p: Property }) {
  const { t, l, price } = useI18n();
  return (
    <article className="group relative flex flex-col border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={p.images[0]} alt={l(p.title)} loading="lazy" width={1200} height={912} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
        <div className="absolute right-3 top-3 z-10">
          <FavButton id={p.id} name={p.title} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{p.area} · {t(`loc.${p.region}`)}</p>
        <h3 className="mt-2 text-xl leading-snug">
          <Link to="/properties/$id" params={{ id: p.id }} className="after:absolute after:inset-0">
            {l(p.title)}
          </Link>
        </h3>
        <Specs p={p} className="mt-3" />
        <div className="mt-auto flex items-end justify-between pt-5">
          <p className="font-serif text-2xl">{price(p.price)}</p>
          <span className="text-xs text-muted-foreground">{t(`type.${p.type}`)}</span>
        </div>
      </div>
    </article>
  );
}

export function DemoTag() {
  const { t } = useI18n();
  return <span className="inline-block border border-terracotta/40 bg-terracotta-soft px-2 py-0.5 text-[11px] uppercase tracking-wider text-foreground">{t("demo.tag")}</span>;
}

export function Field({ label, htmlFor, children, error }: { label: string; htmlFor: string; children: ReactNode; error?: string | undefined }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
      {error && <p id={`${htmlFor}-err`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

export const inputCls = "w-full border border-input bg-card px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
export const btnPrimary = "inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";
export const btnOutline = "inline-flex items-center justify-center gap-2 border border-foreground px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background";
