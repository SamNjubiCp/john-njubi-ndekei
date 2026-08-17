import { LoginForm } from "@/components/LoginForm";
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Keeper" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="mx-auto max-w-md px-5 py-24">
      <h1 className="font-display text-4xl">Keeper</h1>
      <p className="mt-3 text-trunk/70">
        This door is for the family keeper — to approve stories and tend the livestream.
      </p>
      <LoginForm />
    </div>
  );
}
