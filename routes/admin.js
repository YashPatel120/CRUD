const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorizeMiddleware');

router.get('/adminRoute', authorize(['admin']), (req, res) => {
  res.status(200).json({ message: 'Admin route accessed successfully' });
});

module.exports = router;
