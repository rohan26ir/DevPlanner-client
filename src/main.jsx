import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Router from "./Router/Router";
import Provider from "./Provider/Provider";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
     <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
