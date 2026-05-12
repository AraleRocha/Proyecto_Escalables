const Event = require('../models/event.model');

const getAll = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
};

const getById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener evento' });
  }
};

const create = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };