const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true,
}));

// Mount routing
app.use('/api', userRoutes);

// Test koneksi database
db.sequelize.authenticate()
  .then(() => console.log('Koneksi DB sukses'))
  .catch(err => console.error('Koneksi gagal:', err));

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
