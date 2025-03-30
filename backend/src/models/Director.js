const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  estado: { type: String, default: 'Activo' },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now }
}, { collection: 'directores' }); // <- Fuerza a usar "directores"

directorSchema.pre('save', function(next) {
  this.fecha_actualizacion = new Date();
  next();
});

module.exports = mongoose.model('Director', directorSchema);

