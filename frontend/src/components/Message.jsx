import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const senderId = message.receiverId;
  const loggedInUserId = useSelector((state) => state.user?.user?._id);
  const right = senderId === loggedInUserId;
  return (
    <div className={`w-full flex ${right ? '' : 'justify-end'}`}>
      <div
        className={`bg-white px-5 py-2 rounded-t-xl max-w-xs ${right ? 'rounded-br-xl' : 'rounded-bl-xl'}`}
        style={{ wordBreak: "break-word" }}
      >
        <p className="break-words w-full max-w-full">{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
