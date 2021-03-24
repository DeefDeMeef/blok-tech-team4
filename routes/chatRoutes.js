const express = require(`express`);

const mongoose = require(`mongoose`);

const router = express.Router();

require(`../controllers/connection`);

const io = require(`socket.io`)(4000, {
  cors: {
    origin: `*`,
  },
});

const User = require(`../models/user`);

const users = {};

io.on(`connection`, (socket) => {
  socket.on(`new-user`, (name) => {
    users[socket.id] = name;

    socket.broadcast.emit(`user-connected`, name);

    console.log(users, socket.id);
  });

  socket.on(`send-chat-message`, (message) => {
    socket.broadcast.emit(`chat-message`, {
      message,

      name: users[socket.id],
    });
  });

  socket.on(`disconnect`, () => {
    socket.broadcast.emit(`user-disconnected`, users[socket.id]);

    delete users[socket.id];
  });
});

module.exports = router;
