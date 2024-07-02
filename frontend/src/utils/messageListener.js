import React, { useEffect } from "react";
import { useSocket } from "../socketContext/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/slices/messageSlice";
const messageListener = () => {
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages) || [];

  useEffect(() => {
    socket?.on("new-message", (data) => {
      dispatch(addMessage(data));
    });
  }, [socket, dispatch, messages]);
};

export default messageListener;
