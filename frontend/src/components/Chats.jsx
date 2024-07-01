import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../redux/slices/chatSelectSlice";

const Chats = ({ chat }) => {
  const dispatch = useDispatch();
  const selectedChatId = useSelector((state) => state.selectChat.selectedChat._id);

  const handleClick = () => {
    dispatch(selectChat(chat));
  };

  const isSelected = selectedChatId === chat._id;

  return (
    <div
      onClick={handleClick}
      className={`border min-w-72 ${isSelected ? "bg-blue-500 text-white" : ""} border-white rounded-xl flex items-center gap-3 p-2 cursor-pointer hover:bg-blue-500 hover:text-white`}
    >
      <img className="w-14 rounded-full h-14" src={chat.profilePic} alt="Profile" />
      <p className="flex-1">{chat.name}</p>
    </div>
  );
};

export default Chats;
