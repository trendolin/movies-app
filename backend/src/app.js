const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas API
app.use('/api/directores', require('./routes/directorRoutes'));
app.use('/api/productoras', require('./routes/productoraRoutes'));
app.use('/api/tipos', require('./routes/tipoRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/generos', require('./routes/generoRoutes'));


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('🎬 API funcionando correctamente.');
});

module.exports = app;

