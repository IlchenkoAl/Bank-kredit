import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/adminPanel/Login";
import Header from "./components/common/Header";
import './components/styles/App.css'
import Register from "./components/adminPanel/Register";
import AdminPanel from "./components/adminPanel/AdminPanel";

function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />

          </Routes>
        </div>
      </Router>
  );
}

export default App;
