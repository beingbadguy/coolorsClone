import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { Toaster, toast } from "sonner";
import { MainContext } from "../Context/MainContext";
import { useNavigate } from "react-router-dom";

const Generate = () => {
  const { userDetails, addtoFav } = useContext(MainContext);
  const divRef = useRef();
  const navigate = useNavigate();
  const notify = () => toast.success("Color copied to clipboard!");
  const notifyadd = () => toast.success("Added to Favourites!");
  const [colors, setColors] = useState([
    "#FF671F",
    "#03F3D4",
    "#046A38",
    "#06038D",
  ]);
  // const [display, setDisplay] = useState(null);
  const [heart, setHeart] = useState(null);
  const [clk, setClick] = useState(null);
  const colorGenerator = () => {
    setClick(null);
    // setDisplay(null);
    const letters = "0123456789ABCDEF";
    let color1 = "#";
    for (let i = 0; i < 6; i++) {
      color1 += letters[Math.floor(Math.random() * 16)];
    }
    let color2 = "#";
    for (let i = 0; i < 6; i++) {
      color2 += letters[Math.floor(Math.random() * 16)];
    }
    let color3 = "#";
    for (let i = 0; i < 6; i++) {
      color3 += letters[Math.floor(Math.random() * 16)];
    }
    let color4 = "#";
    for (let i = 0; i < 6; i++) {
      color4 += letters[Math.floor(Math.random() * 16)];
    }
    // console.table(color1, color2, color3, color4);
    setColors([color1, color2, color3, color4]);
  };
  const singleGenerater = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setColors([...colors, color]);
  };

  const [copySuccess, setCopySuccess] = useState("");

  const copyText = (i) => {
    let text = colors[i];
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess("Copied!");
      })
      .catch((err) => {
        setCopySuccess("Failed to copy!");
        console.error("Error copying to clipboard: ", err);
      });
    setClick(i);
    // setDisplay("Copied!");
  };
  // console.log(colors);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Space") {
        colorGenerator();
      }
    });
  }, []);

  return (
    <div className="md:fixed w-full  select-none">
      <div className="flex items-center justify-between">
        <h1 className="px-4 py-4 font-medium  hidden md:block">
          Press the spacebar to generate color palletes!
        </h1>
        <IoMdHeart
          className="hidden md:block text-3xl mx-4 text-pink-500 cursor-pointer  transition-all duration-300 ease-in-out"
          onClick={() => {
            if (userDetails && userDetails) {
              navigate("/favlist");
            } else {
              navigate("/login");
            }
          }}
        />
      </div>

      <div
        ref={divRef}
        className={`grid grid-cols-1 ${
          colors.length <= 12
            ? `md:grid-cols-${colors.length}`
            : "md:grid-cols-4"
        }  w-[100%]   h-[76vh] md:h-auto overflow-hidden md:overflow-none `}
        onKeyUp={(e) => {
          colorFunction(e);
        }}
      >
        {colors &&
          colors?.map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => {
                setHeart(i);
              }}
              onMouseLeave={() => {
                setHeart(null);
              }}
              className={`bg-[${_}]  relative  flex justify-center items-center  `}
            >
              <div
                className={`bg-[${_}] shadow-lg shadow-[${_}] md:min-w-[100%] h-[19vh] md:min-h-[100vh] cursor-pointer flex md:flex-col justify-between md:justify-center gap-32 md:gap-10 flex-row-reverse px-12 items-center font-bold`}
              >
                <div
                  className={` ${
                    i === heart ? "block" : "md:hidden"
                  }   flex items-center justify-center md:flex-col gap-4 sm:gap-10 md:gap-4`}
                >
                  <IoCopyOutline
                    className="cursor-pointer text-2xl text-white  hover:text-gray-500 transition-all duration-300 ease-in-out"
                    onClick={() => {
                      copyText(i);
                      notify();
                    }}
                  />
                  <IoCloseOutline
                    className={` ${
                      colors.length < 2 ? "hidden" : "block"
                    } text-3xl text-white  hover:text-red-500 transition-all duration-300 ease-in-out `}
                    onClick={() => {
                      if (colors.length > 1) {
                        setColors(
                          colors.slice(0, i).concat(colors.slice(i + 1))
                        );
                      }
                    }}
                  />
                  <IoMdHeart
                    className="text-3xl text-white hover:text-red-500   transition-all duration-300 ease-in-out"
                    onClick={() => {
                      if (userDetails && userDetails) {
                        addtoFav(_);
                        notifyadd();
                      } else {
                        navigate("/login");
                      }
                    }}
                  />
                  <div
                    onClick={() => {
                      if (colors.length < 10) {
                        singleGenerater();
                      } else {
                        setColors(["#FF671F", "#03F3D4", "#046A38", "#06038D"]);
                      }
                    }}
                  >
                    <IoIosAdd className="text-3xl text-white hidden md:block hover:text-gray-500 transition-all duration-300 ease-in-out" />
                  </div>
                </div>
                <p
                  className={` hover:scale-90 transition-all duration-300 text-white  sm:text-lg md:text-xl lg:text-2xl`}
                  onClick={() => {
                    navigate(`/color/${_.replace("#", "")}`);
                  }}
                >
                  {_.replace("#", "")}
                </p>
                {/* {
                  <p
                    className={`${
                      i === clk ? "block" : "hidden"
                    } text-white text-center`}
                  >
                    {display}
                  </p>
                } */}
              </div>
              <Toaster richColors />
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center fixed  w-full px-3  mt-4  ">
        <h1
          className="px-2 py-2  font-semibold    md:hidden w-[100px] border flex justify-center items-center  border-black  ml-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out  "
          onClick={() => {
            colorGenerator();
          }}
        >
          Generate
        </h1>
        <IoMdHeart
          className="block md:hidden text-3xl mx-4 text-blue-600 cursor-pointer  transition-all duration-300 ease-in-out"
          onClick={() => {
            if (userDetails && userDetails) {
              navigate("/favlist");
            } else {
              navigate("/login");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Generate;
