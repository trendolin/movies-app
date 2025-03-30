// backend/src/routes/mediaRoutes.js
const express = require('express');
const {
  getMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia
} = require('../controllers/mediaController');

const router = express.Router();

router.get('/', getMedia);
router.get('/:id', getMediaById);
router.post('/', createMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
