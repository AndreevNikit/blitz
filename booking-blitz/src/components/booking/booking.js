import React from "react";
import ReactDOM from "react-dom";
import './booking.css';
import '../Buttons.js'
import { NavLink, Navigate, useNavigate } from "react-router-dom";

export default function Booking() {


    const navigate = useNavigate();

    const bookingArena = () => {
        navigate('/booking/arena');
        

    };
    const bookingBlack = () => {
        navigate('/booking/black')
    }

    return(
    <>
        
    <div>
    <h1 class="header-blitz">//BLITZ</h1>
    <h2 class="header-blitz2">Выберите клуб для бронирования!</h2>

    </div>
   
    <div class="flex-center">
        <button onClick={bookingBlack}  style={{ border: 'none', background: 'none', padding: 10, cursor: 'pointer' }}>
            <img className="club" src="./image/Cards.png" alt="Blitz Logo"/>
        </button>
        <button onClick={bookingArena}  style={{ border: 'none', background: 'none', padding: 10, cursor: 'pointer' }}>
            <img className="club" src="./image/Cards1.png" alt="Blitz Logo"/>
        </button>

    </div>   


    </>    
    )
}