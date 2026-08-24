const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('Un ivoirien connecté');
  socket.on('new_message', (msg) => {
    io.emit('new_message', msg);
  });
});

http.listen(PORT, () => {
  console.log('Chat Ivoire marche sur port ' + PORT);
});