import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    groupTitle: {
      type: String,
    },
    memebers: {
      type: Array,
    },
    lastMessage: {
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversation", conversationSchema);
export default Conversation;
