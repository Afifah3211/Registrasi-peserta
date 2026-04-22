require('dotenv').config();
const express = require('express');
const cors = require('cors');
const provinsiRoutes = require('./routes/provinsiRoutes');
const kabkoRoutes = require('./routes/kabkoRoutes');
const pesertaRoutes = require('./routes/pesertaRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API Node.js + PostgreSQL berjalan...');
});
app.use('/provinsi', provinsiRoutes);
app.use('/kabko', kabkoRoutes);
app.use('/peserta', pesertaRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
