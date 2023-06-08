const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
const path = require("path");
const port = 3000;

// Configuración de Mongoose
mongoose.connect('mongodb+srv://omarcontreras:Omar151003@omarcontreras.g6y4rxx.mongodb.net/plage', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

// Configuración de la sesión y autenticación de Passport
passport.use(new GoogleStrategy({
    clientID: "298722206986-4jo87fbqtcffdl88t1qq1sa40b0o18os.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    // Crear un nuevo usuario si no existe
    const newUser = new User({
      googleId: profile.id,
      displayName: profile.displayName
    });
    await newUser.save();
    done(null, newUser);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

const app = express();

// Configuración de Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/buy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'buy.html'));
});

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'map.html'));
});

app.get('/tutorials', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tutorials.html'));
});

// Ruta de inicio de sesión con Google
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}));

// Ruta de callback de Google para el inicio de sesión
app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth'
}), (req, res) => {
  // Guardar la sesión en una cookie
  req.session.save(() => {
    res.redirect('/home');
  });
});

// Ruta de cierre de sesión
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
