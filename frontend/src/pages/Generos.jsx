import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../assets/MediaForm.css';
import {
  getGeneros,
  createGenero,
  updateGenero,
  deleteGenero,
} from '../services/generoService';

const Generos = () => {
  const [generos, setGeneros] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = async () => {
    try {
      const data = await getGeneros();
      setGeneros(data);
    } catch (error) {
      console.error('Error al obtener géneros:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Crear o actualizar un género
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateGenero(currentId, formData);
        Swal.fire('Actualizado', 'El género se actualizó correctamente', 'success');
      } else {
        await createGenero(formData);
        Swal.fire('Creado', 'El género se creó correctamente', 'success');
      }
      // Reiniciar el formulario
      setFormData({ nombre: '', estado: 'Activo', descripcion: '' });
      setEditing(false);
      setCurrentId(null);
      fetchGeneros();
    } catch (error) {
      console.error('Error al guardar el género:', error);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (gen) => {
    setEditing(true);
    setCurrentId(gen._id);
    setFormData({
      nombre: gen.nombre,
      estado: gen.estado,
      descripcion: gen.descripcion || ''
    });
  };

  // Eliminar un género
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      try {
        await deleteGenero(id);
        Swal.fire('Eliminado', 'El género fue eliminado correctamente', 'success');
        fetchGeneros();
      } catch (error) {
        console.error('Error al eliminar el género:', error);
      }
    }
  };

  // Formatear fecha a AAAA-MM-DD (o como prefieras)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Géneros</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Campo Nombre */}
        <div className="form-row">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo Estado */}
        <div className="form-row">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        {/* Campo Descripción */}
        <div className="form-row">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Botón de Enviar */}
        <div className="form-row full-width">
          <button type="submit">
            {editing ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>

      {/* Tabla de géneros */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.length > 0 ? (
            generos.map((gen) => (
              <tr key={gen._id}>
                <td>{gen.nombre}</td>
                <td>{gen.estado}</td>
                <td>{gen.descripcion || ''}</td>
                <td>{formatDate(gen.fecha_creacion)}</td>
                <td>{formatDate(gen.fecha_actualizacion)}</td>
                <td>
                  <button onClick={() => handleEdit(gen)}>Editar</button>
                  <button onClick={() => handleDelete(gen._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay géneros registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Generos;

