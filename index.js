const { sequelize } = require("./models");
const app = require("./server/app/app");
const http = require("http").Server(app);
const socketIO = require("socket.io");

const io = socketIO(http);
const port = process.env.PORT || 3000;

//require("dotenv").config();

http.listen(port, async () => {
  console.log("listening on port " + port);
});

io.on("connection", (client) => {
  console.log("client connected");
  client.on("disconnect", () => console.log("client disconnected"));
});
