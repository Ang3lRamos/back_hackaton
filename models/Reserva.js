const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    court: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    approved: { type: Boolean, default: false },
    rejected: { type: Boolean, default: false },
});

module.exports = mongoose.model('Reserva', ReservaSchema);
