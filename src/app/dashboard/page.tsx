import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { claims },
  } = await supabase.auth.getClaims();

  if (!claims) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen bg-[#f4f7f8] px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Oficina Náutica
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Visão geral</h1>
      </div>
    </main>
  );
}