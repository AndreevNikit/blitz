import React, { useState, useContext } from 'react';
import './Auth.css';
import { Button } from 'react-bootstrap';
import { useVisibility } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Auth() {
    const [isRegistered, setIsRegistered] = useState(false);
    const { isVisible, setIsVisible } = useVisibility();
    const location = useLocation();
    const navigate = useNavigate();
    const instance = axios.create({ baseURL: 'http://localhost:5000' });

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const { login } = useContext(AuthContext);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
    };

    const handleRegister = async () => {
        const email = form.email;
        const password = form.password;

        if (email && password) {
            setIsRegistered(true);
        } else {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            const response = await instance.post('/api/auth', { ...form }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const { token, userID } = response.data;
            login(token, userID);
            localStorage.setItem('token', token);
            console.log(response);

            // Navigate to the desired page after successful login
            navigate('/menu');
        } catch (error) {
            console.log(error);
            setIsRegistered(false); // Reset the button state on error
        }
    };

    return (
        <div className='auth'>
            <div className="modal-content">
                <img src="./image/blitz.png" alt="Logo" />
                <h2>Почта</h2>
                <input
                    type="email"
                    id="email"
                    placeholder="email"
                    name='email'
                    onChange={changeHandler}
                    required
                />
                <h2>Пароль</h2>
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    name='password'
                    onChange={changeHandler}
                    required
                />
                <button
                    className="submit-btn"
                    id="submitBtn"
                    onClick={handleRegister}
                    disabled={isRegistered}
                >
                    {isRegistered ? 'Ждемссс...' : 'Войти'}
                </button>
                <a href="menu" className="back-link">//back</a>
            </div>
        </div>
    );
}
