import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCalculations, deleteCalculation } from "../../store/actions/adminActions";
import CalculationForm from './../calculators/CalculationForm';
import './../styles/AdminPanel.css';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const { calculations, loadingCalculations, error } = useSelector(state => state.admin);
    const [currentCalculation, setCurrentCalculation] = useState(null);

    useEffect(() => {
        dispatch(fetchCalculations());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCalculation(id));
    };

    return (
        <div className="admin-panel">
            <h2>Управление расчетами</h2>
            <CalculationForm currentCalculation={currentCalculation} setCurrentCalculation={setCurrentCalculation} />
            {loadingCalculations && <p>Загрузка расчетов...</p>}
            {error && <p>Ошибка: {error}</p>}
            <ul>
                {calculations && calculations.map((calculation, index) => (
                    <li key={index}>
                        <p><strong>Тип кредита:</strong> {calculation.type}</p>
                        <p><strong>Сумма кредита:</strong> {calculation.cost}</p>
                        <p><strong>Первоначальный взнос:</strong> {calculation.initialPayment}</p>
                        <p><strong>Срок кредита:</strong> {calculation.term}</p>
                        <p><strong>Процентная ставка:</strong> {calculation.interestRate}%</p>
                        <button onClick={() => handleDelete(calculation._id)} className="delete-button">Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
