import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const selectedChatId = useSelector((state) => state.selectChat?.selectedChat?._id || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sendingData = {message};
      const res = await fetch(`/api/message/send/${selectedChatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendingData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.message) {
        toast.success(data.message);
      }
      setMessage("");
    } catch (error) {
      toast.error(`${error.message}`);
      console.log(`Error while sending message: ${error}`);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex mt-2 items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
          />
          <button
            type="submit"
            class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          > 
          <IoIosSend className="w-5 h-5" />
            <span class="sr-only">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
