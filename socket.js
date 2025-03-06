const { Server } = require("socket.io");
const Message = require("./models/messageModel");

const users = {}; // Store connected users

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id); // Debugging

    // User joins with ID
    socket.on("join", ({ userId }) => {
      users[userId] = socket.id;
      console.log(`✅ User ${userId} joined with socket ID ${socket.id}`);
      socket.emit("joined", { message: `Welcome User ${userId}` });
    });

    // Send a message
    socket.on("sendMessage", async ({ sender, receiver, messageText }) => {
      try {
        const message = new Message({ sender, receiver, messageText });
        await message.save();

        console.log(`📩 Message from ${sender} to ${receiver}: ${messageText}`);

        if (users[receiver]) {
          io.to(users[receiver]).emit("receiveMessage", message);
        }
      } catch (error) {
        console.error("❌ Error saving message:", error);
      }
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
      for (let userId in users) {
        if (users[userId] === socket.id) {
          delete users[userId];
          break;
        }
      }
    });
  });

  return io;
};

module.exports = setupSocket;
  