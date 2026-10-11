export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f7f8] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Oficina Náutica
            </p>
            <h1 className="mt-1 text-xl font-bold tracking-tight">Visão geral</h1>
          </div>
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
            Preparação
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <section className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm sm:p-7">
          <p className="text-sm font-medium text-cyan-300">Bom dia</p>
          <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Organize sua oficina em um só lugar.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Esta é a primeira base do dashboard. Os indicadores serão conectados ao
            banco de dados na próxima etapa.
          </p>
          <button className="mt-5 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">
            Criar orçamento
          </button>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Receita do mês", "R$ 0,00", "Nenhum lançamento"],
            ["Despesas do mês", "R$ 0,00", "Nenhum lançamento"],
            ["Orçamentos pendentes", "0", "Aguardando resposta"],
            ["Serviços em andamento", "0", "Nenhum serviço aberto"],
          ].map(([label, value, detail]) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
              <p className="mt-2 text-xs text-slate-400">{detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold">Ações rápidas</h2>
            <p className="mt-1 text-sm text-slate-500">Comece pelos cadastros essenciais.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Novo cliente", "Novo serviço", "Novo equipamento"].map((action) => (
                <button
                  key={action}
                  className="rounded-xl border border-slate-200 px-4 py-4 text-left text-sm font-semibold transition hover:border-cyan-400 hover:bg-cyan-50"
                >
                  {action}
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold">Próximos passos</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-600">
              {["Conectar o PostgreSQL", "Criar autenticação", "Cadastrar o primeiro cliente"].map(
                (step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-800">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ),
              )}
            </ol>
          </article>
        </section>
      </main>
    </div>
  );
}
