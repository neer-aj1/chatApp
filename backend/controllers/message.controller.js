import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;

    if (!message || !id || !senderId) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const newMessage = new Message({
      senderId,
      receiverId: id,
      message,
    });

    let conversation = await Conversation.findOne({
      members: { $all: [id, senderId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, id],
      });
    }

    conversation.messages.push(newMessage._id);
    await newMessage.save();
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(id); // Corrected function name
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(`Error while sending message: ${error.message}`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      members: {
        $all: [senderId, id],
      },
    }).populate("messages");
    console.log(`Sender: ${senderId} Receiver: ${id}`);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.status(201).json(conversation.messages);
  } catch (error) {
    console.log(`Error while getting message ${error}`);
    res.send(500).json({ error: "Internal Server Error" });
  }
};
