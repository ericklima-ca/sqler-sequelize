const { sequelize } = require("./models");
const app = require("./server/app/app");
const socketIO = require("socket.io");

const io = socketIO(app);
const port = process.env.PORT || 3000;

//require("dotenv").config();

app.listen(port, async () => {
  await sequelize.sync();
  console.log("listening on port " + port);
});

io.on("connection", (client) => {
  console.log("client connected");
  client.on("disconnect", () => console.log("client disconnected"));
});
