import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Header.css";

function Header() {
    return (
        <div className="Header-container">
            <div className="Header">
                <Link to="/">Главная</Link>
                <h1>Калькулятор финансов</h1>
                <Link to="/admin">Войти</Link>
            </div>
        </div>
    );
}

export default Header;
