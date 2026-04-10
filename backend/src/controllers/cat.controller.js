const Cat = require('../models/cat.model');

const getAll = async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener gatos' });
  }
};

const getById = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Gato no encontrado' });
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener gato' });
  }
};

const create = async (req, res) => {
  try {
    const cat = new Cat(req.body);
    await cat.save();
    res.status(201).json(cat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const cat = await Cat.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Gato no encontrado' });
    res.json({ mensaje: 'Gato eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar gato' });
  }
};

module.exports = { getAll, getById, create, remove };