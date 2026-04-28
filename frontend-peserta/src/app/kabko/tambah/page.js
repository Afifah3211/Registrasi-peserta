import KabkoForm from '../../../components/KabkoForm';
import Link from 'next/link';

export default function TambahKabkoPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tambah Kabupaten/Kota</h2>
          <p className="text-sm text-slate-600">
            Isi formulir untuk menambahkan data kabupaten/kota baru.
          </p>
        </div>
        <Link
          href="/kabko"
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          &larr; Kembali
        </Link>
      </div>

      <KabkoForm />
    </section>
  );
}
