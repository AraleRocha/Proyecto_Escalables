const Donation = require('../models/donation.model');

const getAll = async (req, res) => { //Obtener todas las donaciones
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las donaciones' });
  }
};

const create = async (req, res) => { //Crear una donacion
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAll, create };