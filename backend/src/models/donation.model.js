const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  cardLast4: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
}, { timestamps: true, collection: 'Donations' });

module.exports = mongoose.model('Donation', donationSchema);