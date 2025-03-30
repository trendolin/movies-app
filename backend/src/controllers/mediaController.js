// backend/src/controllers/mediaController.js
const Media = require('../models/Media');

// Obtener todos los registros de Media
const getMedia = async (req, res) => {
  try {
    // Popula todas las referencias (opcional)
    const media = await Media.find()
      .populate('genero_id')
      .populate('director_id')
      .populate('productora_id')
      .populate('tipo_id');

    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los registros de Media", error });
  }
};

// Obtener un registro por ID
const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate('genero_id')
      .populate('director_id')
      .populate('productora_id')
      .populate('tipo_id');
      res.json(media);
    if (!media) {
      return res.status(404).json({ message: "Registro de Media no encontrado" });
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el registro de Media", error });
  }
};

// Crear un nuevo registro
const createMedia = async (req, res) => {
  try {
    const nuevoMedia = new Media(req.body);
    await nuevoMedia.save();
    res.status(201).json(nuevoMedia);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el registro de Media", error });
  }
};

// Actualizar un registro por ID
const updateMedia = async (req, res) => {
  try {
    const mediaActualizado = await Media.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(mediaActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el registro de Media", error });
  }
};

// Eliminar un registro por ID
const deleteMedia = async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Registro de Media eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el registro de Media", error });
  }
};

module.exports = {
  getMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia
};
