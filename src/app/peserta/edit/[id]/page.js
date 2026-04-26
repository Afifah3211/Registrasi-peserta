import Link from 'next/link';
import { getPesertaById } from '../../../../lib/api';
import PesertaForm from '../../../../components/PesertaForm';

export default async function EditPesertaPage({ params }) {
  const { id } = await params;
  const data = await getPesertaById(id);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Edit Peserta</h2>
          <p className="text-sm text-slate-600">
            Ubah data peserta yang sudah ada.
          </p>
        </div>
        <Link
          href="/peserta"
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          &larr; Kembali
        </Link>
      </div>

      <PesertaForm initialData={data} isEdit={true} />
    </section>
  );
}