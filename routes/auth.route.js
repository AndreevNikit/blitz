const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Роут для регистрации нового пользователя
router.post('/login',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            // Проверка на ошибки валидации
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            // Проверка, не существует ли уже пользователь с таким email
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' });
            }

            // Хеширование пароля
            const hashedPassword = await bcrypt.hash(password, 12);

            // Создание нового пользователя
            user = new User({ email, password: hashedPassword });

            // Сохранение пользователя в базе данных
            await user.save();

            res.status(201).json({ message: 'Пользователь создан' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Ошибка сервера');
        }
    }
);

// Роут для аутентификации пользователя
router.post('/auth',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Пароль не указан').exists()
    ],
    async (req, res) => {
        try {
            // Проверка на ошибки валидации
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            // Поиск пользователя в базе данных
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            // Проверка пароля
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            // Генерация JWT токена
            const jwtSecret = 'lkfdsngo3ing392nuf02nfmgun3089g3n'; // Замените на ваш секретный ключ для подписи токена

            jwt.sign(
                { userId: user.id },
                jwtSecret,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, userId: user.id });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Ошибка сервера');
        }
    }
);

module.exports = router;
