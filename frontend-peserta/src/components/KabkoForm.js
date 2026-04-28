'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createKabko, updateKabko, getProvinsi } from '../lib/api';

export default function KabkoForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: '',
    id_provinsi: '',
  });

  const [provinsiList, setProvinsiList] = useState([]);

  useEffect(() => {
    async function loadProvinsi() {
      try {
        const data = await getProvinsi();
        setProvinsiList(data);
      } catch (error) {
        alert(error.message);
      }
    }
    loadProvinsi();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        nama: initialData.nama || '',
        id_provinsi: initialData.id_provinsi || '',
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (isEdit && initialData?.id) {
        await updateKabko(initialData.id, form);
        alert('Data berhasil diubah');
      } else {
        await createKabko(form);
        alert('Data berhasil ditambahkan');
      }

      router.push('/kabko');
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
        <label className={labelClass}>Nama Kabupaten/Kota</label>
        <input
          className={inputClass}
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className={labelClass}>Provinsi</label>
        <select
          className={inputClass}
          name="id_provinsi"
          value={form.id_provinsi}
          onChange={handleChange}
          required
        >
          <option value="">-- Pilih Provinsi --</option>
          {provinsiList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama}
            </option>
          ))}
        </select>
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
