const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  Fecha: {
    type: Date,
    required: true
  },
  Lote: {
    type: String,
    required: true
  },
  Cronometro: {
    type: String,
    required: true
  },
  Meta: {
    type: Number,
    required: true
  },
  ConteoReal: {
    type: Number,
    required: true
  },
  Cumplimiento: {
    type: Number,
    required: true
  },
  ParoTotal: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('iotgepdc', subscriberSchema)