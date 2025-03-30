// backend/src/controllers/productoraController.js
const Productora = require('../models/Productora');

const getProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productoras", error });
  }
};

const createProductora = async (req, res) => {
  try {
    const nuevaProductora = new Productora(req.body);
    await nuevaProductora.save();
    res.status(201).json(nuevaProductora);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la productora", error });
  }
};

const updateProductora = async (req, res) => {
  try {
    const productoraActualizada = await Productora.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(productoraActualizada);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la productora", error });
  }
};

const deleteProductora = async (req, res) => {
  try {
    await Productora.findByIdAndDelete(req.params.id);
    res.json({ message: "Productora eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la productora", error });
  }
};

module.exports = { getProductoras, createProductora, updateProductora, deleteProductora };
