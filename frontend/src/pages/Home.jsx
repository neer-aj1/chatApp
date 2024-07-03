import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { selectChat } from "../redux/slices/chatSelectSlice";
import { setMessages } from "../redux/slices/messageSlice";
import { logout } from "../redux/slices/userSlice";

const Home = () => {
  const token = Cookies.get("frontAccess");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout');
      const data = await res.json();
      if(data.message){
        toast.success(data.message);
        dispatch(selectChat(null));
        dispatch(setMessages([]));
        dispatch(logout());
        navigate('/login');
      }
      if(data.error){
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(`Error while login out ${error}`);
      toast.error(error.message);
    }
  }

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
      <button onClick={handleLogout} className="absolute top-5 right-5 bg-[#56bee7] p-2 rounded-lg text-white">Logout</button>
    </div>
  );
};

export default Home;
