import React, { useEffect, useState } from "react";
import Chats from "./Chats";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    let isSubscribed = true;

    const getChats = async () => {
      try {
        const res = await fetch("/api/user");
        if (!isSubscribed) return; // Exit if component is unmounted
        const data = await res.json();
        console.log(data);
        setChats(data);
      } catch (error) {
        if (isSubscribed) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    getChats();

    // Cleanup function
    return () => {
      console.log("Cleanup");
      isSubscribed = false; // Set the flag to false to prevent state updates if component is unmounted
    };
  }, []);
  return (
    <div className="bg-lime-200 py-6 overflow-auto px-3 flex flex-col gap-2 w-[100%]">
      <h4>CHATS</h4>
      {chats.map((chat) => (
        <Chats key={chat._id} chat={chat} />
      ))}
    </div>
  );
};

export default Sidebar;
