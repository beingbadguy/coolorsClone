import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { MainContext } from "../Context/MainContext";
import { ThreeDots } from "react-loader-spinner";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";

const Sign = () => {
  const { userDetails } = useContext(MainContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [error, setError] = useState(null);
  const [pass, setPass] = useState(false);
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
          await createUserWithEmailAndPassword(auth, form.email, form.password);
          const userData = auth.currentUser;

          if (auth.currentUser) {
            // issey usi ke id ka bn jayega
            const userDocRef = doc(db, "users", userData.uid);
            await setDoc(userDocRef, {
              name: form.name,
              email: form.email,
              favourites: [],
              userId: userData.uid,
            });
          }

          //   console.log(userData);
          navigate("/generate");
          setForm({
            name: "",
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
    if (userDetails) {
      navigate("/generate");
    }
  }, []);

  //   console.log(form);
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
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              className="p-2 border border-black outline-blue-600 w-[300px] rounded"
              onChange={(e) => {
                inputHandle(e);
              }}
            />
          </div>
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
              "Create Account"
            )}
          </button>
        </form>
        <div className="flex gap-2 mt-4">
          <p>Already have an account?</p>{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sign;
