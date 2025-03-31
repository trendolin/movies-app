// frontend/src/pages/Directores.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../assets/FormStyles.css'; // Importar el archivo CSS
import '../assets/MediaForm.css';
import {
  getDirectores,
  createDirector,
  updateDirector,
  deleteDirector,
} from '../services/directorService';

const Directores = () => {
  const [directores, setDirectores] = useState([]);
  const [formData, setFormData] = useState({
    nombres: '',
    estado: 'Activo',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchDirectores();
  }, []);

  // Obtener la lista de directores
  const fetchDirectores = async () => {
    try {
      const data = await getDirectores();
      setDirectores(data);
    } catch (error) {
      console.error('Error al obtener directores:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Crear o actualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateDirector(currentId, formData);
        Swal.fire('Actualizado', 'El director se actualizó correctamente', 'success');
      } else {
        await createDirector(formData);
        Swal.fire('Creado', 'El director se creó correctamente', 'success');
      }
      // Reset
      setFormData({ nombres: '', estado: 'Activo' });
      setEditing(false);
      setCurrentId(null);
      fetchDirectores();
    } catch (error) {
      console.error('Error al guardar el director:', error);
    }
  };

  // Editar
  const handleEdit = (dir) => {
    setEditing(true);
    setCurrentId(dir._id);
    setFormData({
      nombres: dir.nombres,
      estado: dir.estado === 'Activo' ? 'Activo' : 'Inactivo',
    });
  };

  // Eliminar
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      try {
        await deleteDirector(id);
        Swal.fire('Eliminado', 'El director fue eliminado correctamente', 'success');
        fetchDirectores();
      } catch (error) {
        console.error('Error al eliminar el director:', error);
      }
    }
  };

  // Formatear fecha para mostrar en la tabla
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // AAAA/MM/DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Directores</h1>
      <form onSubmit={handleSubmit} style={{ className:"form-grid" }}>
        <div className = "form-row">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
            required
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div className = "form-row">
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            style={{ marginLeft: '10px' }}
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="form-row full-width">
        <button type="submit" style={{ marginTop: '10px' }}>
          {editing ? 'Actualizar' : 'Crear'}
        </button>
        </div>
      </form>

      {/* Tabla de directores */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Estado</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.length > 0 ? (
            directores.map((dir) => (
              <tr key={dir._id}>
                <td>{dir.nombres}</td>
                <td>{dir.estado}</td>
                <td>{formatDate(dir.fecha_creacion)}</td>
                <td>{formatDate(dir.fecha_actualizacion)}</td>
                <td>
                <div>
                  <button onClick={() => handleEdit(dir)}>Editar</button>
                  <button onClick={() => handleDelete(dir._id)}>Eliminar</button>
                </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay directores registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Directores;
