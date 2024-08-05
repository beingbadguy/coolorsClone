import React from "react";

const Sign = () => {
  return (
    <div className="flex justify-center items-center fixed w-full min-h-[70vh]">
      <div className="flex items-center flex-col">
        <h1 className="text-violet-600">COOLORS</h1>
        <p>Hey, Welcome Back!🔥</p>
        <form className="flex flex-col gap-3 mt-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name=""
              id=""
              className="p-2 border border-black outline-blue-600 w-[300px] rounded"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Email</label>
            <input
              type="text"
              name=""
              id=""
              className="p-2 border border-black outline-blue-600 w-[300px] rounded"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Password</label>
            <input
              type="text"
              name=""
              id=""
              className="p-2 border border-black outline-blue-600 w-[300px] rounded"
            />
          </div>
          <button className="bg-blue-600 text-white font-medium p-3 mt-2 rounded">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
