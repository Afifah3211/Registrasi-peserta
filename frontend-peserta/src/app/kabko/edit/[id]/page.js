import Link from 'next/link';
import { getKabkoById } from '../../../../lib/api';
import KabkoForm from '../../../../components/KabkoForm';

export default async function EditKabkoPage({ params }) {
  const { id } = await params;
  const data = await getKabkoById(id);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Edit Kabupaten/Kota</h2>
          <p className="text-sm text-slate-600">
            Ubah data kabupaten/kota yang sudah ada.
          </p>
        </div>
        <Link
          href="/kabko"
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          &larr; Kembali
        </Link>
      </div>

      <KabkoForm initialData={data} isEdit={true} />
    </section>
  );
}
