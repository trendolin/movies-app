const Movie = require('../models/Movie');

// Obtener todas las películas
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('director productora tipo');
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener películas", error });
    }
};

// Crear una nueva película
const createMovie = async (req, res) => {
    try {
        const nuevaPelicula = new Movie(req.body);
        await nuevaPelicula.save();
        res.status(201).json(nuevaPelicula);
    } catch (error) {
        res.status(400).json({ message: "Error al crear la película", error });
    }
};

// Actualizar una película por ID
const updateMovie = async (req, res) => {
    try {
        const peliculaActualizada = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(peliculaActualizada);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la película", error });
    }
};

// Eliminar una película por ID
const deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: "Película eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la película", error });
    }
};

module.exports = { getMovies, createMovie, updateMovie, deleteMovie };
