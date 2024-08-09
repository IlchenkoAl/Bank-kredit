import React, { useState, useEffect } from "react";
import "./../styles/App.css";
import './../styles/Button.css';

function calculateMortgage(cost, initialPayment, term) {
  const annualRate = 9.6;
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

function Calc1() {
  const [cost, setCost] = useState(0);
  const [initialPayment, setInitialPayment] = useState(0);
  const [term, setTerm] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const MAX_COST = 10000000;

  useEffect(() => {
    // Проверка, заполнены ли все поля
    if (cost > 0 && initialPayment > 0 && term > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [cost, initialPayment, term]);

  const handleCalculate = () => {
    const { monthlyPayment, totalPayment } = calculateMortgage(
        cost,
        initialPayment,
        term
    );
    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
  };

  return (
      <div className="Calc">
        <div className="data-section-input">
          <div className="kredit">
            <h3 className="title">Сумма ипотеки</h3>
          </div>
          <div className="div2">
            <input
                className="mortgage-amount"
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
            <input
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
            />
          </div>
          <div className="kredit">
            <h3 className="title">Срок кредита</h3>
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
            <div className="value-cost">
              <p className="value-from-cost">0 Лет</p>
              <p className="value-to-cost">30 Лет</p>
            </div>
            <input
                type="number"
                min="1"
                max="30"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="data-section-output">
          <div className="kredit head-output">
            <h3 className="title">Первоначальный взнос</h3>
            <h3>9,6%</h3>
          </div>
          <div className="div2">
            <input
                style={{ border: '1px solid black' }}
                type="number"
                value={initialPayment === 0 ? '' : initialPayment}
                placeholder="0"
                onFocus={(e) => setInitialPayment('')}
                onChange={(e) => setInitialPayment(Number(e.target.value) || 0)}
            />
          </div>
          <div className="info-value-block">
            <div className="info-value grey">
              Ежемесячный платеж <br/> <strong>{monthlyPayment}</strong> ₽
            </div>
            <div className="info-value blue">
              Переплата <br/> <strong>{totalPayment}</strong> ₽
            </div>
          </div>
          <button
              className="styleButton"
              onClick={handleCalculate}
              disabled={isButtonDisabled}
          >
            Рассчитать
          </button>
        </div>
      </div>
  );
}

export default Calc1;
