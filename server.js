const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BARJEAN JAVA marche !");
});

app.get("/api/produits", (req, res) => {
  res.json([
    { nom: "T-shirt BARJEAN", prix: 5000 },
    { nom: "Casquette", prix: 3000 }
  ]);
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Bienvenue chez BARJEAN" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lance sur port " + PORT);
});
