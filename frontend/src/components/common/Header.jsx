import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Header.css";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../store/actions/usersActions";

function Header() {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    return (
        <div className="Header-container">
            <div className="Header">
                <Link to="/">Главная</Link>
                <h1>Калькулятор финансов</h1>
                {user ?
                    <button style={{padding: '10px'}} onClick={()=> dispatch(logoutUser())}>Выйти</button>
                    :
                <div>
                    <Link to="/login" style={{marginRight: '10px'}}>Войти</Link>
                    <Link to="/register">Зарегистрироваться</Link>
                </div>
                }
            </div>
        </div>
    );
}

export default Header;
