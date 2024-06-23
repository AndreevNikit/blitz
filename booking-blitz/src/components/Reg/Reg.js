import React, { useState } from 'react';
import './Reg.css';
import { NavLink, Switch, Link} from 'react-router-dom';
import axios from 'axios';

export default function VerificationCode() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
    console.log(form);
  }

  const instance = axios.create({baseURL:'http://localhost:5000'})

  const registerHandler = async () => {
    try {
        await instance.post('/api/login', {...form},{
          headers: {
            'Content-Type': 'application/json',
            'X-Powered-By': 'Express'
          }
        })
        .then(response => console.log(response))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="verification-container">
        <form onSubmit={e => e.preventDefault()}>
      <div className="logo-container">
        <img src="../image/blitz.png" alt="Кибер Клуб" />
      </div>
        <label>Электронная почта</label>
        <input 
          type="email" 
          id="email" 
          placeholder="email" 
          name='email'
          onChange={changeHandler} 
          required
        />
        <label>Пароль</label>
        <input 
          type="password" 
          id="password" 
          placeholder="password" 
          name='password'
          onChange={changeHandler} 
          required
        />
        <Link to="/Auth" className="resend-link">Уже авторизован?</Link>

        <button 
          className="button confirm-button" 
          style={{ backgroundColor: 'yellow'}}
          onClick={registerHandler}
        >
          ПОДТВЕРДИТЬ
        </button>

        <a href="menu" className="back-link">//back</a>
      </form>
    </div>
  );
}