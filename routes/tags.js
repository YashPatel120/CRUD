// routes/tags.js

const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tagsController');
const authenticate = require('../middleware/authMiddleware');

router.post('/', authenticate, tagsController.createTag);

router.get('/', authenticate, tagsController.getAllTags);


module.exports = router;
