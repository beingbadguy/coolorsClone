import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const SingleColor = () => {
  const { color } = useParams();
  const navigate = useNavigate();
  //   console.log(p);
  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div className="p-4 text-3xl cursor-pointer ">
        <FaHome
          className={`text-[#${color}]`}
          onClick={() => {
            navigate("/generate");
          }}
        />
      </div>
      <div
        className={`bg-[#${color}]  shadow-lg min-h-[70vh] text-white font-bold flex justify-center items-center text-2xl w-full`}
      >
        #{color}
      </div>
    </div>
  );
};

export default SingleColor;
