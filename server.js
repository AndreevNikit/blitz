const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express()
const PORT = process.env.PORT || 5000

const checkAuth = (req, res, next) => {
    // Проверка авторизации пользователя
    // Это пример, замените его своей логикой проверки

    next();
};

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const bookingsRouter = require('./routes/bookings');
app.use('/api', bookingsRouter);
app.use("/api", require('./routes/auth.route'));
app.use('/api/admin', require('./routes/admin'));



async function start() {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

}

start();