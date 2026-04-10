const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  cardNumber: { type: String, required: true },
  expiry: { type: String, required: true },
  cvv: { type: String, required: true },
}, { timestamps: true, collection: 'Donations' });

module.exports = mongoose.model('Donation', donationSchema);