import React, { useState } from "react";
import "../App.css"

function calculateMortgage(cost, initialPayment, term) {
  const annualRate = 14.5;
  const loanAmount = cost - initialPayment;
  const monthlyRate = annualRate / 12 / 100;
  const totalRate = Math.pow(1 + monthlyRate, term * 12);
  const monthlyPayment =
    (loanAmount * monthlyRate * totalRate) / (totalRate - 1);

  return {
    monthlyPayment: Math.round(monthlyPayment),
    totalPayment: Math.round(monthlyPayment * term * 12),
  };
}

function Calc3() {
  const [cost, setCost] = useState(0);
  const [initialPayment, setInitialPayment] = useState(0);
  const [term, setTerm] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const MAX_COST = 5000000;

  const handleCalculate = () => {
    const { monthlyPayment, totalPayment } = calculateMortgage(
      cost,
      initialPayment,
      term
    );
    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
    console.log(`Рассчитанный ежемесячный платёж: ${monthlyPayment}
        и Общая сумма потребительского кредита ${totalPayment}`);
  };

  return (
    <div className="Calc">
      <h3>Калькулятор потребительского кредита</h3>
      <p>Годовая ставка по потребительскому кредиту - 14,5%</p>
      <div className="kredit">
        <h3>
          Сумма потребительского кредита <br />
          (в рублях)
        </h3>
      </div>
      <div className="div2">
        <div className="mortgage-amount">
          <input
            type="range"
            min="0"
            max={MAX_COST}
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            step="1000"
          />
          <div className="value-cost">
            <p className="value-from-cost">0 ₽</p>
            <p className="value-to-cost">{MAX_COST} ₽</p>
          </div>
        </div>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
        />
        <p>{cost} рублей</p>
      </div>
      <div className="kredit">
        <h3>
          Первоначальный <br />
          взнос <br />
          (в рублях)
        </h3>
      </div>
      <div className="div2">
        <div className="mortgage-amount">
          <input
            type="range"
            min="0"
            max={cost}
            value={initialPayment}
            onChange={(e) => setInitialPayment(Number(e.target.value))}
            step="1000"
          />
          <div className="value-cost">
            <p className="value-from-cost">0 ₽</p>
            <p className="value-to-cost">{cost} ₽</p>
          </div>
        </div>
        <input
          type="number"
          value={initialPayment}
          onChange={(e) => setInitialPayment(Number(e.target.value))}
        />
        <p>{initialPayment} рублей</p>
      </div>
      <div className="kredit">
        <h3>
          Срок кредита <br />
          (в годах)
        </h3>
      </div>
      <div className="div2">
        <input
          type="range"
          min="1"
          max="30"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          step="1"
        />
        <input
          type="number"
          min="1"
          max="30"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
        />
      </div>
      <button className="styleButton" onClick={handleCalculate}>
        Рассчитать
      </button>

      <div className="kredit">
        <h3>Ежемесячный платеж</h3>
        <p>
          {monthlyPayment} рублей и Общая сумма потребительского кредита: {totalPayment}{" "}
          рублей
        </p>
      </div>
    </div>
  );
}

export default Calc3;
