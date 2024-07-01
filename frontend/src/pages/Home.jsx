import React from "react";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";

const Home = () => {
  return (
    <div className="h-screen w-screen bg-yellow-400 flex flex-row items-center justify-center">
      <div className="bg-white h-[80%] bg-opacity-50 px-5 py-5 shadow-3xl backdrop-blur-md flex gap-6 p-10 rounded-2xl">
        <div className="flex ">
          <Sidebar />
        </div>
        <div className="flex-1">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
