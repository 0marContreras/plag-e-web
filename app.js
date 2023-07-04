const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require("path");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//rutas
const router = express.Router();
const authRoutes = require('./routes/auth');
const tutorialsRoutes = require('./routes/tutorials');
const buyRoutes = require('./routes/buy');
const mapRoutes = require('./routes/map');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');

//esquemas de mongo
const User = require('./models/user');
const Robot = require('./models/robots');

const port = 3000;
require('dotenv').config();



// Configuración de Mongoose
mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});

// Configuración de la sesión y autenticación de Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_KEY,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ userId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    // Crear un nuevo usuario si no existe
    const newUser = new User({
      userId: profile.id,
      displayName: profile.displayName,
      robots: []
    });
    await newUser.save();
    done(null, newUser);
  }
));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.userId
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const app = express();
app.use(express.text());
app.use(express.json());

// Configuración de Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser("secret"));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// Rutas
app.use('/', authRoutes);
app.use('/', tutorialsRoutes);
app.use('/', buyRoutes);
app.use('/', mapRoutes);
app.use('/', homeRoutes);
app.use('/', addRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de cierre de sesión
app.get('/logout', (req, res) => {
  res.clearCookie('session'); // Eliminar la cookie 'session'
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
