import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Calc1 from "./components/Calc1";
import Calc2 from "./components/Calc2";
import Calc3 from "./components/Calc3";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [activeCalculator, setActiveCalculator] = useState("Calc1");

  const renderCalculator = () => {
    switch (activeCalculator) {
      case "Calc1":
        return <Calc1 />;
      case "Calc2":
        return <Calc2 />;
      case "Calc3":
        return <Calc3 />;
      default:
        return <Calc1 />;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="calculator-buttons">
        <button onClick={() => setActiveCalculator("Calc1")}>Первый калькулятор</button>
        <button onClick={() => setActiveCalculator("Calc2")}>Второй калькулятор</button>
        <button onClick={() => setActiveCalculator("Calc3")}>Третий калькулятор</button>
      </div>
      {renderCalculator()}
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
