"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/admin";

export function LoginForm() {
  const [state, action, pending] = useActionState(
    async (_: { error?: string } | null, form: FormData) => loginAction(form),
    null,
  );
  return (
    <form action={action} className="mt-8 grid gap-4">
      <label className="font-ui text-sm">
        Password
        <input
          type="password"
          name="password"
          required
          className="mt-1 w-full rounded-xl border border-trunk/15 bg-paper px-3 py-2"
        />
      </label>
      <button
        disabled={pending}
        className="font-ui rounded-full bg-trunk px-5 py-2.5 text-paper disabled:opacity-60"
      >
        {pending ? "Entering…" : "Enter"}
      </button>
      {state?.error ? <p className="text-soil">{state.error}</p> : null}
    </form>
  );
}
