import React, { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  let messages = useSelector((state) => state.messages.messages) || [];
  
  
  return (
    <div className="bg-white rounded-2xl h-full flex flex-col p-5 w-[100%] overflow-auto">
      <div className="flex-none">
        <MessageHeader />
      </div>
      <div className="flex-grow overflow-auto">
        <Messages messages={messages}/>
      </div>
      <div className="flex-none">
        <MessageInput/>
      </div>
    </div>
  );
};

export default MessageContainer;
