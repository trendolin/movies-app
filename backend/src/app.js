const express = require('express');
const corsOptions = {
  origin: ['https://movies-app-2-mokg.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const app = express();

// Middlewares
app.use(express.json());
//app.use(cors());
app.use(cors({
    origin: 'https://movies-app-2-mokg.onrender.com'
  }));
app.options('*', cors(corsOptions));

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

