import Messages from "../models/messagesModel.js";
import path from "path";

export async function createNewMessage(req, res) {
  try {
    const { conversationId, sender, text } = req.body;

    let imageData;
    if (req.file) {
      imageData = {
        public_id: req.file.filename.split(".")[0],
        url: req.file.path,
      };
    }
    const message = new Messages({
      conversationId,
      sender,
      text,
      images: imageData ? imageData : undefined,
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
