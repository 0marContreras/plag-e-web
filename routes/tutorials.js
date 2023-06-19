const express = require('express');
const router = express.Router();
const path = require("path");

// Rutas relacionadas con los tutoriales
router.get('/tutorials', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'tutorials.html'));
});

// Otras rutas relacionadas con los tutoriales

module.exports = router;
