import React from "react";
import { useSelector } from "react-redux";

const SelectChatMessage = () => {
  const loggedInUser = useSelector((state) => state.user?.user) || "";
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex text-center text-xl capitalize">
        Hello {loggedInUser.name} 👋 <br />
        Select a chat to start conversation
      </div>
    </div>
  );
};

export default SelectChatMessage;
