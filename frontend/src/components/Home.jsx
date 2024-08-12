import React, { useState } from "react";
import Calculator from "./calculators/Calculator";
import './styles/Home.css';

function Home() {
    const [activeCalculator, setActiveCalculator] = useState("mortgage");

    const renderCalculator = () => {
        switch (activeCalculator) {
            case "mortgage":
                return <Calculator interestRate={9.6} loanType="ипотеку" />;
            case "car":
                return <Calculator interestRate={3.5} loanType="автокредит" />;
            case "consumer":
                return <Calculator interestRate={14.5} loanType="потребительский кредит" />;
            default:
                return <Calculator interestRate={9.6} loanType="ипотеку" />;
        }
    };

    return (
        <div className="Home">
            <div className="calculator-buttons">
                <button
                    className={`link-button ${activeCalculator === "mortgage" ? "active" : ""}`}
                    onClick={() => setActiveCalculator("mortgage")}
                >
                    Ипотека
                </button>
                <div className="line-between"></div>
                <button
                    className={`link-button ${activeCalculator === "car" ? "active" : ""}`}
                    onClick={() => setActiveCalculator("car")}
                >
                    Автокредитование
                </button>
                <div className="line-between"></div>
                <button
                    className={`link-button ${activeCalculator === "consumer" ? "active" : ""}`}
                    onClick={() => setActiveCalculator("consumer")}
                >
                    Потребительский кредит
                </button>
            </div>
            <div className="calculator-display">
                {renderCalculator()}
            </div>
        </div>
    );
}

export default Home;
