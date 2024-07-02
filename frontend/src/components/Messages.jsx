import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import messageListener from "../utils/messageListener";
import { setMessages } from "../redux/slices/messageSlice";

const Messages = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const [messages, setMessages] = useState([]);
  const selectedChat = useSelector((state) => state.selectChat?.selectedChat);
  const selectedChatId = selectedChat?._id;
  messageListener();
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/message/${selectedChatId}`);
        const data = await res.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          dispatch(setMessages(data));
          // setMessages(data);
        } else if (data && Array.isArray(data.messages)) {
          dispatch(setMessages(data.messages));
          // setMessages(data.messages);
        } else {
          dispatch(setMessages([]));
          // setMessages([]);
        }
        setLoading(false);
      } catch (error) {
        console.log(`Error while getting messages: ${error}`);
        setLoading(false);
        dispatch(setMessages([]));
        // setMessages([]);
      }
    };

    if (selectedChatId) {
      getMessages();
    } else {
      dispatch(setMessages([]));
      // setMessages([]);
    }
  }, [selectedChatId]);

  const messages = useSelector((state) => state.messages.messages) || [];

  return (
    <div className="bg-pink-400 h-full p-2 flex flex-col overflow-auto">
      {loading ? (
        <h1>LOADING</h1>
      ) : (
        <div className="flex flex-col gap-2">
          {messages.length === 0 ? (
            <p>No Messages</p>
          ) : (
            messages.map((message) => (
              <Message key={message._id} message={message} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
