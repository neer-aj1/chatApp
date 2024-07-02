import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const senderId = message.receiverId;
  const loggedInUserId = useSelector((state) => state.user?.user?._id);
  const right = senderId === loggedInUserId;
  return (
    <div className={`bg-red-500 w-full flex ${right ? '': 'justify-end'}`}>
      <div className={`bg-blue-500 p-1 w-fit rounded-t-xl ${right? 'rounded-br-xl':'rounded-bl-xl'}`}>
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
