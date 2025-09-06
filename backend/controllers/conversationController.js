import Conversation from "../models/conversationModel.js";

export async function createNewConversation(req, res) {
  try {
    const { groupTitle, userId, sellerId } = req.body;
    const isConversationExists = await Conversation.findOne({ groupTitle });
    if (isConversationExists) {
      const conversation = isConversationExists;
      return res.status(200).json({
        success: true,
        conversation,
      });
    } else {
      const conversation = await Conversation.create({
        memebers: [userId, sellerId],
        groupTitle,
      });
      res.status(201).json({ success: true, conversation });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

// Get Seller Conversations

export async function getAllSellerConversations(req, res) {
  try {
    const conversations = await Conversation.find({
      memebers: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function updateLastMessage(req, res) {
  try {
    const { lastMessage, lastMessageId } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    });
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getAllUserConversations(req, res) {
  try {
    const conversations = await Conversation.find({
      memebers: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({ success: true, conversations });
  } catch (error) {
    console.error(error);
  }
}
