// src/pages/Tipos.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo,
} from '../services/tipoService';

const Tipos = () => {
  const [tipos, setTipos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo', // o "Inactivo"
    descripcion: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchTipos();
  }, []);

  const fetchTipos = async () => {
    try {
      const data = await getTipos();
      console.log("Datos recibidos del backend:", data);
      setTipos(data);
    } catch (error) {
      console.error('Error al obtener tipos:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", formData);
    try {
      if (editing) {
        await updateTipo(currentId, formData);
        Swal.fire('Actualizado', 'El tipo se actualizó correctamente', 'success');
      } else {
        await createTipo(formData);
        Swal.fire('Creado', 'El tipo se creó correctamente', 'success');
      }
      setFormData({ nombre: '', estado: 'Activo', descripcion: '' });
      setEditing(false);
      setCurrentId(null);
      fetchTipos();
    } catch (error) {
      console.error('Error al guardar el tipo:', error);
    }
  };

  const handleEdit = (tipo) => {
    setEditing(true);
    setCurrentId(tipo._id);
    setFormData({
      nombre: tipo.nombre,
      estado: tipo.estado,
      descripcion: tipo.descripcion || '',
    });
  };

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
        await deleteTipo(id);
        Swal.fire('Eliminado', 'El tipo fue eliminado correctamente', 'success');
        fetchTipos();
      } catch (error) {
        console.error('Error al eliminar el tipo:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Tipos</h1>

      <form onSubmit={handleSubmit} className="form-grid">
      <div className = "form-row">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
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
        <div className = "form-row">
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div className="form-row full-width">
        <button type="submit" style={{ marginTop: '10px' }}>
          {editing ? 'Actualizar' : 'Crear'}
        </button>
        </div>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.length > 0 ? (
            tipos.map((t) => (
              <tr key={t._id}>
                <td>{t.nombre}</td>
                <td>{t.estado === "Activo" ? "Activo" : "Inactivo"}</td>
                <td>{t.descripcion || ''}</td>
                <td>
                  <button onClick={() => handleEdit(t)}>Editar</button>
                  <button onClick={() => handleDelete(t._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay tipos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tipos;
