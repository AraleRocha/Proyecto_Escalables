const { response, request } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Datos incompletos' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: '4h' },
      (err, token) => {
        if (err) return res.status(500).json({ msg: 'Error al generar token' });
        return res.status(200).json({
          msg: 'Login exitoso',
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
};

const register = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: 'Datos incompletos' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
};

module.exports = { login, register };