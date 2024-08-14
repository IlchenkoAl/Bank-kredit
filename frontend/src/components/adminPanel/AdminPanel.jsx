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
        if (currentCalculation && currentCalculation._id === id) {
            setCurrentCalculation(null);
        }
    };

    const handleEdit = (calculation) => {
        setCurrentCalculation(calculation);
    };

    const handleExport = async () => {
        try {
            const response = await fetch('http://localhost:8000/admin/export');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'calculations.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error exporting calculations:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h2>Управление расчетами</h2>
            <CalculationForm currentCalculation={currentCalculation} setCurrentCalculation={setCurrentCalculation} />
            <button className="export-button" onClick={handleExport}>Экспортировать данные</button>
            {loadingCalculations && <p>Загрузка расчетов...</p>}
            {error && <p>Ошибка: {error}</p>}
            <ul>
                {calculations && calculations.map((calculation, index) => (
                    <li key={index}>
                        <p><strong>Тип кредита:</strong> {calculation.type}</p>
                        <p><strong>Сумма кредита:</strong> {calculation.cost} ₽</p>
                        <p><strong>Первоначальный взнос:</strong> {calculation.initialPayment} ₽</p>
                        <p><strong>Срок кредита:</strong> {calculation.term} лет</p>
                        <p><strong>Процентная ставка:</strong> {calculation.interestRate}%</p>
                        <p><strong>Сумма кредита:</strong> {calculation.loanAmount} ₽</p>
                        <p><strong>Ежемесячный платеж:</strong> {calculation.monthlyPayment} ₽</p>
                        <p><strong>Общая сумма выплат:</strong> {calculation.totalPayment} ₽</p>
                        <p><strong>Необходимый доход:</strong> {calculation.requiredIncome} ₽</p>
                        <p><strong>Дата создания:</strong> {new Date(calculation.createdAt).toLocaleString()}</p>
                        <button style={{ marginRight: '10px'}} onClick={() => handleEdit(calculation)} className="edit-button">Редактировать</button>
                        <button onClick={() => handleDelete(calculation._id)} className="delete-button">Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
