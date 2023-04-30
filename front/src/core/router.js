import React from "react";
import {createBrowserRouter} from "react-router-dom";

import Home from "../pages/Home";
import UserRooms from "../pages/UserRooms";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Room from "../pages/Room";
import Root from "./middlewares/HeaderMiddleware";
import SoloRoom from "../pages/SoloRoom";
import withNavigate from "../decorators/withNavigate";
import withStats from "../decorators/withStats";
import HeaderMiddleware from "./middlewares/HeaderMiddleware";
import AuthMiddleware from "./middlewares/AuthMiddleware";


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
    element: <HeaderMiddleware/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/solo",
        element: <SoloRoom/>,
      },
      {
        path: "/",
        element: <AuthMiddleware/>,
        children: [
          {
            path: "/rooms",
            element: <UserRooms/>,
          },
          {
            path: "/room/:id",
            element: <Room/>,
          },
        ]
      }
    ]
  }
]);
