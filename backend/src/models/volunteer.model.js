const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  availability: { 
    type: String, 
    enum: ['manana', 'tarde', 'fines_de_semana'], 
    required: true 
  },
  message: { type: String },
  status: { type: String, enum: ['pendiente', 'aceptado', 'rechazado'], default: 'pendiente' },
}, { timestamps: true, collection: 'Volunteers' });

module.exports = mongoose.model('Volunteer', volunteerSchema);