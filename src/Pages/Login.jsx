import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center fixed w-full min-h-[80vh]">
      <div className="flex items-center flex-col">
        <h1 className="text-violet-600">COOLORS</h1>
        <p>Hey, Welcome!😍</p>
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
            Login
          </button>
        </form>
        <div className="flex gap-2 mt-4">
          <p>Already have an account?</p> <a href="/signup" className="underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
