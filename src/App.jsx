import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PrintMedia from "./Pages/PrintMedia";
import ForeignMedia from "./Pages/ForeignMedia";
import ElectronicMedia from "./Pages/ElectronicMedia";
import ScrollTotop from "./Component/ScrollTotop";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollTotop></ScrollTotop>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/printmedia" element={<PrintMedia></PrintMedia>}></Route>
          <Route
            path="/foreignmedia"
            element={<ForeignMedia></ForeignMedia>}
          ></Route>
          <Route
            path="/electronicmedia"
            element={<ElectronicMedia></ElectronicMedia>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
