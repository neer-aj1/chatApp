import React, { useEffect, useState } from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  let messages = useSelector((state) => state.messages.messages) || [];
  const [state, setState] = useState(true);
  
  return (
    <div className="bg-blue-500 h-full flex flex-col p-5 w-[100%] overflow-auto">
      <div className="flex-none">
        <MessageHeader />
      </div>
      <div className="flex-grow overflow-auto">
        <Messages messages={messages} state={state}/>
      </div>
      <div className="flex-none">
        <MessageInput state={state} setState={setState}/>
      </div>
    </div>
  );
};

export default MessageContainer;
