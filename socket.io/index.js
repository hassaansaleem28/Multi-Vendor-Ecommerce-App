import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

let users = [];
function addUser(userId, socketId) {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });
}
function removeUser(socketId) {
  users = users.filter(user => user.socketId !== socketId);
}
function getUser(receiverId) {
  return users.find(user => user.userId === receiverId);
}
// Define  a msg object with seen property
function createMessage({ senderId, receiverId, text, images }) {
  return {
    senderId,
    receiverId,
    text,
    images,
    seen: false,
  };
}
io.on("connection", socket => {
  // when user connects
  console.log("User connected!");
  // take userId and socketId from the user
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  // send and get messages
  const messages = {}; // Object to track messagess sent to each user
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);
    // store the messages in the object
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }
    // send the message to the reciever
    io.to(user?.socketId).emit("getMessage", message);
  });
  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);
    // update the seen flag for the message
    if (messages[senderId]) {
      const message = messages[senderId].find(
        message => message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });
  // UPdate and Get the last message-
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", { lastMessage, lastMessageId });
  });

  // When disconnected--------
  socket.on("disconnect", () => {
    console.log("User Disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Socket Server is running o-o-o-o-||-${process.env.PORT} `);
});
