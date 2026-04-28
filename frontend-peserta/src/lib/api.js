const API_URL = "http://localhost:3001";

// ─── PROVINSI ───────────────────────────────────────────────────────────────

export async function getProvinsi() {
  const res = await fetch(`${API_URL}/provinsi`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil provinsi');
  return res.json();
}

export async function getProvinsiById(id) {
  const res = await fetch(`${API_URL}/provinsi/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil detail provinsi');
  return res.json();
}

export async function createProvinsi(nama) {
  const res = await fetch(`${API_URL}/provinsi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Gagal menambah provinsi');
  }
  return res.json();
}

export async function updateProvinsi(id, nama) {
  const res = await fetch(`${API_URL}/provinsi/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Gagal mengubah provinsi');
  }
  return res.json();
}

export async function deleteProvinsi(id) {
  const res = await fetch(`${API_URL}/provinsi/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal menghapus provinsi');
  return res.json();
}

// ─── KABKO ──────────────────────────────────────────────────────────────────

export async function getKabko() {
  const res = await fetch(`${API_URL}/kabko`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil kabko');
  return res.json();
}

export async function getKabkoById(id) {
  const res = await fetch(`${API_URL}/kabko/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil detail kabko');
  return res.json();
}

export async function getKabkoByProvinsi(idProvinsi) {
  const res = await fetch(`${API_URL}/kabko/provinsi/${idProvinsi}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Gagal mengambil kabko');
  return res.json();
}

export async function createKabko(data) {
  const res = await fetch(`${API_URL}/kabko`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Gagal menambah kabko');
  }
  return res.json();
}

export async function updateKabko(id, data) {
  const res = await fetch(`${API_URL}/kabko/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Gagal mengubah kabko');
  }
  return res.json();
}

export async function deleteKabko(id) {
  const res = await fetch(`${API_URL}/kabko/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal menghapus kabko');
  return res.json();
}

export async function getPeserta() {
  const res = await fetch(`${API_URL}/peserta`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil peserta');
  return res.json();
}

export async function getPesertaById(id) {
  const res = await fetch(`${API_URL}/peserta/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal mengambil detail peserta');
  return res.json();
}

export async function createPeserta(data) {
  const isFormData = typeof window !== 'undefined' && data instanceof FormData;
  
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_URL}/peserta`, {
    method: 'POST',
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Gagal menambah peserta');
  }
  return res.json();
}

export async function updatePeserta(id, data) {
  const isFormData = typeof window !== 'undefined' && data instanceof FormData;
  
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_URL}/peserta/${id}`, {
    method: 'PUT',
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Gagal mengubah peserta');
  }
  return res.json();
}

export async function deletePeserta(id) {
  const res = await fetch(`${API_URL}/peserta/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Gagal menghapus peserta');
  return res.json();
}