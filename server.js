const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

let users = [];

io.on("connection", (socket) => {
  console.log("New user connected");

  if (users.length < 2) {
    users.push(socket);
    socket.emit("user connected", {
      msg: "You are connected. Waiting for another user...",
    });

    if (users.length === 2) {
      users.forEach((user, index) => {
        user.emit("user connected", {
          msg: `User ${index + 1} connected. You can now chat.`,
        });
      });
    }

    socket.on("chat message", (msg) => {
      users.forEach((user) => {
        if (user !== socket) {
          user.emit("chat message", msg);
        }
      });
    });

    socket.on("disconnect", () => {
      users = users.filter((user) => user !== socket);
      console.log("User disconnected");
      users.forEach((user) => {
        user.emit("user disconnected", {
          msg: "The other user has disconnected.",
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
