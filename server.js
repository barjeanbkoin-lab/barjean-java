const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.static(__dirname)); // sert ton index.html

const JWT_SECRET = "chat-ivoire-2026";
let users = []; // on stocke en mémoire pour l'instant
let messages = [];

// INSCRIPTION
app.post('/api/register', async (req,res)=>{
  const {pseudo, email, password} = req.body;
  if(users.find(u=>u.email===email)) return res.status(400).json({error:"Email déjà pris"});
  const hashed = await bcrypt.hash(password, 10);
  users.push({pseudo, email, password:hashed});
  const token = jwt.sign({pseudo}, JWT_SECRET);
  res.json({token, pseudo});
});

// CONNEXION
app.post('/api/login', async (req,res)=>{
  const {email, password} = req.body;
  const user = users.find(u=>u.email===email);
  if(!user) return res.status(400).json({error:"Pas de compte"});
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(400).json({error:"Mot de passe faux"});
  const token = jwt.sign({pseudo:user.pseudo}, JWT_SECRET);
  res.json({token, pseudo:user.pseudo});
});

io.on('connection', (socket)=>{
  socket.emit('old_messages', messages.slice(-50));
  socket.on('chat message', (data)=>{
    try{
      const decoded = jwt.verify(data.token, JWT_SECRET);
      const msg = {pseudo: decoded.pseudo, text: data.text};
      messages.push(msg);
      io.emit('chat message', msg);
    }catch(e){ socket.emit('error', "Reconnecte-toi"); }
  });
});

server.listen(process.env.PORT || 3000, ()=>console.log("Serveur OK"));