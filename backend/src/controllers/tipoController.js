// controllers/tipoController.js
const Tipo = require('../models/Tipo');

const getTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tipos", error });
  }
};

const createTipo = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
    // Extraemos los campos que queremos, incluyendo estado
    const { nombre, descripcion, estado } = req.body;
    
    const nuevoTipo = new Tipo({ 
      nombre, 
      descripcion, 
      
    });

    await nuevoTipo.save();
    res.status(201).json(nuevoTipo);
  } catch (error) {
    console.error('Error al crear el tipo:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: "El nombre ya existe, debe ser único" });
    } else {
      res.status(400).json({ message: "Error al crear el tipo", error });
    }
  }
};

const updateTipo = async (req, res) => {
  try {
    const { id } = req.params;
    // Extraemos los campos permitidos para actualizar, incluyendo estado
    const { nombre, descripcion, estado } = req.body;
    
    const tipoActualizado = await Tipo.findByIdAndUpdate(
      id,
      { 
        nombre, 
        descripcion, 
        estado, 
        fechaActualizacion: new Date() 
      },
      { new: true }
    );
    
    if (!tipoActualizado) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.json(tipoActualizado);
  } catch (error) {
    console.error('Error al actualizar el tipo:', error);
    res.status(400).json({ message: "Error al actualizar el tipo", error });
  }
};

const deleteTipo = async (req, res) => {
  try {
    await Tipo.findByIdAndDelete(req.params.id);
    res.json({ message: "Tipo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el tipo", error });
  }
};

module.exports = { getTipos, createTipo, updateTipo, deleteTipo };