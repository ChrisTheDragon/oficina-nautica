"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitEvent, useState } from "react";

import { createClient } from "@/lib/supabase/client";

type LoginErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const validationErrors: LoginErrors = {};

    if (!email) {
      validationErrors.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Informe um e-mail válido.";
    }

    if (!password) {
      validationErrors.password = "Informe sua senha.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrors({ form: "E-mail ou senha inválidos. Confira seus dados e tente novamente." });
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f4f7f8] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1fr_1.05fr]">
        <section className="hidden flex-col justify-between bg-slate-900 p-10 text-white lg:flex xl:p-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Oficina Náutica
            </p>
            <div className="mt-24 max-w-md">
              <p className="text-sm font-medium text-cyan-300">Gestão simples e completa</p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                Mais tempo para cuidar do seu negócio.
              </h1>
              <p className="mt-6 text-base leading-7 text-slate-300">
                Organize clientes, serviços, equipamentos e finanças da sua oficina em um
                único lugar.
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400">Feito para oficinas náuticas.</p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                Oficina Náutica
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-cyan-700">Bem-vindo de volta</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Acesse sua conta
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Entre com seus dados para continuar gerenciando sua oficina.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                  E-mail
                </label>
                <input
                  autoComplete="email"
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={Boolean(errors.email)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                  id="email"
                  name="email"
                  placeholder="voce@exemplo.com"
                  required
                  type="email"
                />
                {errors.email && (
                  <p className="mt-2 text-xs font-medium text-red-600" id="email-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                    Senha
                  </label>
                  <Link
                    className="text-xs font-semibold text-cyan-700 transition hover:text-cyan-900"
                    href="/auth/recuperar-senha"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    autoComplete="current-password"
                    aria-describedby={errors.password ? "password-error" : undefined}
                    aria-invalid={Boolean(errors.password)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute inset-y-0 right-3 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs font-medium text-red-600" id="password-error">
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.form && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                  {errors.form}
                </p>
              )}

              <button
                className="w-full rounded-xl bg-cyan-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Ainda não tem uma conta?{" "}
              <Link
                className="font-semibold text-cyan-700 transition hover:text-cyan-900"
                href="/auth/cadastro"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}