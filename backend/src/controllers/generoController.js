// backend/src/controllers/generoController.js
const Genero = require('../models/Genero');

const getGeneros = async (req, res) => {
  try {
    const generos = await Genero.find();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener géneros", error });
  }
};

// Agrega la función getGenerosActivos:
const getGenerosActivos = async (req, res) => {
  try {
    const generos = await Genero.find({ estado: "Activo" });
    res.json(generos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener géneros activos", error });
  }
};

const createGenero = async (req, res) => {
  try {
    const nuevoGenero = new Genero(req.body);
    await nuevoGenero.save();
    res.status(201).json(nuevoGenero);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el género", error });
  }
};

const updateGenero = async (req, res) => {
  try {
    req.body.fecha_actualizacion = new Date();
    const generoActualizado = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(generoActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el género", error });
  }
};

const deleteGenero = async (req, res) => {
  try {
    await Genero.findByIdAndDelete(req.params.id);
    res.json({ message: "Género eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el género", error });
  }
};

module.exports = {
  getGeneros,
  getGenerosActivos, // Agregar aquí
  createGenero,
  updateGenero,
  deleteGenero,
};

