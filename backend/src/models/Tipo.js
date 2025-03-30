const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String },
    estado: { type: Boolean, default: true },
    fecha_creacion: { type: Date, default: Date.now },
    fecha_actualizacion: { type: Date, default: Date.now }
});

tipoSchema.pre('save', function (next) {
    this.fecha_actualizacion = new Date();
    next();
});

module.exports = mongoose.model('Tipo', tipoSchema);
