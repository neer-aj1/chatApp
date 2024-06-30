import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id} = req.params;
        const senderId = req.user._id;
        const newMessage = new Message({
            senderId,
            receiverId: id,
            message
        });
        let conversation = await Conversation.findOne({
            members: {
                $all: [id, senderId]
            }
        });

        if(!conversation){
            conversation = await Conversation.create({
                members: [senderId, id]
            });
        }

        conversation.messages.push(newMessage._id);
        await newMessage.save();
        await conversation.save();
        res.status(201).json({message: "Message sent successfully"});
    } catch (error) {
        console.log(`Error while sending message ${error}`);
        res.status(500).json({error: "Internal Server Error"});
    }
}


export const getMessage = async (req, res) => {
    try {
        const {id} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            members: {
                $all: [receiverId, senderId]
            }
        })
    } catch (error) {
        console.log(`Error while getting message ${error}`);
        res.send(500).json({error: "Internal Server Error"});
    }
}