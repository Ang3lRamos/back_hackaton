const express = require('express');
const Reserva = require('../models/Reserva');
const auth = require('../middleware/auth');
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

// Obtener todas las reservas aceptadas
router.get('/accepted', auth, async (req, res) => {
    try {
        const reservasAceptadas = await Reserva.find({ approved: true });
        res.json(reservasAceptadas);
    } catch (err) {
        console.error('Error al obtener las reservas aceptadas:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Aprobar o rechazar una reserva
router.put('/:id', auth, async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);
        if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

        if (req.body.rejected) {
            await Reserva.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'Reserva rechazada y eliminada' });
        }

        if (req.body.approved !== undefined) {
            reserva.approved = req.body.approved;
            reserva.rejected = false;
        }

        await reserva.save();
        res.json(reserva);
    } catch (err) {
        console.error('Error en la actualización de reserva:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Eliminar una reserva por ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndDelete(req.params.id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Reserva eliminada con éxito' });
    } catch (error) {
        console.error('Error eliminando la reserva:', error);
        res.status(500).json({ error: 'Error eliminando la reserva' });
    }
});



module.exports = router;
