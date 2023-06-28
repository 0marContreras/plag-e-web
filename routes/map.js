const express = require('express');
const router = express.Router();
const path = require("path");
const mongoose = require('mongoose');

const User = require('../models/user');
const Robot = require('../models/robots');

// Rutas relacionadas con el mapa
router.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'map.html'));
});


// Otras rutas relacionadas con el mapa

router.get('/map-data', (req, res) => {
  Robot.aggregate([
    {
      $match: {
        "code": "000001"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "code",
        foreignField: "robots.code",
        as: "robot"
      }
    },
    {
      $project: {
        "_id": 0,
        "Rname": "$Rname",
        "location": "$location"
      }
    }
  ])
  .then(result => {
    res.json(result[0].location);
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Error en la consulta');
  });
});

module.exports = router;
