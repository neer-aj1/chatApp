import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const payload = {
        email,
        password,
      };
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
      dispatch(login(data));
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.message) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error in login", error);
    }
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >
              Login
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/Signup")}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            Signup
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
