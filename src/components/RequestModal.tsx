import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import type { Property } from "@/data/properties";
import { Field, btnOutline, btnPrimary, inputCls } from "./site";

export function RequestModal({ p, onClose }: { p: Property; onClose: () => void }) {
  const { t, l } = useI18n();
  const { addRequest, requested } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(t("req.messageDefault"));
  const [contact, setContact] = useState("email");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [state, setState] = useState<"form" | "sending" | "done">(requested.includes(p.id) ? "done" : "form");
  const first = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const messageLang = useRef(t("req.messageDefault"));
  const defaultMessage = t("req.messageDefault");

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    setMessage(value => value === messageLang.current ? defaultMessage : value);
    messageLang.current = defaultMessage;
    setErrors({});
  }, [defaultMessage]);
  const close = () => { clearTimeout(timer.current); onClose(); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== "form") return;
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errs.name = t("req.err.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = t("req.err.email");
    if (message.trim().length < 10) errs.message = t("req.err.message");
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    timer.current = setTimeout(() => {
      addRequest(p.id, p.title);
      setState("done");
    }, 900);
  };

  return (
    <Dialog.Root open onOpenChange={open => { if (!open) close(); }}>
      <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
      <Dialog.Content onOpenAutoFocus={event => { if (state === "form") { event.preventDefault(); first.current?.focus(); } }} onCloseAutoFocus={event => { event.preventDefault(); document.querySelector<HTMLButtonElement>("[data-request-trigger]")?.focus(); }} className="fixed bottom-0 left-1/2 z-50 max-h-[92dvh] w-full max-w-lg -translate-x-1/2 overflow-y-auto border border-border bg-card p-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Dialog.Title className="font-serif text-2xl">{state === "done" ? t("req.success.t") : t("req.title")}</Dialog.Title>
            <Dialog.Description className="mt-1 text-sm text-muted-foreground">{l(p.title)} · {p.ref}</Dialog.Description>
          </div>
          <Button variant="ghost" type="button" onClick={close} aria-label={t("req.success.close")} className="p-1"><X className="h-5 w-5" /></Button>
        </div>

        {state === "done" ? (
          <div className="mt-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("req.success.b")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className={`${btnPrimary} h-auto whitespace-normal`}>{t("req.success.dash")}</Link>
              <Button variant="ghost" type="button" onClick={close} className={`${btnOutline} h-auto whitespace-normal`}>{t("req.success.close")}</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} aria-busy={state === "sending"} noValidate className="mt-6 space-y-4">
            <Field label={t("req.name")} htmlFor="rq-name" error={errors.name}>
              <input ref={first} id="rq-name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "rq-name-err" : undefined} autoComplete="off" placeholder="Demo Buyer" />
            </Field>
            <Field label={t("req.email")} htmlFor="rq-email" error={errors.email}>
              <input id="rq-email" type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "rq-email-err" : undefined} autoComplete="off" placeholder="buyer@example.com" />
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
              <Button variant="ghost" type="submit" disabled={state === "sending"} className={`${btnPrimary} h-auto whitespace-normal`}>{state === "sending" ? t("req.sending") : t("req.submit")}</Button>
              <Button variant="ghost" type="button" onClick={close} className={`${btnOutline} h-auto whitespace-normal`}>{t("req.cancel")}</Button>
            </div>
          </form>
        )}
      </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
