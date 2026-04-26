const express = require('express');
const router = express.Router();
const pesertaController = require('../controllers/pesertaController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'storage/uploads/foto';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'foto-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.get('/', pesertaController.getAllPeserta);
router.get('/:id', pesertaController.getPesertaById);
router.post('/', upload.single('foto'), pesertaController.createPeserta);
router.put('/:id', upload.single('foto'), pesertaController.updatePeserta);
router.delete('/:id', pesertaController.deletePeserta);
module.exports = router;