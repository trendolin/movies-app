import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'; // Importar el archivo CSS

const Home = () => {
  return (
    <div className="home-container">
      <h1>Página de Inicio</h1>
      <p>¡Bienvenido a la aplicación de películas!</p>

      {/* Enlaces a los módulos */}
      <nav className="menu">
        <Link to="/generos" className="item">Gestionar Géneros</Link>
        <Link to="/directores" className="item">Gestionar Directores</Link>
        <Link to="/productoras" className="item">Gestionar Productoras</Link>
        <Link to="/tipos" className="item">Gestionar Tipos</Link>
        <Link to="/media" className="item">Gestionar Media (Películas/Series)</Link>
      </nav>
    </div>
  );
};

export default Home;