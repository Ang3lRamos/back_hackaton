const express = require('express');
const Reserva = require('../models/Reserva');
const auth = require('../middleware/auth');  // Middleware para autenticación

const router = express.Router();

// Crear nueva reserva
router.post('/', async (req, res) => {
    const { name, email, date, court, startTime, endTime } = req.body;

    try {
        const newReserva = new Reserva({ name, email, date, court, startTime, endTime });
        await newReserva.save();
        res.status(201).json(newReserva);
    } catch (err) {
        console.error('Error al crear la reserva:', err);  // Log para depuración
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Obtener todas las reservas (Solo admins)
router.get('/', auth, async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (err) {
        console.error('Error al obtener las reservas:', err);  // Log para depuración
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Aprobar o desaprobar una reserva
router.put('/:id', auth, async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);
        if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

        // Asegúrate de recibir correctamente el valor de `approved`
        if (typeof req.body.approved !== 'boolean') {
            return res.status(400).json({ error: 'Debe proporcionar un valor booleano para `approved`' });
        }

        reserva.approved = req.body.approved;
        await reserva.save();
        res.json(reserva);
    } catch (err) {
        console.error('Error en la actualización de reserva:', err);  // Log para depuración
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
