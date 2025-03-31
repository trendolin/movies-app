// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Generos from '../pages/Generos';
import Directores from '../pages/Directores';
import Productoras from '../pages/Productoras';
import Tipos from '../pages/Tipos';
import Media from '../pages/Media';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/directores" element={<Directores />} />
        <Route path="/productoras" element={<Productoras />} />
        <Route path="/tipos" element={<Tipos />} />
        <Route path="/media" element={<Media />} />
      </Routes>
  );
};

export default AppRoutes;
