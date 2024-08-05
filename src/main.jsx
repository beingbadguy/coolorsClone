import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { inject } from "@vercel/analytics";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Generate from "./Pages/Generate.jsx";
import Login from "./Pages/Login.jsx";
import Sign from "./Pages/Sign.jsx";
import MainProvider from "./Context/MainContext.jsx";
import SingleColor from "./Pages/SingleColor.jsx";
import Favlist from "./Pages/Favlist.jsx";

inject();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/generate",
        element: <Generate />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Sign />,
      },
      {
        path: "color/:color",
        element: <SingleColor />,
      },
      {
        path: "/favlist",
        element: <Favlist />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainProvider>
      <RouterProvider router={router} />
    </MainProvider>
  </React.StrictMode>
);
