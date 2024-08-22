const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chatbot', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: message }
            ],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Envía la respuesta del chatbot al frontend
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un problema al procesar tu solicitud' });
    }
});

module.exports = router;