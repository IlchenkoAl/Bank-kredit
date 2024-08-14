import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import './../styles/AdminPanel.css';
import {createCalculation, editCalculation} from "../../store/actions/adminActions";

const CalculationForm = ({ currentCalculation, setCurrentCalculation }) => {
    const [formData, setFormData] = useState({
        type: '',
        cost: '',
        initialPayment: '',
        term: '',
        interestRate: '',
    });

    useEffect(() => {
        if (currentCalculation) {
            setFormData(currentCalculation);
        }
    }, [currentCalculation]);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentCalculation) {
            dispatch(editCalculation(currentCalculation._id, formData));
        } else {
            dispatch(createCalculation(formData));
        }

        setFormData({
            type: '',
            cost: '',
            initialPayment: '',
            term: '',
            interestRate: '',
        });

        setCurrentCalculation(null);
    };

    return (
        <form onSubmit={handleSubmit} className="calculation-form">
            <h3>{currentCalculation ? 'Редактировать расчет' : 'Создать новый расчет'}</h3>
            <input type="text" name="type" placeholder="Тип кредита" value={formData.type} onChange={handleChange} required />
            <input type="number" name="cost" placeholder="Сумма кредита" value={formData.cost} onChange={handleChange} required />
            <input type="number" name="initialPayment" placeholder="Первоначальный взнос" value={formData.initialPayment} onChange={handleChange} required />
            <input type="number" name="term" placeholder="Срок кредита" value={formData.term} onChange={handleChange} required />
            <input type="number" name="interestRate" placeholder="Процентная ставка" value={formData.interestRate} onChange={handleChange} required />
            <button type="submit" className="save-button">{currentCalculation ? 'Сохранить изменения' : 'Создать'}</button>
        </form>
    );
};

export default CalculationForm;
