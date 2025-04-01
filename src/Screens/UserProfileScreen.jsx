import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FaPen, FaUser, FaEnvelope } from 'react-icons/fa';
import '../styles/profileScreen.css';
import { Link } from 'react-router-dom'

const UserProfileScreen = () => {
  // Contexto para acceder a los datos del usuario y la función para actualizarlos
  const { userData, setUserData } = useContext(AuthContext);

  // Estado para almacenar la información del usuario, la nueva imagen y el estado de edición
  const [user, setUser] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null); // Estado para la nueva imagen de perfil
  const [isEditing, setIsEditing] = useState(false); // Controla si estamos en modo de edición

  // useEffect para cargar los datos del usuario desde el contexto o localStorage si no están disponibles
  useEffect(() => {
    if (!userData) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        console.warn('⚠️ No se encontraron datos de usuario en localStorage.');
      }
    } else {
      setUser(userData);
    }
  }, [userData]); // Dependemos de userData para actualizar al cambiar

  // Ruta predeterminada de la imagen de perfil si no se tiene una imagen cargada
  const defaultProfileImage = 'default-user.jpg';

  // Función para manejar el cambio de imagen de perfil- Declaración de handleProfileImageChange como función asíncrona para utilizar el await
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result; // Convierte la imagen a formato Base64
  
        setNewProfileImage(base64Image); // Actualiza el estado con la nueva imagen
  
        // Actualiza los datos del usuario en el contexto y localStorage
        const updatedUser = { ...user, profile_image_base64: base64Image };
        setUser(updatedUser);
        setUserData(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Guardamos en localStorage
  
        const token = localStorage.getItem('token');
        console.log('Token antes de la solicitud:', token);
  
        if (!token) {
          console.error('No se ha encontrado el token de autenticación');
          return;
        }
  
        try {
          // Actualiza la imagen de perfil en la base de datos
          const response = await fetch(`${import.meta.env.VITE_URL_API}/api/user/profile-image`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // JWT
            },
            body: JSON.stringify({
              profile_image_base64: base64Image,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Error al actualizar la imagen de perfil');
          }
  
          // Actualizamos el usuario con la imagen guardada en la base de datos
          const updatedUserFromDb = await response.json();
          setUser(updatedUserFromDb);
          setUserData(updatedUserFromDb);
          localStorage.setItem('user', JSON.stringify(updatedUserFromDb));
  
          // Cierra el modal después de cambiar la imagen
          setIsEditing(false);
  
        } catch (error) {
          console.error('Error al actualizar la imagen de perfil:', error);
        }
      };
      reader.readAsDataURL(file); // Lee el archivo como URL en base64
    }
  };
  


  return (
    <div className="profile-wrapper">
      <Link to="/home"><button className='btn-home'>Home</button></Link>
      {user ? (
        <div className="profile-content">
          <h1 className="profile-title">Perfil de Usuario</h1>
  
          <div className="profile-image-container">
            <img 
              src={newProfileImage || user.profile_image_base64 || defaultProfileImage} 
              alt="Profile" 
              className="profile-image"
            />
            <div className="edit-button-container">
              <button 
                className="btn-edit-profile" 
                onClick={() => setIsEditing(!isEditing)} // Cambia el estado de edición
              >
                <FaPen />
              </button>
            </div>
          </div>
  
          {isEditing && (
            <>
              {/* Fondo oscuro del modal */}
              <div className="image-upload-overlay" onClick={() => setIsEditing(false)}></div>
  
              {/* Modal para subir nueva imagen */}
              <div className="image-upload">
                <input
                  type="file"
                  id="profile-image-upload"
                  onChange={handleProfileImageChange}
                  accept="image/*"
                />
                <label htmlFor="profile-image-upload" className="btn-upload">
                  Cambiar foto de perfil
                </label>
              </div>
            </>
          )}
  
          <div className="profile-info">
            <div className="profile-info-item">
              <strong><FaUser /> Nombre de usuario</strong>
              <p>{user.username}</p>
            </div>
            <div className="profile-info-item">
              <strong><FaEnvelope /> Email</strong>
              <p className='profile-email'>{user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default UserProfileScreen;
