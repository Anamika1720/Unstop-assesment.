import React from "react";
import AppRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar theme="light" />
    </>
  );
}

export default App;
