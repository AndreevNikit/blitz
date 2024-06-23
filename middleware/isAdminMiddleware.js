const User = require('../models/User');

const isAdminMiddleware = async (req, res, next) => {
    try {
        // Получаем ID пользователя из данных авторизации (например, из JWT токена)
        const userId = req.user.id;

        // Ищем пользователя в базе данных
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Проверяем, является ли пользователь администратором
        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Недостаточно прав для доступа' });
        }

        // Если пользователь администратор, продолжаем выполнение следующих middleware или обработчика маршрута
        next();
    } catch (error) {
        console.error('Ошибка при проверке прав администратора:', error);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
};

module.exports = isAdminMiddleware;
