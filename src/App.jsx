import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [colors, setColors] = useState([
    "#FF671F",
    "#FFFFFF",
    "#046A38",
    "#06038D",
  ]);
  const colorGenerator = () => {
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

  useEffect(() => {
    const subscribe = setInterval(() => {
      colorGenerator();
    }, 500);

    return () => {
      clearInterval(subscribe);
    };
  }, []);

  return (
    <div className="flex justify-center items-center flex-col md:grid md:grid-cols-2 md:justify-between pt-10 select-none min-h-[90vh]">
      <div className="overflow-hidden  relative flex justify-center items-center  ">
        {/* <img
          src="./mac.png"
          alt=""
          className="h-[20vh] md:h-[40vh] md:ml-20  overflow-hidden z-[999]"
        /> */}
        <div className=" grid grid-cols-4 w-[70%] z-0   overflow-x-hidden rounded  ">
          {colors &&
            colors?.map((c, i) => (
              <div
                key={i}
                className={`bg-[${c}] h-[20vh] w-[12vh] sm:h-[35vh] sm:w-[20vh] md:h-[35vh] md:w-[20vh] `}
              ></div>
            ))}
        </div>
      </div>
      <div className="mx-10 mt-5 text-center flex flex-col justify-center items-center md:items-start md:text-left">
        <h1 className="font-bold text-4xl md:text-5xl">
          The Super fast color palettes generator!
        </h1>
        <p className="mt-4 text-gray-500">
          Generate beautiful color schemes instantly. Customize, save, and
          export palettes for your design projects. Perfect for web designers,
          graphic artists, and creatives seeking inspiration and harmony in
          their work.
        </p>
        <Link
          to={"/generate"}
          className="text-white  w-full  text-center font-medium  flex justify-center items-center md:justify-start"
        >
          <div className="mt-4 w-[80%] md:w-[60%] text-center  border p-2 bg-gradient-to-r from-[#4135a8]  via-[#2e1fd2] to-[#26268a] rounded">
            Start the generator
          </div>
        </Link>
      </div>
    </div>
  );
};

export default App;
