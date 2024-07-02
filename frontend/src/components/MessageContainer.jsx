import React from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="bg-blue-500 h-full flex flex-col p-5 w-[100%]">
      <div className="flex-none">
        <MessageHeader />
      </div>
      <div className="flex-grow">
        <Messages />
      </div>
      <div className="flex-none">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;
