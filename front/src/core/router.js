import React from "react";
import {createBrowserRouter} from "react-router-dom";

import Home from "../pages/Home";
import UserRooms from "../pages/UserRooms";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Room from "../pages/Room";
import Root from "./Root";


export default createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/rooms",
        element: <UserRooms/>,
      },

      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/room/:id",
        element: <Room/>,
      }
    ]
  }
]);
