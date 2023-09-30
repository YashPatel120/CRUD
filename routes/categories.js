const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authenticate = require('../middleware/authMiddleware');

router.post('/', authenticate, categoriesController.createCategory);

router.get('/', authenticate, categoriesController.getAllCategories);


module.exports = router;
