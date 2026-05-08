const Adoption = require('../models/adoption.model');

const getAll = async (req, res) => { //Obtener todas las adopciones
  try {
    const adoptions = await Adoption.find();
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las adopciones' });
  }
};

const create = async (req, res) => { //Crear una adopcion
  try {
    const { catId, applicantId } = req.body; // Verificar si ya existe una solicitud para este gato del mismo usuario
    const existing = await Adoption.findOne({ catId, applicantId });
    if (existing) {
      return res.status(400).json({ 
        error: 'Ya tienes una solicitud activa para este gato' 
      });
    }
    const adoption = new Adoption(req.body);
    await adoption.save();
    res.status(201).json(adoption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ applicantId: req.params.userId }).sort({ createdAt: -1 });
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!adoption) return res.status(404).json({ error: 'Solicitud no encontrada' });
    res.json(adoption);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAll, create, getByUser, updateStatus };