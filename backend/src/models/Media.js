// backend/src/models/Media.js
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  serial: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  sinopsis: { type: String },
  url_pelicula: { type: String, required: true, unique: true },
  imagen_portada: { type: String }, // aquí almacenamos la URL o ruta de la imagen
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  anio_estreno: { type: Number },
  // Relaciones
  genero_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero' },
  director_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
  productora_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora' },
  tipo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo' },
}, {
  // Forzamos el uso de la colección "medias"
  collection: 'medias'
});

// Cada vez que se guarde o actualice, ajusta la fecha_actualizacion
mediaSchema.pre('save', function(next) {
  this.fecha_actualizacion = new Date();
  next();
});

module.exports = mongoose.model('Media', mediaSchema);
