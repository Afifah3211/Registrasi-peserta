import Link from 'next/link';
import { getProvinsiById } from '../../../../lib/api';

export default async function DetailProvinsiPage({ params }) {
  const { id } = await params;
  
  let provinsi = null;
  let error = null;

  try {
    provinsi = await getProvinsiById(id);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-2xl bg-red-50 p-6 text-red-600 ring-1 ring-red-200">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
          <Link href="/provinsi" className="mt-4 inline-block text-slate-600 hover:text-slate-900">
            &larr; Kembali ke Daftar Provinsi
          </Link>
        </div>
      </div>
    );
  }

  if (!provinsi) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  const LabelValue = ({ label, value }) => (
    <div className="border-b border-slate-100 py-3 last:border-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-base font-semibold text-slate-900 sm:mt-0">{value || '-'}</dd>
    </div>
  );

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Detail Provinsi</h1>
        <Link
          href="/provinsi"
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          &larr; Kembali
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <dl>
          <LabelValue label="ID Provinsi" value={provinsi.id} />
          <LabelValue label="Nama Provinsi" value={provinsi.nama} />
        </dl>
      </div>
      
      <div className="mt-6 flex justify-end gap-3">
        <Link
          href={`/provinsi/edit/${provinsi.id}`}
          className="rounded-xl bg-amber-500 px-6 py-2.5 font-medium text-white shadow-sm hover:bg-amber-600"
        >
          Edit Data
        </Link>
      </div>
    </div>
  );
}
