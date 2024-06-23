// getCurrentUser.js (или тот файл, где вы делаете запрос)
import axios from 'axios';

const createBooking = async (bookingData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/book', bookingData, {

        });
        return response.data; // Если нужно обрабатывать ответ сервера
    } catch (error) {
        console.error('Ошибка при создании бронирования:', error);
        throw error;
    }
};

export default createBooking;
