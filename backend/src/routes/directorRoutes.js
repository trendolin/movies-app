const express = require('express');
const { getDirectores, createDirector, updateDirector, deleteDirector } = require('../controllers/directorController');

const router = express.Router();

router.get('/', getDirectores);
router.post('/', createDirector);
router.put('/:id', updateDirector);
router.delete('/:id', deleteDirector);

module.exports = router;
