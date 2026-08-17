"use client";

import { useActionState } from "react";

type Action = (form: FormData) => Promise<{ ok?: string; error?: string } | void>;

export function FeedbackForm({
  action,
  children,
  className,
}: {
  action: Action;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { ok?: string; error?: string } | null, form: FormData) => {
      return (await action(form)) ?? {};
    },
    null,
  );

  return (
    <form action={formAction} className={className} encType="multipart/form-data">
      {children}
      <button
        type="submit"
        disabled={pending}
        className="font-ui rounded-full bg-trunk px-5 py-2.5 text-sm text-paper disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send"}
      </button>
      {state?.ok ? <p className="text-leaf">{state.ok}</p> : null}
      {state?.error ? <p className="text-soil">{state.error}</p> : null}
    </form>
  );
}

export function Field({
  label,
  name,
  textarea,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  textarea?: boolean;
  required?: boolean;
  type?: string;
}) {
  const cls =
    "w-full rounded-xl border border-trunk/15 bg-mist px-3 py-2 text-trunk outline-none focus:border-fire";
  return (
    <label className="font-ui block text-sm">
      {label}
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={`${cls} mt-1`} />
      ) : (
        <input name={name} type={type} required={required} className={`${cls} mt-1`} />
      )}
    </label>
  );
}
