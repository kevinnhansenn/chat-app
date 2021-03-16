const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ conversationId, recipients, message }) => {
    recipients.forEach((r) => {
      console.log(`${id} -> ${r}`);
    });

    recipients.push(id);
    recipients.forEach((recipient) => {
      const filteredRecipients = recipients.filter((r) => r !== recipient);

      io.to(recipient).emit("receive-message", {
        conversationId,
        recipients: filteredRecipients,
        senderId: id,
        message,
      });
    });
  });
});
