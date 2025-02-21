import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Error from "../Shared/Error/Error";
import Home from "../Pages/Home/Home";
import SignIn from "../Account/SignIn/SignIn";
import SignUp from "../Account/SignUp/SignUp";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      }
    ]
  },
]);

export default Router;