import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { FaPen, FaUser, FaEnvelope } from 'react-icons/fa';
import '../styles/profileScreen.css';
import { Link } from 'react-router-dom'

const UserProfileScreen = () => {

  const { userData, setUserData } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 

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
  }, [userData]); 

  const defaultProfileImage = 'default-user.jpg';

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result; 
  
        setNewProfileImage(base64Image);
  
        const updatedUser = { ...user, profile_image_base64: base64Image };
        setUser(updatedUser);
        setUserData(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); 
  
        const token = localStorage.getItem('token');
        console.log('Token antes de la solicitud:', token);
  
        if (!token) {
          console.error('No se ha encontrado el token de autenticación');
          return;
        }
  
        try {

          const response = await fetch(`${import.meta.env.VITE_URL_API}/api/user/profile-image`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({
              profile_image_base64: base64Image,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Error al actualizar la imagen de perfil');
          }
  
          const updatedUserFromDb = await response.json();
          setUser(updatedUserFromDb);
          setUserData(updatedUserFromDb);
          localStorage.setItem('user', JSON.stringify(updatedUserFromDb));
  
          setIsEditing(false);
  
        } catch (error) {
          console.error('Error al actualizar la imagen de perfil:', error);
        }
      };
      reader.readAsDataURL(file); 
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
                onClick={() => setIsEditing(!isEditing)} 
              >
                <FaPen />
              </button>
            </div>
          </div>
  
          {isEditing && (
            <>
              <div className="image-upload-overlay" onClick={() => setIsEditing(false)}></div>
  
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
