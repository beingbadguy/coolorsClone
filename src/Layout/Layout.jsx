import React, { useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";

const Layout = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="select-none">
      <div className="px-4 py-4 border-b border-gray-300 flex items-center justify-between">
        <div className="font-extrabold text-blue-800 text-xl">
          <Link to="/">COOLORS</Link>
        </div>
        <div
          onClick={() => {
            setMenu(true);
          }}
        >
          <IoMdMenu className="text-2xl cursor-pointer " />
        </div>
        <div
          className={`z-[999]  fixed bg-white text-black min-h-[100%] h-[100%] w-[100%] md:w-[30%] left-0 top-0 flex justify-center items-center flex-col gap-5 border-r  ${
            menu ? "translate-x-0 fixed " : "translate-x-[-100%]"
          } transition-all duration-300 ease-in-out transform `}
        >
          <div
            className="absolute top-6 right-5 text-xl cursor-pointer "
            onClick={() => {
              setMenu(false);
            }}
          >
            <MdClose />
          </div>
          <p
            className="bg-green-300 p-2 text-black font-medium w-[100px] text-center rounded  cursor-pointer"
            onClick={() => {
              setMenu(false);
              navigate("/login");
            }}
          >
            <Link to="/login">Login</Link>
          </p>
          <p className="bg-purple-300 p-2 text-black font-medium w-[100px] text-center rounded ">
            Signup
          </p>
        </div>
      </div>
      <div className={`${menu ? "block" : "hidden"}`}>
        <img
          src="./ninja.png"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[200px]"
        />
      </div>

      <div className={`${menu ? "hidden" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
