const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/message', (req, res) => {
  res.json({ message: 'Salut depuis BARJEAN JAVA !' });
});

app.get('/', (req, res) => {
  res.send('<h1>BARJEAN JAVA marche !</h1><p>Va sur /api/message</p>');
});

app.listen(PORT, () => {
  console.log('Serveur lance sur http://localhost:3000');
});