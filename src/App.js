import React, { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./Components/Navbar";
import Admin from "./pages/Admin";
import Companion from "./pages/Companion";
import Rides from "./pages/Rides";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [customerId, setCustomerId] = useState('');

  const handlCustomerId = useCallback((id) => {
    console.log({id},"from handle");
    setCustomerId(id);
  },[customerId, setCustomerId]);

  console.log({customerId},"from app");

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home handlCustomerId={handlCustomerId} />} />
        <Route path="/rides" element={<Rides customerId={customerId} />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/companion/:tripId" element={<Companion />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
