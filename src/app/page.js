export default function HomePage() {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-3 text-3xl font-bold text-slate-900">
        Aplikasi CRUD Peserta
      </h2>
      <p className="text-slate-600">
        Frontend ini dibuat dengan Next.js App Router dan Tailwind CSS, lalu
        terhubung ke backend Node.js + PostgreSQL.
      </p>
    </section>
  );
}