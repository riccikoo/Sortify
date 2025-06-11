const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');

const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const rateLimit = require('express-rate-limit');

// Batasi 100 permintaan per 15 menit per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100,
  message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.'
});

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Terapkan ke semua route API
app.use('/api', limiter);
// Middleware keamanan dan parsing
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true jika pakai HTTPS
    maxAge: 1000 * 60 * 30, // 30 menit
    sameSite: 'lax'
  }
}));

// View engine dan folder views
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

// Static assets
app.use(express.static(path.join(__dirname, '../public')));

// Routes API
app.use('/api', userRoutes);
app.use('/api/schedules', scheduleRoutes);

// Routes frontend pages (EJS)
app.get('/', (req, res) => res.render('index'));
app.get('/signin', (req, res) => res.render('signin'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/dashboard', (req, res) => res.render('dashboard'));

// Tes koneksi database
db.sequelize.authenticate()
  .then(() => console.log('Koneksi DB sukses'))
  .catch(err => console.error('Koneksi gagal:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
