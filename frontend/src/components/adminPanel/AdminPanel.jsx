import React, { useState, useEffect } from "react";
import Calc1 from "../calculators/Calc1";
import Calc2 from "../calculators/Calc2";
import Calc3 from "../calculators/Calc3";
import "./../styles/AdminPanel1.css";

function AdminPanel() {
  const initialCalculators = JSON.parse(
      localStorage.getItem("calculators")
  ) || [
    { id: 1, component: "Calc1", name: "Calculator 1", rate: 0 },
    { id: 2, component: "Calc2", name: "Calculator 2", rate: 0 },
    { id: 3, component: "Calc3", name: "Calculator 3", rate: 0 },
  ];
  const [calculators, setCalculators] = useState(initialCalculators);
  const [newName, setNewName] = useState("");
  const [newRate, setNewRate] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    localStorage.setItem("calculators", JSON.stringify(calculators));
  }, [calculators]);

  const addCalculator = () => {
    const newCalculator = {
      id: Date.now(),
      component: "Calc1",
      name: newName,
      rate: newRate,
    };
    let updatedCalculators = [...calculators];
    updatedCalculators.splice(position, 0, newCalculator);
    setCalculators(updatedCalculators);
  };

  const deleteCalculator = (id) => {
    const updatedCalculators = calculators.filter((calc) => calc.id !== id);
    setCalculators(updatedCalculators);
  };

  const changeRate = (id, rate) => {
    const updatedCalculators = calculators.map((calc) =>
        calc.id === id ? { ...calc, rate } : calc
    );
    setCalculators(updatedCalculators);
  };

  const changeName = (id, name) => {
    const updatedCalculators = calculators.map((calc) =>
        calc.id === id ? { ...calc, name } : calc
    );
    setCalculators(updatedCalculators);
  };

  const getComponent = (componentName) => {
    switch (componentName) {
      case "Calc1":
        return <Calc1 />;
      case "Calc2":
        return <Calc2 />;
      case "Calc3":
        return <Calc3 />;
      default:
        return null;
    }
  };

  return (
      <div>
        <p className="admin">Admin Panel</p>
        {calculators.map((calc) => (
            <div key={calc.id}>
              <h2>{calc.name}</h2>
              {getComponent(calc.component)}
              <p>Rate: {calc.rate}</p>
              <button onClick={() => deleteCalculator(calc.id)}>Delete</button>
              <input
                  type="number"
                  onChange={(e) => changeRate(calc.id, Number(e.target.value))}
                  placeholder="New Rate"
              />
              <input type="text" placeholder="New Name" />
              <button
                  onClick={(e) => changeName(calc.id, e.target.previousSibling.value)}
              >
                Change Name
              </button>
            </div>
        ))}
        <input
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Calculator Name"
        />
        <input
            type="number"
            onChange={(e) => setNewRate(Number(e.target.value))}
            placeholder="Rate"
        />
        <input
            type="number"
            onChange={(e) => setPosition(Number(e.target.value))}
            placeholder="Position"
        />
        <button onClick={addCalculator}>Add Calculator</button>
      </div>
  );
}

export default AdminPanel;
