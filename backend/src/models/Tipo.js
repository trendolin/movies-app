// models/Tipo.js
const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String },
  estado: { type: String, default: 'Activo' },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
}, {
  strict: true
});

// Actualizar la fecha de actualización antes de guardar
tipoSchema.pre('save', function (next) {
  this.fechaActualizacion = new Date();
  next();
});

module.exports = mongoose.model('Tipo', tipoSchema);