import React from "react";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";

const Home = () => {
  return (
    <div className="h-screen bg-[url('https://img.freepik.com/free-vector/white-abstract-background-design_361591-1244.jpg?t=st=1720017940~exp=1720018540~hmac=c452c4c473563f29315fdb926d42528b37e18077583c269ba1aaace66c757ac6')] bg-no-repeat bg-cover flex items-center justify-center">
      <div className="h-[80%] w-[80%] lg:w-[50%] px-5 py-5 bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-sm flex gap-1 p-10 rounded-2xl">
        <div className="min-w-[30%]">
          <Sidebar />
        </div>
        <div className="flex-1">
          <MessageContainer />
        </div>
      </div>
      <button className="absolute top-5 right-5 bg-[#56bee7] p-2 rounded-lg text-white">Logout</button>
    </div>
  );
};

export default Home;
