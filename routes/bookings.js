const express = require('express');
const router = express.Router();
const Booking = require('../models/booking'); // Исправьте путь здесь
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');


router.post('/book', async (req, res) => {
    try {
        const { place, selectedDate, quantity, selectedTime, userId } = req.body;
        
        const booking = new Booking({
            place,
            selectedDate,
            quantity,
            selectedTime,
            user: userId // Связываем бронирование с пользователем
        });

        await booking.save();

        res.status(201).json({ message: 'Бронирование создано!' });
    } catch (error) {
        console.error('Ошибка при создании бронирования:', error);
        res.status(500).send('Ошибка сервера');
    }
});


router.get('/all', async (req, res) => {
    try {
        // Найдите все бронирования и включите в результат данные пользователя
        const bookings = await Booking.find().populate('user');
        res.json(bookings);
    } catch (error) {
        console.error('Ошибка при получении бронирований:', error);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
