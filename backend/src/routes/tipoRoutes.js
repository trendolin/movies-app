const express = require('express');
const { getTipos, createTipo, updateTipo, deleteTipo } = require('../controllers/tipoController');

const router = express.Router();

router.get('/', getTipos);
router.post('/', createTipo);
router.put('/:id', updateTipo);
router.delete('/:id', deleteTipo);

module.exports = router;
