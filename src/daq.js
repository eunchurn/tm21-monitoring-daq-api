import dgram from "dgram";
import "dotenv/config";
import express from "express";
import http from "http";
import socketIo from "socket.io";
import { dataParse } from "@libs/daqParser";
import redisHandler from "@libs/redisHandler";
const server = dgram.createSocket("udp4");

const redisClient = new redisHandler();
redisClient.connect();

const app = express();
const port = 5000;
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

app.get("/", (req, res) => {
  res
    .send({
      response: "DAQ socket.io API server"
    })
    .status(200);
});

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getDataAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", data => {
  const parsedData = dataParse(data);
  parsedData.channel = parsedData.channel.map((obj, index) => {
    obj[index] = obj.data;
    delete obj.data;
    return obj;
  });
  redisClient.zaddData("DAQ", parsedData);
});

setInterval(function() {
  redisClient.exists("DAQ", (err, rexist) => {
    if (rexist) {
      redisClient.stackData("DAQ", "DAQRT", 1000); // cache to stack Redis Key, duration : 10ms
    }
  });
}, 1000);

const getDataAndEmit = async socket => {
  try {
    const res = await redisClient.client.get("DAQRT", (err, data) => {
      socket.emit("FromAPI", JSON.parse(data));
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(58432);

httpServer.listen(port, () => console.log(`Listening on port ${port}`));
