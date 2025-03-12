import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './scss/index.scss'

/**
  @description This project is designed to streamline the process of receiving applications from
  students for participation in events and their status in various directions. It aims to provide
  an efficient and organized way to manage student applications and track their involvement in
  different activities.
**/ 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
