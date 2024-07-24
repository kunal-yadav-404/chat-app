const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

let users = [];
let userLimit = 0;
let userLimitSet = false;

io.on("connection", (socket) => {
  if (!userLimitSet) {
    socket.emit("request user limit");
  }

  socket.on("set user limit", (limit) => {
    if (!userLimitSet) {
      userLimit = limit;
      userLimitSet = true;
      socket.emit("user limit set", userLimit);
      socket.broadcast.emit("user limit set", userLimit);
    }
  });

  socket.on("join chat", (name) => {
    if (users.length < userLimit) {
      const user = { id: socket.id, name: name };
      users.push(user);
      socket.emit("user connected", {
        msg: `You are connected as ${name}. Waiting for other users...`,
      });

      if (users.length === userLimit) {
        users.forEach((user) => {
          io.to(user.id).emit("user connected", {
            msg: `${user.name} connected. You can now chat.`,
          });
        });
      }

      socket.on("chat message", (msg) => {
        users.forEach((user) => {
          if (user.id !== socket.id) {
            io.to(user.id).emit("chat message", {
              name: msg.name,
              data: msg.data,
              type: msg.type,
            });
          }
        });
      });

      socket.on("disconnect", () => {
        users = users.filter((user) => user.id !== socket.id);
        users.forEach((user) => {
          io.to(user.id).emit("user disconnected", {
            msg: `${name} has disconnected.`,
          });
        });
      });
    } else {
      socket.emit("user connected", {
        msg: "Chat room is full. Please try again later.",
      });
      socket.disconnect();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
