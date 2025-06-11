const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;

    // Cek apakah password dan konfirmasi sama
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Simpan user baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    res.redirect('/signin');

  } catch (error) {
    res.redirect('/signin');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    req.session.userId = user.id;
    req.session.role = user.role || "user";

    return res.redirect('/dashboard');
  } catch (err) {
    return res.redirect('/login');
  }
};



