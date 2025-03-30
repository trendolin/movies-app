const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);

// Importar modelos
const Director = require('./models/Director');
const Movie = require('./models/Movie');
const Productora = require('./models/Productora');
const Tipo = require('./models/Tipo');
const Media = require('./models/Media');

const testModels = async () => {
    await connectDB();

    try {
        console.log('📌 Eliminando datos previos...');
        await Director.deleteMany({});
        await Movie.deleteMany({});
        await Productora.deleteMany({});
        await Tipo.deleteMany({});
        await Media.deleteMany({});

        console.log('✅ Datos antiguos eliminados.');

        // Crear un director
        const director = await Director.create({ nombres: 'Christopher Nolan' });

        // Crear una productora
        const productora = await Productora.create({ nombre: 'Warner Bros', pais: 'EE.UU.' });

        // Crear un tipo
        const tipo = await Tipo.create({ nombre: 'Película', descripcion: 'Largometraje' });

        // Crear una película
        const movie = await Movie.create({
            titulo: 'Interstellar',
            descripcion: 'Un grupo de astronautas viaja a través de un agujero de gusano.',
            anio: 2014,
            duracion: 169,
            genero: ['Ciencia Ficción', 'Drama'],
            director: director._id,
            productora: productora._id,
            tipo: tipo._id,
        });

        // Crear un medio (imagen de la película)
        const media = await Media.create({
            url: 'https://ejemplo.com/interstellar.jpg',
            tipo: 'imagen',
            pelicula: movie._id,
        });

        console.log('✅ ¡Todos los datos de prueba fueron creados con éxito!');
        console.log({ director, productora, tipo, movie, media });

        process.exit();
    } catch (error) {
        console.error('❌ Error al probar los modelos:', error);
        process.exit(1);
    }
};

testModels();
