import Messages from "../models/messagesModel.js";
import path from "path";

export async function createNewMessage(req, res) {
  try {
    const messageData = req.body;
    if (req.file) {
      const filename = req.file.filename;
      const fileUrl = path?.join(filename);
      messageData.images = fileUrl;
    }
    messageData.conversationId = req.body.conversationId;
    messageData.sender = req.body.sender;
    messageData.text = req.body.text;
    const message = new Messages({
      conversationId: messageData.conversationId,
      text: messageData.text,
      sender: messageData.sender,
      images: messageData.images ? messageData.images : undefined,
    });
    await message.save();
    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}

export async function getAllMessagesId(req, res) {
  try {
    const messages = await Messages.find({
      conversationId: req.params.id,
    });
    res.status(201).json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "INTERNAL SERVER ERROR!" });
  }
}
