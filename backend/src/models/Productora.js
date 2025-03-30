// backend/src/models/Productora.js
const mongoose = require('mongoose');
const { collection } = require('./Media');

const productoraSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, default: 'Activo' },   
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
  slogan: { type: String, default: '' },
  descripcion: { type: String, default: '' },
},{collection: 'productoras'});

// Middleware para actualizar 'fecha_actualizacion'
productoraSchema.pre('save', function(next) {
  this.fecha_actualizacion = new Date();
  next();
});

module.exports = mongoose.model('Productora', productoraSchema);
