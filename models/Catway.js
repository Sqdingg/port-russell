const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est obligatoire'],
    unique: true
  },
  catwayType: {
    type: String,
    required: [true, 'Le type est obligatoire'],
    enum: ['long', 'short']
  },
  catwayState: {
    type: String,
    required: [true, 'L\'état est obligatoire'],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Catway', catwaySchema);