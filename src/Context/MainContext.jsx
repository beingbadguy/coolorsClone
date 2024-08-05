import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const MainContext = createContext(null);

const MainProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("cooloruser"))
  );
  const [fav, setFav] = useState(userDetails?.favourites);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDataRef = doc(db, "users", user.uid);
        const userDataSnap = await getDoc(userDataRef);
        if (userDataSnap.exists()) {
          setUserDetails(userDataSnap.data());
          setFav(userDataSnap.data().favourites);

          localStorage.setItem(
            "cooloruser",
            JSON.stringify(userDataSnap.data())
          );
        } else {
          console.log("no user");
          localStorage.removeItem("cooloruser");
          setUserDetails(null);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("cooloruser");
      setUserDetails(null);
      window.location.reaload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const addtoFav = async (color) => {
    if (!userDetails) {
      return alert("Please log in first!");
    } else {
      try {
        const userData = doc(db, "users", userDetails.userId);
        const userDocs = await getDoc(userData);
        // console.log(userDocs.data());
        if (userDocs.exists()) {
          let favColor = userDocs.favourite || [];

          if (!favColor.includes(color)) {
            await updateDoc(userData, {
              favourites: arrayUnion(color),
            });
          }

          setFav((prevFav) => [...prevFav, color]);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  //   console.log(fav);

  return (
    <MainContext.Provider value={{ userDetails, logout, addtoFav, fav }}>
      {children}
    </MainContext.Provider>
  );
};
export default MainProvider;
