const express = require('express');
const { getProductoras, createProductora, updateProductora, deleteProductora } = require('../controllers/productoraController');

const router = express.Router();

router.get('/', getProductoras);
router.post('/', createProductora);
router.put('/:id', updateProductora);
router.delete('/:id', deleteProductora);

module.exports = router;
