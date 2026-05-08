const User = require('../models/user.model');

const getFirst = async (req, res) => {
  try {
    const user = await User.findOne().sort({ createdAt: 1 });
    if (!user) return res.status(404).json({ error: 'No hay usuarios' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAll, create, getFirst };