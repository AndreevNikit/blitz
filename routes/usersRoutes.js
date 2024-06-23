const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/current', async (req, res) => {
    try {
      
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.json(currentUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
