const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  ageCategory: { type: String, enum: ['cachorro', 'adulto', 'senior'], required: true },
  gender: { type: String, enum: ['macho', 'hembra'], required: true },
  behavior: [{ type: String, enum: ['tranquilo', 'activo', 'cariñoso', 'independiente', 'sociable'] }],
  breed: { type: String, required: true },
  size: { type: String, enum: ['pequeño', 'mediano', 'grande'], required: true },
  photo:{ type: String, required: true },
  story: { type: String, required: true },
  isVaccinated: { type: Boolean, default: false },
  isSterilized: { type: Boolean, default: false },
  status: { type: String, enum: ['disponible', 'en_proceso', 'adoptado'], default: 'disponible' },
}, { timestamps: true, collection: 'Cats' });

module.exports = mongoose.model('Cat', catSchema);