import React from "react";
import { useSelector } from "react-redux";

const MessageHeader = () => {
  const selectedChat = useSelector((state) => state.selectChat?.selectedChat);

  return (
    <>
      {selectedChat ? (
        <div className="bg-yellow-500 p-2 flex items-center gap-3">
          <img
            className="h-10 rounded-full"
            src={selectedChat?.profilePic || ""}
            alt={selectedChat?.name || "Profile Picture"}
          />
          <p>{selectedChat?.name}</p>
        </div>
      ) : null}
    </>
  );
};

export default MessageHeader;
