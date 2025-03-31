import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import '../assets/MediaForm.css';
import {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
} from '../services/mediaService';
import { getGeneros } from '../services/generoService';
import { getDirectores } from '../services/directorService';
import { getProductoras } from '../services/productoraService';
import { getTipos } from '../services/tipoService';

const Media = () => {
  const [mediaList, setMediaList] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url_pelicula: '',
    imagen_portada: '',
    anio_estreno: '',
    genero_id: '',
    director_id: '',
    productora_id: '',
    tipo_id: '',
  });

  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    fetchMedia();
    fetchGeneros();
    fetchDirectores();
    fetchProductoras();
    fetchTipos();
  }, []);

  // Funciones de fetcheo
  const fetchMedia = async () => {
    try {
      const data = await getMedia(); 
      setMediaList(data);
    } catch (error) {
      console.error('Error al obtener Media:', error);
      Swal.fire('Error', 'No se pudieron cargar los medios', 'error');
    }
  };

  const fetchGeneros = async () => {
    try {
      const data = await getGeneros();
      // Filtrar géneros activos
      setGeneros(data.filter(genero => genero.estado === 'Activo'));
    } catch (error) {
      console.error('Error al obtener géneros:', error);
    }
  };

  const fetchDirectores = async () => {
    try {
      const data = await getDirectores();
      // Filtrar directores activos
      setDirectores(data.filter(director => director.estado === 'Activo'));
    } catch (error) {
      console.error('Error al obtener directores:', error);
    }
  };

  const fetchProductoras = async () => {
    try {
      const data = await getProductoras();
      // Filtrar productoras activas
      setProductoras(data.filter(productora => productora.estado === 'Activo'));
    } catch (error) {
      console.error('Error al obtener productoras:', error);
    }
  };

  const fetchTipos = async () => {
    try {
      const data = await getTipos();
      setTipos(data);
    } catch (error) {
      console.error('Error al obtener tipos:', error);
    }
  };

  // Función para generar el serial a partir de las 3 primeras letras del título y el año de estreno
  const generateSerial = (titulo, anio) => {
    if (!titulo || !anio) return '';
    return titulo.substring(0, 3).toUpperCase() + anio;
  };

  // Validación simple de URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Actualizar el formulario y, si es título o año, actualizar el serial
    setFormData((prevData) => {
      const updated = { ...prevData, [name]: value };
      if (name === 'titulo' || name === 'anio_estreno') {
        updated.serial = generateSerial(updated.titulo, updated.anio_estreno);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateMedia(currentId, formData);
        Swal.fire('Actualizado', 'El registro se actualizó con éxito', 'success');
      } else {
        await createMedia(formData);
        Swal.fire('Creado', 'El registro se creó con éxito', 'success');
      }
      
      // Limpiar formulario
      setFormData({
        serial: '',
        titulo: '',
        sinopsis: '',
        url_pelicula: '',
        imagen_portada: '',
        anio_estreno: '',
        genero_id: '',
        director_id: '',
        productora_id: '',
        tipo_id: '',
      });
      
      setEditing(false);
      setCurrentId(null);
      fetchMedia();
    } catch (error) {
      console.error('Error al guardar Media:', error);
      Swal.fire('Error', 'Hubo un problema al guardar el medio', 'error');
    }
  };

  const handleEdit = (item) => {
    setEditing(true);
    setCurrentId(item._id);
    setFormData({
      serial: item.serial || '',
      titulo: item.titulo || '',
      sinopsis: item.sinopsis || '',
      url_pelicula: item.url_pelicula || '',
      imagen_portada: item.imagen_portada || '',
      anio_estreno: item.anio_estreno || '',
      // Si el campo viene como objeto populado, toma _id; de lo contrario, usa el valor directamente
      genero_id: item.genero_id?._id || item.genero_id || '',
      director_id: item.director_id?._id || item.director_id || '',
      productora_id: item.productora_id?._id || item.productora_id || '',
      tipo_id: item.tipo_id?._id || item.tipo_id || '',
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
        await deleteMedia(id);
        Swal.fire('Eliminado', 'El registro fue eliminado correctamente', 'success');
        fetchMedia();
      } catch (error) {
        console.error('Error al eliminar Media:', error);
        Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Media (Películas y Series)</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Campo Serial (solo lectura) */}
        <div className="form-row">
          <label>Serial:</label>
          <input
            type="text"
            name="serial"
            value={formData.serial}
            readOnly
            style={{ backgroundColor: '#f0f0f0' }}
          />
        </div>

        {/* Campo Título */}
        <div className="form-row">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Campo Sinopsis */}
        <div className="form-row">
          <label>Sinopsis:</label>
          <textarea
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Campo URL de la Película */}
        <div className="form-row">
          <label>URL de la Película:</label>
          <input
            type="text"
            name="url_pelicula"
            value={formData.url_pelicula}
            onChange={handleInputChange}
          />
        </div>

        {/* Campo Imagen de Portada */}
        <div className="form-row">
          <label>Imagen de Portada (URL):</label>
          <input
            type="text"
            name="imagen_portada"
            value={formData.imagen_portada}
            onChange={handleInputChange}
          />
          {formData.imagen_portada && isValidUrl(formData.imagen_portada) ? (
            <img src={formData.imagen_portada} alt="Portada" width="100" />
          ) : (
            <span>Sin imagen</span>
          )}
        </div>

        {/* Campo Año de Estreno */}
        <div className="form-row">
          <label>Año de Estreno:</label>
          <input
            type="number"
            name="anio_estreno"
            value={formData.anio_estreno}
            onChange={handleInputChange}
            required
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Dropdown Género */}
        <div className="form-row">
          <label>Género:</label>
          <select
            name="genero_id"
            value={formData.genero_id}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Género</option>
            {generos.map((genero) => (
              <option key={genero._id} value={genero._id}>
                {genero.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Director */}
        <div className="form-row">
          <label>Director:</label>
          <select
            name="director_id"
            value={formData.director_id}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Director</option>
            {directores.map((director) => (
              <option key={director._id} value={director._id}>
                {director.nombres}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Productora */}
        <div className="form-row">
          <label>Productora:</label>
          <select
            name="productora_id"
            value={formData.productora_id}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Productora</option>
            {productoras.map((productora) => (
              <option key={productora._id} value={productora._id}>
                {productora.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown Tipo */}
        <div className="form-row">
          <label>Tipo:</label>
          <select
            name="tipo_id"
            value={formData.tipo_id}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de Enviar */}
        <div className="form-row full-width">
          <button type="submit">
            {editing ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>

      {/* Tabla de registros */}
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Serial</th>
            <th>Título</th>
            <th>Sinopsis</th>
            <th>URL</th>
            <th>Imagen</th>
            <th>Año Estreno</th>
            <th>Género</th>
            <th>Director</th>
            <th>Productora</th>
            <th>Tipo</th>
            <th>Creación</th>
            <th>Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mediaList.length > 0 ? (
            mediaList.map((m) => (
              <tr key={m._id}>
                <td>{m.serial}</td>
                <td>{m.titulo}</td>
                <td>{m.sinopsis}</td>
                <td>{m.url_pelicula}</td>
                <td>
                  {m.imagen_portada ? <img src={m.imagen_portada} alt="Portada" width="100"/> : 'Sin imagen'}
                </td>
                <td>{m.anio_estreno}</td>
                <td>{m.genero_id?.nombre || ''}</td>
                <td>{m.director_id?.nombres || ''}</td>
                <td>{m.productora_id?.nombre || ''}</td>
                <td>{m.tipo_id?.nombre || ''}</td>
                <td>{formatDate(m.fecha_creacion)}</td>
                <td>{formatDate(m.fecha_actualizacion)}</td>
                <td>
                  <button onClick={() => handleEdit(m)}>Editar</button>
                  <button onClick={() => handleDelete(m._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No hay registros de Media.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Media;
