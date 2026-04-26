'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createPeserta,
  updatePeserta,
  getProvinsi,
  getKabkoByProvinsi,
} from '../lib/api';

export default function PesertaForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: '',
    tempatlahir: '',
    tanggallahir: '',
    agama: '',
    alamat: '',
    telepon: '',
    jk: '',
    hobi: '',
    foto: '',
    idkabko: '',
  });

  const [fotoFile, setFotoFile] = useState(null);

  const [provinsi, setProvinsi] = useState([]);
  const [kabko, setKabko] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState('');

  useEffect(() => {
    async function loadProvinsi() {
      try {
        const data = await getProvinsi();
        setProvinsi(data);
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
        tempatlahir: initialData.tempatlahir || '',
        tanggallahir: initialData.tanggallahir
          ? initialData.tanggallahir.substring(0, 10)
          : '',
        agama: initialData.agama || '',
        alamat: initialData.alamat || '',
        telepon: initialData.telepon || '',
        jk: initialData.jk || '',
        hobi: initialData.hobi || '',
        foto: initialData.foto || '',
        idkabko: initialData.idkabko || '',
      });
      
      if (initialData.id_provinsi) {
        setSelectedProvinsi(initialData.id_provinsi);
        getKabkoByProvinsi(initialData.id_provinsi)
          .then((data) => setKabko(data))
          .catch((error) => alert(error.message));
      }
    }
  }, [initialData]);

  async function handleProvinsiChange(e) {
    const idProvinsi = e.target.value;
    setSelectedProvinsi(idProvinsi);
    setForm((prev) => ({ ...prev, idkabko: '' }));

    if (!idProvinsi) {
      setKabko([]);
      return;
    }

    try {
      const data = await getKabkoByProvinsi(idProvinsi);
      setKabko(data);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
    } else {
      setFotoFile(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (key !== 'foto') {
        const val = form[key];
        // Hanya tambahkan ke FormData jika tidak kosong
        if (val !== '' && val !== null) {
          formData.append(key, val);
        }
      }
    }

    // Tambahkan file foto jika ada
    if (fotoFile) {
      formData.append('foto', fotoFile);
    } else if (isEdit && form.foto) {
      // Jika edit dan tidak ada file baru, kirim string nama file lama
      formData.append('foto', form.foto);
    }

    try {
      if (isEdit && initialData?.id) {
        await updatePeserta(initialData.id, formData);
        alert('Data berhasil diubah');
      } else {
        await createPeserta(formData);
        alert('Data berhasil ditambahkan');
      }

      router.push('/peserta');
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
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Nama</label>
          <input className={inputClass} type="text" name="nama" value={form.nama} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Tempat Lahir</label>
          <input className={inputClass} type="text" name="tempatlahir" value={form.tempatlahir} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Tanggal Lahir</label>
          <input className={inputClass} type="date" name="tanggallahir" value={form.tanggallahir} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Agama</label>
          <input className={inputClass} type="text" name="agama" value={form.agama} onChange={handleChange} />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Alamat</label>
          <textarea className={inputClass} name="alamat" value={form.alamat} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Telepon</label>
          <input className={inputClass} type="text" name="telepon" value={form.telepon} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Jenis Kelamin</label>
          <select className={inputClass} name="jk" value={form.jk} onChange={handleChange}>
            <option value="">-- Pilih --</option>
            <option value="1">Pria</option>
            <option value="2">Wanita</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Hobi</label>
          <input className={inputClass} type="text" name="hobi" value={form.hobi} onChange={handleChange} />
        </div>

        <div>
          <label className={labelClass}>Foto</label>
          {isEdit && form.foto && !fotoFile && (
            <div className="mb-2 text-sm text-slate-500">
              Foto saat ini: {form.foto}
            </div>
          )}
          <input className={inputClass} type="file" name="foto" accept="image/*" onChange={handleFileChange} />
        </div>

        <div>
          <label className={labelClass}>Provinsi</label>
          <select className={inputClass} value={selectedProvinsi} onChange={handleProvinsiChange}>
            <option value="">-- Pilih Provinsi --</option>
            {provinsi.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Kabko</label>
          <select className={inputClass} name="idkabko" value={form.idkabko} onChange={handleChange}>
            <option value="">-- Pilih Kabko --</option>
            {kabko.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>
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