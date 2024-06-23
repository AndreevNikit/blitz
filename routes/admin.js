const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // Middleware для проверки аутентификации и прав доступа

// Маршрут для получения данных текущего пользователя
router.get('/users/current', authMiddleware, async (req, res) => {
    try {
        // Находим пользователя по ID, полученному из токена
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Отправляем данные пользователя, включая isAdmin
        res.json({ isAdmin: user.isAdmin });
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

module.exports = router;
