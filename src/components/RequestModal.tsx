import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { Property } from "@/data/properties";
import { Field, btnOutline, btnPrimary, inputCls } from "./site";

export function RequestModal({ p, onClose }: { p: Property; onClose: () => void }) {
  const { t, l } = useI18n();
  const { addRequest } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(t("req.messageDefault"));
  const [contact, setContact] = useState("email");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"form" | "sending" | "done">("form");
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = t("req.err.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = t("req.err.email");
    if (message.trim().length < 10) errs.message = t("req.err.message");
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    setTimeout(() => {
      addRequest(p.id, p.title);
      setState("done");
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="req-title" className="max-h-[92vh] w-full max-w-lg overflow-y-auto border border-border bg-card p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="req-title" className="text-2xl">{state === "done" ? t("req.success.t") : t("req.title")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{l(p.title)} · {p.ref}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t("req.success.close")} className="p-1"><X className="h-5 w-5" /></button>
        </div>

        {state === "done" ? (
          <div className="mt-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("req.success.b")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className={btnPrimary}>{t("req.success.dash")}</Link>
              <button type="button" onClick={onClose} className={btnOutline}>{t("req.success.close")}</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-6 space-y-4">
            <Field label={t("req.name")} htmlFor="rq-name" error={errors.name}>
              <input ref={first} id="rq-name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "rq-name-err" : undefined} autoComplete="name" />
            </Field>
            <Field label={t("req.email")} htmlFor="rq-email" error={errors.email}>
              <input id="rq-email" type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "rq-email-err" : undefined} autoComplete="email" />
            </Field>
            <Field label={t("req.message")} htmlFor="rq-msg" error={errors.message}>
              <textarea id="rq-msg" rows={4} className={inputCls} value={message} onChange={(e) => setMessage(e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "rq-msg-err" : undefined} />
            </Field>
            <fieldset>
              <legend className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("req.contact")}</legend>
              <div className="flex gap-5 text-sm">
                {(["email", "video"] as const).map((c) => (
                  <label key={c} className="inline-flex items-center gap-2">
                    <input type="radio" name="contact" value={c} checked={contact === c} onChange={() => setContact(c)} className="accent-primary" />
                    {t(`req.contact.${c}`)}
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="border-l-2 border-terracotta bg-terracotta-soft px-3 py-2 text-xs text-foreground">{t("req.note")}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" disabled={state === "sending"} className={btnPrimary}>{state === "sending" ? t("req.sending") : t("req.submit")}</button>
              <button type="button" onClick={onClose} className={btnOutline}>{t("req.cancel")}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
