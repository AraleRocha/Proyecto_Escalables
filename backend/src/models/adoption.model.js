const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  catId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cat', required: true },
  catName: { type: String, required: true },
  catPhoto: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  status: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' },
}, { timestamps: true, collection: 'Adoptions' });

module.exports = mongoose.model('Adoption', adoptionSchema);