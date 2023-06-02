const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


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

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
