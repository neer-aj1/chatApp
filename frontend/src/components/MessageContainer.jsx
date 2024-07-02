import React from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="bg-blue-500 h-full flex flex-col p-5 w-[100%]">
      <div className="h-[5%]">
        <MessageHeader />
      </div>
      <div className="h-[90%]">
        <Messages />
      </div>
      <div className="h-[5%]">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageContainer;
