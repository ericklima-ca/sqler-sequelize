const app = require("./server/app/app");
const http = require("http").Server(app);
const socketIO = require("socket.io");

const enabledCors = {
  cors: {
    origin: "*",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
};

const io = socketIO(http, enabledCors);
const port = process.env.PORT || 3000;

//require("dotenv").config();

http.listen(port, async () => {
  console.log("listening on port " + port);
});

io.on("connection", (client) => {
  console.log("client connected");
  client.on("disconnect", () => console.log("client disconnected"));

  client.on("newSolicitation", () => {
    client.broadcast.emit("newSolicitation");
  });

  client.on("newResponse", () => {
    client.broadcast.emit("newResponse");
  });
  client.on("updateResponse", () => {
    client.broadcast.emit("updateResponse");
  });
});
