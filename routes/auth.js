const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require("path");
const router = express.Router();
const User = require('../models/user');
const port = 3000;
require('dotenv').config();


// Rutas relacionadas con la autenticación
router.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'auth.html'));
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth'
}), (req, res) => {
  res.cookie('session', req.session.passport.user, { signed: true });
  res.redirect('/home');
});


module.exports = router;
