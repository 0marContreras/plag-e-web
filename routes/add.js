const express = require('express');
const router = express.Router();
const path = require("path");
const User = require('../models/user');
const Robot = require('../models/robots');

// Rutas relacionadas con la compra
router.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'add.html'));
});


router.post('/add/users/:userId/link/:code/:rname', async (req, res) => {
  try {
    const { userId, code, rname } = req.params;

    const robot = await Robot.findOne({ code });
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({ error: "El usuario no existe" });
    }

    if (!robot) {
      return res.status(401).json({ error: "El robot no existe" });
    }

    // Agregar el nuevo robot al campo 'robots' del usuario
    await User.findOneAndUpdate(
      { userId },
      { $push: { robots: {code: code } } }
    );

    await Robot.findOneAndUpdate(
      { code },
      { Rname: rname }  
    );

    res.json({ message: "Robot agregado exitosamente al usuario" });
  } catch (error) {
    console.error(error);
    res.sendStatus(500).json({ error: "Ocurrió un error al procesar la solicitud" });
  }
});


module.exports = router;
