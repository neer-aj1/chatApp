import React, { useEffect } from "react";
import { useSocket } from "../socketContext/SocketContext";

const messageListener = (messages, setMessages) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("new-message", (data) => {
        setMessages([...messages, data]);
    })
  }, [socket, messages, setMessages]);
};

export default messageListener;
