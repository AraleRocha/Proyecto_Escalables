const Donation = require('../models/donation.model');

const getAll = async (req, res) => {
  try {
    const donations = await Donation.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener las donaciones'
    });
  }
};

const create = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const donations = await Donation.find({userId: req.params.userId
    })
    .populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener donaciones'
    });
  }
};

module.exports = { getAll, create, getByUser };