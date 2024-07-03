import React, { useState } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const senderId = message.receiverId;
  const loggedInUserId = useSelector((state) => state.user?.user?._id);
  const right = senderId === loggedInUserId;
  const sendTime = () => {
    const date = new Date(message.createdAt);
    if (isNaN(date.getTime())) {
      console.error("Invalid date object created from timestamp.");
      return "Invalid time";
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }
  const time = sendTime();
  return (
    <div className={`w-full flex ${right ? '' : 'justify-end'}`}>
      <div
        className={`bg-white px-5 py-2 rounded-t-xl max-w-xs ${right ? 'rounded-br-xl' : 'rounded-bl-xl'}`}
        style={{ wordBreak: "break-word" }}
      >
        <p className="break-words w-full max-w-full">{message.message}</p>
        <div className={`flex ${right ? 'justify-start' : 'justify-end'}`}>
          <p className={`text-[11px] text-gray-600`}>{time}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
