// backend/src/routes/generoRoutes.js
const express = require('express');
const {
  getGeneros,
  getGenerosActivos,
  createGenero,
  updateGenero,
  deleteGenero
} = require('../controllers/generoController');

const router = express.Router();

router.get('/', getGeneros);
router.get('/activos', getGenerosActivos); // Ahora definido
router.post('/', createGenero);
router.put('/:id', updateGenero);
router.delete('/:id', deleteGenero);

module.exports = router;

