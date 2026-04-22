const pool = require('../config/db');
const getAllPeserta = async () => {
 const query = `
 SELECT
 ps.id,
 ps.nama,
 ps.tempatlahir,
 ps.tanggallahir,
 ps.agama,
 ps.alamat,
 ps.telepon,
 ps.jk,
 ps.hobi,
 ps.foto,
 ps.idkabko,
 k.nama AS nama_kabko,
 pr.nama AS nama_provinsi
 FROM peserta ps
 LEFT JOIN kabko k ON ps.idkabko = k.id
 LEFT JOIN provinsi pr ON k.id_provinsi = pr.id
 ORDER BY ps.id ASC
 `;
 const result = await pool.query(query);
 return result.rows;
};
const getPesertaById = async (id) => {
 const query = `
 SELECT
 ps.id,
 ps.nama,
 ps.tempatlahir,
 ps.tanggallahir,
 ps.agama,
 ps.alamat,
 ps.telepon,
 ps.jk,
 ps.hobi,
 ps.foto,
 ps.idkabko,
 k.nama AS nama_kabko,
 pr.nama AS nama_provinsi
 FROM peserta ps
 LEFT JOIN kabko k ON ps.idkabko = k.id
 LEFT JOIN provinsi pr ON k.id_provinsi = pr.id
 WHERE ps.id = $1
 `;
 const result = await pool.query(query, [id]);
 return result.rows[0];
};
const createPeserta = async (data) => {
 const {
 nama, tempatlahir, tanggallahir,
 agama, alamat, telepon, jk, hobi, foto, idkabko
 } = data;
 const query = `
 INSERT INTO peserta
 (nama, tempatlahir, tanggallahir, agama, alamat, telepon, jk, hobi, foto, idkabko)
 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
 RETURNING *
 `;
 const values = [
 nama, tempatlahir, tanggallahir,
 agama, alamat, telepon, jk, hobi, foto, idkabko
 ];
 const result = await pool.query(query, values);
 return result.rows[0];
};
const updatePeserta = async (id, data) => {
 const {
 nama, tempatlahir, tanggallahir,
 agama, alamat, telepon, jk, hobi, foto, idkabko
 } = data;
 const query = `
 UPDATE peserta SET
 nama = $1,
 tempatlahir = $2,
 tanggallahir = $3,
 agama = $4,
 alamat = $5,
 telepon = $6,
 jk = $7,
 hobi = $8,
 foto = $9,
 idkabko = $10
 WHERE id = $11
 RETURNING *
 `;
 const values = [
 nama, tempatlahir, tanggallahir,
 agama, alamat, telepon, jk, hobi, foto, idkabko, id
 ];
 const result = await pool.query(query, values);
 return result.rows[0];
};
const deletePeserta = async (id) => {
 const result = await pool.query(
 'DELETE FROM peserta WHERE id = $1 RETURNING *',
 [id]
 );
 return result.rows[0];
};
module.exports = {
 getAllPeserta,
 getPesertaById,
 createPeserta,
 updatePeserta,
 deletePeserta,
};
