import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { selectChat } from "../redux/slices/chatSelectSlice";
import { setMessages } from "../redux/slices/messageSlice";
import { logout } from "../redux/slices/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [chatView, setChatView] = useState(false);
  const token = Cookies.get("frontAccess");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!token) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if(width > 300){
        setChatView(false)
      }
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.message) {
        toast.success(data.message);
        dispatch(selectChat(null));
        dispatch(setMessages([]));
        dispatch(logout());
        navigate("/login");
      }
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(`Error while login out ${error}`);
      toast.error(error.message);
    }
  };

  const handleChatView = () => {
    setChatView(!chatView);
    console.log(chatView);
  };

  return (
    <div className="h-screen bg-[url('https://img.freepik.com/free-vector/white-abstract-background-design_361591-1244.jpg?t=st=1720017940~exp=1720018540~hmac=c452c4c473563f29315fdb926d42528b37e18077583c269ba1aaace66c757ac6')] bg-no-repeat bg-cover flex items-center justify-center">
      <div className="relative h-[80%] w-[90%] lg:w-[50%] px-5 py-5 bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-sm flex flex-col md:flex-row gap-1 p-10 rounded-2xl">
        <div
          className={`${
            chatView
              ? "top-10 rounded-xl absolute w-[70%] h-[90%] bg-white"
              : "hidden"
          } md:block md:w-[35%]`}
        >
          <Sidebar chatView={chatView} setChatView={setChatView}/>
        </div>
        <div className="block bg-white rounded-full p-1 cursor-pointer md:hidden absolute top-2 left-2">
          <RxHamburgerMenu size={20} onClick={handleChatView} />
        </div>
        <div className="flex-1 md:ml-5 mt-[10%] md:mt-0">
          <MessageContainer />
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 bg-[#56bee7] p-2 rounded-lg text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
