const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authenticate = require('../middleware/authMiddleware');

router.get('/byTitle', authenticate, searchController.searchTasksByTitle);

router.get('/byCategory/:categoryId', authenticate, searchController.filterTasksByCategory);

router.get('/byTag/:tagId', authenticate, searchController.filterTasksByTag);


module.exports = router;
