// backend/src/controllers/directorController.js
const Director = require('../models/Director');

// Obtener todos los directores
const getDirectores = async (req, res) => {
  try {
    const directores = await Director.find();
    res.json(directores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener directores", error });
  }
};

// Crear un nuevo director
const createDirector = async (req, res) => {
  try {
    const nuevoDirector = new Director(req.body);
    await nuevoDirector.save();
    res.status(201).json(nuevoDirector);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el director", error });
  }
};

// Actualizar un director por ID
const updateDirector = async (req, res) => {
  try {
    // Al usar findByIdAndUpdate, pre('save') no se dispara automáticamente.
    // Si quieres actualizar fecha_actualizacion, puedes hacerlo manualmente:
    req.body.fecha_actualizacion = new Date();
    
    const directorActualizado = await Director.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(directorActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el director", error });
  }
};

// Eliminar un director por ID
const deleteDirector = async (req, res) => {
  try {
    await Director.findByIdAndDelete(req.params.id);
    res.json({ message: "Director eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el director", error });
  }
};

module.exports = {
  getDirectores,
  createDirector,
  updateDirector,
  deleteDirector,
};
