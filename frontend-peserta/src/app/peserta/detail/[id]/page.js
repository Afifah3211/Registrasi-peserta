import Link from 'next/link';
import { getPesertaById } from '../../../../lib/api';

export default async function DetailPesertaPage({ params }) {
  const { id } = await params;
  
  let peserta = null;
  let error = null;

  try {
    peserta = await getPesertaById(id);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-2xl bg-red-50 p-6 text-red-600 ring-1 ring-red-200">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
          <Link href="/peserta" className="mt-4 inline-block text-slate-600 hover:text-slate-900">
            &larr; Kembali ke Daftar Peserta
          </Link>
        </div>
      </div>
    );
  }

  if (!peserta) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-center text-slate-500">
        Loading...
      </div>
    );
  }

  const API_URL = "http://localhost:3001";
  const photoUrl = peserta.foto ? `${API_URL}/storage/uploads/foto/${peserta.foto}` : null;

  const LabelValue = ({ label, value }) => (
    <div className="border-b border-slate-100 py-3 last:border-0">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-base text-slate-900 sm:mt-2">{value || '-'}</dd>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Detail Peserta</h1>
        <Link
          href="/peserta"
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
        >
          &larr; Kembali
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Bagian Foto */}
          <div className="bg-slate-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            {photoUrl ? (
              <div className="relative h-48 w-48 overflow-hidden rounded-2xl shadow-sm ring-4 ring-white">
                <img 
                  src={photoUrl} 
                  alt={`Foto ${peserta.nama}`} 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-slate-200 text-slate-400 ring-4 ring-white">
                <span className="text-sm font-medium">Tidak ada foto</span>
              </div>
            )}
            <h2 className="mt-6 text-xl font-bold text-slate-900 text-center">{peserta.nama}</h2>
            <p className="text-sm text-slate-500 mt-1">{peserta.nama_kabko}, {peserta.nama_provinsi}</p>
          </div>

          {/* Bagian Data */}
          <div className="p-6 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <dl>
              <LabelValue label="ID Peserta" value={peserta.id} />
              <LabelValue label="Nama Lengkap" value={peserta.nama} />
              <LabelValue label="Tempat Lahir" value={peserta.tempatlahir} />
              <LabelValue 
                label="Tanggal Lahir" 
                value={peserta.tanggallahir ? new Date(peserta.tanggallahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'} 
              />
              <LabelValue label="Jenis Kelamin" value={peserta.jk == '1' ? 'Pria' : peserta.jk == '2' ? 'Wanita' : peserta.jk} />
            </dl>
            <dl>
              <LabelValue label="Agama" value={peserta.agama} />
              <LabelValue label="Telepon" value={peserta.telepon} />
              <LabelValue label="Hobi" value={peserta.hobi} />
              <LabelValue label="Alamat" value={peserta.alamat} />
              <LabelValue label="Provinsi" value={peserta.nama_provinsi} />
              <LabelValue label="Kabupaten/Kota" value={peserta.nama_kabko} />
            </dl>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-3">
        <Link
          href={`/peserta/edit/${peserta.id}`}
          className="rounded-xl bg-amber-500 px-6 py-2.5 font-medium text-white shadow-sm hover:bg-amber-600"
        >
          Edit Data
        </Link>
      </div>
    </div>
  );
}
