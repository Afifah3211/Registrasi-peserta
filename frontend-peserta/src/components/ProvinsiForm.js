'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProvinsi, updateProvinsi } from '../lib/api';

export default function ProvinsiForm({ initialData = null, isEdit = false }) {
  const router = useRouter();
  const [nama, setNama] = useState('');

  useEffect(() => {
    if (initialData) {
      setNama(initialData.nama || '');
    }
  }, [initialData]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isEdit && initialData?.id) {
        await updateProvinsi(initialData.id, nama);
        alert('Data berhasil diubah');
      } else {
        await createProvinsi(nama);
        alert('Data berhasil ditambahkan');
      }

      router.push('/provinsi');
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  const inputClass =
    'w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-500';
  const labelClass = 'mb-1 block text-sm font-medium text-slate-700';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 max-w-xl"
    >
      <div>
        <label className={labelClass}>Nama Provinsi</label>
        <input
          className={inputClass}
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white hover:bg-slate-700"
      >
        {isEdit ? 'Update' : 'Simpan'}
      </button>
    </form>
  );
}
