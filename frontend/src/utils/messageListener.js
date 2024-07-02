// messageListener.js
import { useEffect } from "react";
import { useSocket } from "../socketContext/SocketContext";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/slices/messageSlice";

const useMessageListener = () => {
  const { socket } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      const handleMessage = (data) => {
        dispatch(addMessage(data));
      };

      socket.on("new-message", handleMessage);

      // Clean up the socket listener on unmount
      return () => {
        socket.off("new-message", handleMessage);
      };
    }
  }, [socket, dispatch]);
};

export default useMessageListener;
