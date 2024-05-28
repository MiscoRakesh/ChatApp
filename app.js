const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const exp = require("constants");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// to use static file in our nodejs code
app.use(express.static(__dirname + "/public"));

// Basic get request
app.get("/", (req, res) => {
  return res.sendFile(path.resolve("index.html"));
});

const port = 3000;

server.listen(port, () => console.log(`Server Up & running on PORT :${port}`));

// Socket Code
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
