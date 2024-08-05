import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { MainContext } from "../Context/MainContext";
import { CiLogout } from "react-icons/ci";
import DeviceInfo from "../components/DeviceInfo";

const Layout = () => {
  const { userDetails, logout, fav } = useContext(MainContext);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const fullyear = new Date();

  useEffect(() => {}, [fav]);
  // console.log(fav);

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
          className={`z-[999]  fixed bg-white text-black min-h-[100%] h-[100%] w-[100%] md:w-[30%] left-0 top-0 flex justify-between items-center flex-col gap-5 border-r  ${
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

          {userDetails && userDetails ? (
            <div className="flex flex-col items-center gap-2 justify-between  w-full p-4 mt-10 md:flex-col text-center ">
              <div className="flex items-center justify-between w-full md:flex-col">
                <div>
                  <img src="./ninja.png" alt="" className="h-14" />
                </div>
                <div>
                  <h1>
                    <span className="font-medium uppercase text-xl">
                      {userDetails.name}
                    </span>
                  </h1>
                  <p className="text-neutral-500">{userDetails.email}</p>
                </div>
              </div>

              <h1 className="mt-4 font-medium text-blue-500">
                Your Favourites ({fav?.length})
              </h1>
              {fav && fav.length < 1 ? (
                <div className="text-center flex items-center gap-2">
                  You do not have any color in favlist
                  <img src="./monkey.png" alt=""  className="h-4"/>
                </div>
              ) : (
                ""
              )}
              <div className="mb-20 grid grid-cols-12 gap-1 ">
                {fav &&
                  fav.map((color, index) => (
                    <div
                      key={index}
                      className={`bg-[${color}] h-6 w-6 cursor-pointer`}
                      title={color}
                      onClick={() => {
                        navigate(`color/${color.replace("#", "")}`);
                        setMenu(false);
                      }}
                    >
                      {/* <div>{color}</div> */}
                    </div>
                  ))}
              </div>

              <h1 className="absolute text-sm bottom-10 text-blue-600 flex gap-6   ">
                <DeviceInfo />

                <span className="font-bold">
                  {fullyear.toLocaleDateString()}
                </span>
              </h1>

              <div
                className="absolute bottom-10 right-8 cursor-pointer text-red-600 hover:text-red-300"
                title="Click to Logout"
                onClick={() => {
                  logout();
                  setMenu(false);
                  navigate("/");
                }}
              >
                <CiLogout />
              </div>
            </div>
          ) : (
            <div className="mt-[400px]">
              <div className="flex flex-col gap-4">
                <p
                  className="bg-green-300 p-2 text-black font-medium w-[100px] text-center rounded  cursor-pointer"
                  onClick={() => {
                    setMenu(false);
                    navigate("/login");
                  }}
                >
                  <Link to="/login">Login</Link>
                </p>
                <p
                  className="bg-purple-300 p-2 text-black font-medium w-[100px] text-center rounded cursor-pointer "
                  onClick={() => {
                    setMenu(false);

                    navigate("/signup");
                  }}
                >
                  Signup
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className={`${menu ? "block" : "hidden"}`}>
        <img
          src="./ninja.png"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[200px]"
        />
      </div> */}
      {/* className={`${menu ? "hidden" : ""}`} */}
      <div className={`${menu ? "blur-sm" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
