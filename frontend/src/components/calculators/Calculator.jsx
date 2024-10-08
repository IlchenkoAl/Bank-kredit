import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailModal from './EmailModal';
import './../styles/Button.css';
import './../styles/App.css';
import { calculateLoan, sendEmail, setCalculatorData } from "../../store/actions/calculatorActions";

function Calculator({ interestRate, loanType }) {
  const dispatch = useDispatch();
  const calculator = useSelector(state => state.calculator);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCalculatorData({ [name]: Number(value) }));
  };

  const handleCalculate = () => {
    // Устанавливаем процентную ставку и тип кредита в состояние перед расчетом
    dispatch(setCalculatorData({ interestRate, loanType }));
    dispatch(calculateLoan());
  };

  const handleSendEmail = (email) => {
    dispatch(sendEmail(email));
  };

  return (
      <div>
        <div className="kredit">
          <h1 style={{ fontSize: '35px', textAlign: 'center' }}>
            Процентная ставка {loanType} <strong style={{ fontSize: '55px' }}>{interestRate} </strong>(%)
          </h1>
        </div>
        <div className="Calc">
          <div className="data-section-input">
            <div className="kredit">
              <h3 className="title">Сумма кредита</h3>
            </div>
            <div className="div2">
              <input
                  className="mortgage-amount"
                  type="range"
                  min="0"
                  max={10000000}
                  name="cost"
                  value={calculator.cost}
                  onChange={handleChange}
                  step="1000"
              />
              <div className="value-cost">
                <p className="value-from-cost">0 ₽</p>
                <p className="value-to-cost">10 000 000 ₽</p>
              </div>
              <input
                  type="number"
                  name="cost"
                  value={calculator.cost}
                  onChange={handleChange}
              />
            </div>
            <div className="kredit">
              <h3 className="title">Срок кредита (лет)</h3>
            </div>
            <div className="div2">
              <input
                  type="range"
                  min="1"
                  max="30"
                  name="term"
                  value={calculator.term}
                  onChange={handleChange}
                  step="1"
              />
              <div className="value-cost">
                <p className="value-from-cost">1 год</p>
                <p className="value-to-cost">30 лет</p>
              </div>
              <input
                  type="number"
                  min="1"
                  max="30"
                  name="term"
                  value={calculator.term}
                  onChange={handleChange}
              />
            </div>
          </div>
          <div className="data-section-output">
            <div className="kredit head-output">
              <h3 className="title">Первоначальный взнос</h3>
            </div>
            <div className="div2">
              <input
                  style={{ border: '1px solid black' }}
                  type="number"
                  name="initialPayment"
                  value={calculator.initialPayment === 0 ? '' : calculator.initialPayment}
                  placeholder="0"
                  onChange={handleChange}
              />
            </div>
            <div className="info-value-block">
              <div className="info-value grey">
                Ежемесячный платеж <br /> <strong>{calculator.monthlyPayment ? calculator.monthlyPayment.toLocaleString() : '0'}</strong> ₽
              </div>
              <div className="info-value blue">
                Общая сумма выплат <br /> <strong>{calculator.totalPayment ? calculator.totalPayment.toLocaleString() : '0'}</strong> ₽
              </div>
              <div className="info-value green">
                Необходимый доход <br /> <strong>{calculator.requiredIncome ? calculator.requiredIncome.toLocaleString() : '0'}</strong> ₽
              </div>
            </div>
            <button
                className="styleButton"
                onClick={handleCalculate}
                disabled={calculator.cost <= 0 || calculator.initialPayment <= 0 || calculator.term <= 0}
            >
              Рассчитать
            </button>
            <br />
            <button
                className="styleButton"
                onClick={() => setShowModal(true)}
            >
              Отправить результаты на почту
            </button>
          </div>
        </div>

        {/* Модальное окно для отправки email */}
        <EmailModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSend={handleSendEmail}
            isSending={calculator.emailSending}
            isSent={calculator.emailSent}
            error={calculator.error}
        />
      </div>
  );
}

export default Calculator;
