import React from "react";
import "../CSS/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes } from "./router";

const router = createBrowserRouter(Routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
