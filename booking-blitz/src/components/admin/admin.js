import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const AdminPanel = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/all');
                setBookings(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке бронирований:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="admin-container">
            <h2>Админ Панель</h2>
            <table class='table-container'>
                <thead>
                    <tr>
                        <th>Место</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Количество</th>
                        <th>Email пользователя</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.place}</td>
                            <td>{booking.selectedDate}</td>
                            <td>{booking.selectedTime}</td>
                            <td>{booking.quantity}</td>
                            <td>{booking.user && booking.user.email ? booking.user.email : 'Нет данных'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
