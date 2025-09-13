import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    images: {
      type: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messagesSchema);
export default Messages;
