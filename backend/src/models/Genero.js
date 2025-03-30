// backend/src/models/Genero.js
const mongoose = require('mongoose');

const generoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, default: 'Activo' },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  descripcion: { type: String }
});

// Middleware para actualizar la fecha_actualizacion antes de guardar
generoSchema.pre('save', function (next) {
  this.fecha_actualizacion = new Date();
  next();
});

module.exports = mongoose.model('Genero', generoSchema);
