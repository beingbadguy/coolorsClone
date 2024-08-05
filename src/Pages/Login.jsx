import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { MainContext } from "../Context/MainContext";
import { ThreeDots } from "react-loader-spinner";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

const Login = () => {
  const { userDetails } = useContext(MainContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const [pass, setPass] = useState(false);

  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.name != "" && form.email != "" && form.password != "") {
      if (form.password.length != 8 && form.password.length < 8) {
        setError("Password must be equal or greater than 8 digits");
        return;
      } else {
        try {
          setLoader(true);
          await signInWithEmailAndPassword(auth, form.email, form.password);
          const userData = auth.currentUser;

          //   console.log(userData);

          navigate("/generate");
          setForm({
            email: "",
            password: "",
          });
          setLoader(false);

          setError("");
        } catch (error) {
          //   console.log(error.message);
          setError(error.message);
          setLoader(false);
        }
      }
    } else {
      setError("enter all the Fields!");
      return;
    }
  };
  useEffect(() => {
    // console.log(userDetails);
    if (userDetails) {
      navigate("/generate");
    }
  }, []);

  return (
    <div className="flex justify-center items-center fixed w-full min-h-[70vh]">
      <div className="flex items-center flex-col">
        <img src="./palette.png" alt="" className="h-10 mb-2" />
        <h1 className="text-violet-600">COOLORS</h1>
        <p>Hey, Welcome!🔥</p>
        {error && (
          <p className="text-red-500 uppercase mt-5 mr-12 text-sm w-[250px]">
            {error}
          </p>
        )}
        <form className="flex flex-col gap-3 mt-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              className="p-2 border border-black outline-blue-600 w-[300px] rounded"
              onChange={(e) => {
                inputHandle(e);
              }}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="">Password</label>
            <div className="flex items-center relative">
              <input
                type={pass ? "text" : "password"}
                name="password"
                value={form.password}
                className="p-2 border border-black outline-blue-600 w-[300px] rounded"
                onChange={(e) => {
                  inputHandle(e);
                }}
              />
              {pass ? (
                <VscEye
                  className="absolute right-3 cursor-pointer"
                  onClick={() => setPass(false)}
                />
              ) : (
                <VscEyeClosed
                  className="absolute right-3 cursor-pointer"
                  onClick={() => setPass(true)}
                />
              )}
            </div>
          </div>

          <button
            className="bg-blue-600 text-white flex justify-center items-center font-medium p-3 mt-2 rounded"
            onClick={(e) => {
              submitHandler(e);
            }}
          >
            {loader ? (
              <ThreeDots
                visible={true}
                height="20"
                width="20"
                color="white"
                radius="3"
                ariaLabel="three-dots-loading"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="flex gap-2 mt-4">
          <p>Don't have an account?</p>{" "}
          <Link to="/signup" className="underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
