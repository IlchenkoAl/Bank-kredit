import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {clearRegisterErrors, loginUser} from "../../store/actions/usersActions";
import './../styles/Register.css';
import {Link, useNavigate} from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);
    const loading = useSelector(state => state.users.loginLoading);
    const [showPassword, setShowPassword] = useState(false);
    const navigate= useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);
    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };
    const submitFormHandler = async e => {
        e.preventDefault();
        await dispatch(loginUser({...user}));
        navigate('/');
    };
    return (
        <div className="register-container">
            <h1 className="register-title">Login</h1>
            {error && <p className="register-error">{error}</p>}

            <form onSubmit={submitFormHandler} className="register-form">
                <input
                    type="email"
                    value={user.email}
                    onChange={inputChangeHandler}
                    name='email'
                    placeholder="Email"
                    className="register-input"
                />
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        placeholder="Password"
                        className="register-input"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="password-toggle-button"
                    >
                        {showPassword ? '👁️' : '🙈'}
                    </button>
                </div>
                <button type="submit" disabled={loading}
                        className="register-button">
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <Link to="/register" style={{margin: '10px 30px'}}>
                    Зарегистрироваться
                </Link>
            </form>
        </div>
    );
};

export default Login;
