import './Booking3.css'
import React, {useState} from 'react';
import axios from 'axios';

export default function Booking3() {
        const [place, setPlace] = useState('');
        const [selectedDate, setSelectedDate] = useState('');
        const [quantity, setQuantity] = useState('');
        const [selectedTime, setselectedTime] = useState('');
    
      const handlePlaceChange = (event) => {
        setPlace(event.target.value);
      };
    
      const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };
    
      const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
      };
      const handleTimeChange = (event) => {
        setselectedTime(event.target.value);
      }
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isFormComplete) return;

        const bookingData = {
            place,
            selectedDate,
            selectedTime,
            quantity
        };
        

        try {
            const response = await axios.post('http://localhost:5000/api/book', bookingData);
            console.log(response.data);
            // Вы можете добавить код для уведомления пользователя об успешном бронировании
        } catch (error) {
            console.error('Error booking:', error);
            // Обработка ошибки
        }
    };
        
        const isFormComplete = place && selectedDate && quantity && selectedTime;
    
        return(
        <>
        <div class="container">
            <div class="image-container">
                <img src='../image/Cards1.png' alt="Gaming Setup"/>
            </div>

            <form onSubmit={handleSubmit}>
                <label for="place">Место</label>
                <select id="place" value={place} onChange={handlePlaceChange}>
                    <option hidden>Выберите</option>
                    <option value="exclusive">Exclusive</option>
                </select>
                <label for="date">Дата</label>
                <input 
              type="date" 
              id="date" 
              value={selectedDate} 
              onChange={handleDateChange}   
                />
                <label for="time">Время (18:00-21:00)</label>
                <input 
              type="time" 
              id="time" 
              min='18:00'
              max='21:00' required
              value={selectedTime} 
              onChange={handleTimeChange}   
                />
            <label for="quantity">Количество мест</label>
            <input type="number" id="quantity"step="1" min="1" max="10" value={quantity} onChange={handleQuantityChange}/>
                <button type="submit" class="button confirm-button" style={{ backgroundColor: isFormComplete ? '#00ffff' : 'gray' }} disabled={!isFormComplete}>Подтвердить</button>
            </form>
            
        </div>
            
        </>    
        )
    }