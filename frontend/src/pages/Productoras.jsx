// frontend/src/pages/Productoras.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora,
} from '../services/productoraService';

const Productoras = () => {
  const [productoras, setProductoras] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo',
    slogan: '',
    descripcion: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Función para obtener la lista de productoras
  const fetchProductoras = async () => {
    try {
      const data = await getProductoras();
      setProductoras(data);
    } catch (error) {
      console.error('Error al obtener productoras:', error);
    }
  };

  // Se ejecuta una sola vez al montar el componente
  useEffect(() => {
    fetchProductoras();
  }, []);

  // Manejar los cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Formatear fecha (AAAA-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Crear o actualizar productora
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateProductora(currentId, formData);
        Swal.fire('Actualizado', 'La productora se actualizó correctamente', 'success');
      } else {
        await createProductora(formData);
        Swal.fire('Creado', 'La productora se creó correctamente', 'success');
      }
      setFormData({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
      setEditing(false);
      setCurrentId(null);
      fetchProductoras();
    } catch (error) {
      console.error('Error al guardar la productora:', error);
    }
  };

  // Cargar datos para editar
  const handleEdit = (prod) => {
    setEditing(true);
    setCurrentId(prod._id);
    setFormData({
      nombre: prod.nombre,
      estado: prod.estado,
      slogan: prod.slogan || '',
      descripcion: prod.descripcion || '',
    });
  };

  // Eliminar productora
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
        await deleteProductora(id);
        Swal.fire('Eliminado', 'La productora fue eliminada correctamente', 'success');
        fetchProductoras();
      } catch (error) {
        console.error('Error al eliminar la productora:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Productoras</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Opcional: Mostrar ID en modo edición */}
        {editing && (
          <div>
            <label>ID:</label>
            <input type="text" value={currentId} readOnly style={{ marginLeft: '10px' }} />
          </div>
        )}
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
          <label>Slogan:</label>
          <input
            type="text"
            name="slogan"
            value={formData.slogan}
            onChange={handleInputChange}
            style={{ marginLeft: '10px' }}
          />
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
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.length > 0 ? (
            productoras.map((prod) => (
              <tr key={prod._id}>
                
                <td>{prod.nombre}</td>
                <td>{prod.estado}</td>
                <td>{formatDate(prod.fechaCreacion)}</td>
                <td>{formatDate(prod.fechaActualizacion)}</td>
                <td>{prod.slogan}</td>
                <td>{prod.descripcion}</td>
                <td>
                  <button onClick={() => handleEdit(prod)}>Editar</button>
                  <button onClick={() => handleDelete(prod._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay productoras registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Productoras;
