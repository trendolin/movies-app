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
        const nuevoTipo = new Tipo(req.body);
        await nuevoTipo.save();
        res.status(201).json(nuevoTipo);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el tipo", error });
    }
};

const updateTipo = async (req, res) => {
    try {
        const tipoActualizado = await Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tipoActualizado);
    } catch (error) {
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
