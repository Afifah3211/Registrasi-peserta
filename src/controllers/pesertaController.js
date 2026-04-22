const pesertaModel = require('../models/pesertaModel');
const getAllPeserta = async (req, res) => {
 try {
 const data = await pesertaModel.getAllPeserta();
 res.json(data);
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
};
const getPesertaById = async (req, res) => {
 try {
 const data = await pesertaModel.getPesertaById(req.params.id);
 if (!data) {
 return res.status(404).json({ message: 'Peserta tidak ditemukan' });
 }
 res.json(data);
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
};
const createPeserta = async (req, res) => {
 try {
 const data = await pesertaModel.createPeserta(req.body);
 res.status(201).json(data);
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
};
const updatePeserta = async (req, res) => {
 try {
 const data = await pesertaModel.updatePeserta(req.params.id, req.body);
 if (!data) {
 return res.status(404).json({ message: 'Peserta tidak ditemukan' });
 }
 res.json(data);
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
};
const deletePeserta = async (req, res) => {
 try {
 const data = await pesertaModel.deletePeserta(req.params.id);
 if (!data) {
 return res.status(404).json({ message: 'Peserta tidak ditemukan' });
 }
 res.json({ message: 'Peserta berhasil dihapus', data });
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
};
module.exports = {
 getAllPeserta,
 getPesertaById,
 createPeserta,
 updatePeserta,
 deletePeserta,
};