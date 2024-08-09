import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminPanel from "./AdminPanel";
import "./../styles/Login.css";
import {loginUser} from "../../features/auth/authSlice";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    if (isLoggedIn) {
        return <AdminPanel />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Имя пользователя:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                Пароль:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <input type="submit" value="Войти" disabled={loading} />
            {error && <p style={{ color: "red" }}>{error.message}</p>}
        </form>
    );
}

export default Login;
