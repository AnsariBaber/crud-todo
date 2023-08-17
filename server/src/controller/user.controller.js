import { Message } from '../models/index.js';

async function getUserDetailsHandler(req, res) {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function getUserMessages(req, res) {
  try {
    const tasks = await Message.find({ user: req.user._id });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
async function addNewMessage(req, res) {
  try {
    const { message } = req.body;

    const userMessage = new Message({
      message,
      user: req.user._id,
    });
    await userMessage.save();

    res
      .status(200)
      .json({ message: 'Message submitted successfully', success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'an error while save message', success: false });
  }
}
async function deleteMessage(req, res) {
  try {
    const { messageId } = req.body;
    console.log('message id', messageId);

    await Message.findByIdAndRemove(messageId);

    res
      .status(200)
      .json({ message: 'Message Deleted successfully', success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'an error while delete message', success: false });
  }
}
async function updateMessage(req, res) {
  try {
    const { messageId, message } = req.body;
    await Message.findByIdAndUpdate({ _id: messageId }, { message });

    res
      .status(200)
      .json({ message: 'Message updated successfully', success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'an error while uptate message', success: false });
  }
}
export {
  getUserDetailsHandler,
  addNewMessage,
  getUserMessages,
  deleteMessage,
  updateMessage,
};
