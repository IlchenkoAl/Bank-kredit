import React, { useState } from "react";
import Calc1 from "./calculators/Calc1";
import Calc2 from "./calculators/Calc2";
import Calc3 from "./calculators/Calc3";
import './styles/Home.css';

function Home() {
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
        <div className="Home">
            <div className="calculator-buttons">
                <button className="link-button" onClick={() => setActiveCalculator("Calc1")}>Ипотека</button>
                <div className="line-between"></div>
                <button className="link-button" onClick={() => setActiveCalculator("Calc2")}>Автокредитование</button>
                <div className="line-between"></div>
                <button className="link-button" onClick={() => setActiveCalculator("Calc3")}>Потребительский кредит</button>
            </div>
            <div className="calculator-display">
                {renderCalculator()}
            </div>
        </div>
    );
}

export default Home;
