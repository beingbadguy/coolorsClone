import React, { useContext, useEffect } from "react";
import { MainContext } from "../Context/MainContext";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Favlist = () => {
  const { fav, userDetails } = useContext(MainContext);
  console.log(fav);
  const navigate = useNavigate();
  useEffect(() => {
    if (userDetails) {
    }
  }, []);

  return (
    <div className="mt-4 flex flex-col justify-center ">
      <div className="mt-2 mb-10 text-3xl cursor-pointer flex items-center justify-center  ">
        <FaHome
          className={`text-black`}
          onClick={() => {
            navigate("/generate");
          }}
        />
      </div>
      {fav && fav.length < 1 ? (
        <div className="text-center flex items-center justify-center gap-2">
          You do not have any color in favlist
          <img src="./monkey.png" alt="" className="h-4" />
        </div>
      ) : (
        ""
      )}
      <div
        className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 gap-4  place-items-center
      "
      >
        {fav &&
          fav.map((color, i) => (
            <div key={i} className="cursor-pointer">
              <div
                onClick={() => {
                  navigate(`/color/${color.replace("#", "")}`);
                }}
                className={`bg-[${color}] h-24 sm:w-32 md:h-32 md:w-42 max-w-20  md:max-w-72 rounded-t-lg`}
              ></div>
              <div className="bg-slate-200 h-10 w-[100px] md:max-w-64 md:w-32 mb-7 max-w-20 text-sm rounded-b-sm text-center flex justify-center items-center font-bold">
                {color}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favlist;
