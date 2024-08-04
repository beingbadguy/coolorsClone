import React, { useEffect, useState } from "react";

const Generate = () => {
  const [colors, setColors] = useState([
    "#FF671F",
    "#FFFFFF",
    "#046A38",
    "#06038D",
  ]);
  const [display, setDisplay] = useState(null);
  const [clk, setClick] = useState(null);
  const colorGenerator = () => {
    setClick(null);
    setDisplay(null);
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
    setDisplay("Color copied to clipboard");
  };

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Space") {
        colorGenerator();
      }
    });
  }, []);

  return (
    <div className="fixed w-full select-none">
      <h1 className="px-4 py-4 font-medium  hidden md:block">
        Press the spacebar to generate color palletes!
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-4  w-[100%]"
        onKeyUp={(e) => {
          colorFunction(e);
        }}
      >
        {colors &&
          colors?.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                copyText(i);
              }}
            >
              <div
                className={`bg-[${_}]  min-h-[19vh] md:min-h-[100vh] cursor-pointer flex flex-col justify-center items-center font-bold`}
              >
                <p
                  className={`${
                    i === clk ? "hidden" : "block"
                  } hover:scale-90 transition-all duration-300 text-white`}
                >
                  {_.replace("#", "")}
                </p>
                {
                  <p className={`${i === clk ? "block" : "hidden"} text-white`}>
                    {display}
                  </p>
                }
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center  ">
        <h1
          className="p-2  font-semibold mt-4    md:hidden w-[100px] border flex justify-center items-center  border-black  ml-2 rounded-md "
          onClick={() => {
            colorGenerator();
          }}
        >
          Generate
        </h1>
      </div>
    </div>
  );
};

export default Generate;
