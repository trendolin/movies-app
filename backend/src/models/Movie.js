const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    anio: { type: Number, required: true },
    duracion: { type: Number, required: true }, // Minutos
    genero: [{ type: String, required: true }], // Array de géneros
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora', required: true },
    tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo', required: true },
    estado: { type: Boolean, default: true },
    fecha_creacion: { type: Date, default: Date.now },
    fecha_actualizacion: { type: Date, default: Date.now }
});

// Middleware para actualizar 'fecha_actualizacion'
movieSchema.pre('save', function (next) {
    this.fecha_actualizacion = new Date();
    next();
});

module.exports = mongoose.model('Movie', movieSchema);
