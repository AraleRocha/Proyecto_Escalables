const Volunteer = require('../models/volunteer.model');

const getAll = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener voluntarios' });
  }
};

const create = async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar estado de un voluntario (aceptado/rechazado)
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!volunteer) return res.status(404).json({ error: 'Voluntario no encontrado' });
    res.json(volunteer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAll, create, updateStatus };