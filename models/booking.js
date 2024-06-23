const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    place: { type: String, required: true },
    selectedDate: { type: String, required: true },
    quantity: { type: Number, required: true },
    selectedTime: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Booking', bookingSchema);
