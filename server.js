// Node server which will handle socket.io connections

const express = require("express");

const app = express();

const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

const io = require("socket.io")(http);

http.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// socket

const users = {};
io.on("connection", (socket) => {
  // If any new user joins, let other users connected to the server know!
  socket.on("new-user-joined", (name) => {
    console.log("New user", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

    // If someone sends a message, broadcast it to the other people
    socket.on("send", (message) => {
      socket.broadcast.emit("receive", {
        message: message,
        name: users[socket.id],
      });
    });
    
    // If someone leaves the chat, let others know!
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
