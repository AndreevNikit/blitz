import React, { useState, useEffect, useContext } from "react";
import './Buttons.css';
import booking from "./booking/booking";
import Faq from "./faq/Faq";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import App from "../App.js";
import { isVisible } from "@testing-library/user-event/dist/utils/index.js";
import { useVisibility } from "../context.js";
import MainBlitz from "./menu/MainBlitz.js";
import { AuthContext } from "../context/AuthContext.js";

export default function Buttons() {
      // isAuthenticated - это состояние, которое определяет, авторизован ли пользователь
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isVisible, setIsVisible } = useVisibility();
  const location = useLocation();
  const {logout, isLogin} = useContext(AuthContext)

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/Auth' || location.pathname === '/login/verification') {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [location, setIsVisible]);

  

  const handleLogin = () => {
    // Здесь вы можете реализовать логику входа
    navigate('/login');
    setIsAuthenticated(true);
  };

    const navigate = useNavigate();
  
    const handleProfile = () => {
      // Здесь должна быть ваша логика аутентификации
      // После успешной аутентификации переход на страницу профиля
      navigate('/profile');
    };

    return(
    <>

    {isVisible && (
        <div class="btn-group" id='btnBlock'>  
        <NavLink to="/menu">
            <button class="cyberpunk2077">Меню_</button>
        </NavLink>
        
        <NavLink to="/booking">
            <button class="cyberpunk2077">Бронировать</button>
        </NavLink>
        <NavLink to="/faq">
            <button class="cyberpunk2077">
                Контакты
            </button>
        </NavLink>
        {isLogin ? (
        <button class='cyberpunk2077' onClick={logout}>Выйти</button>
      ) : (
        <button class='cyberpunk2077 blue' onClick={handleLogin} id='login'>Вход</button>
      )}
        </div>
      )}

    </>    
    )
}