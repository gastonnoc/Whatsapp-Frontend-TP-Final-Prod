import React, { useState, useContext } from "react";
import "../Styles/sideBar.css";
import { ContactsContext } from "../Context/ContactsContext";
import Contact from "./Contact";
import { IoCameraOutline, IoAdd } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const ContactList = () => {
  const { contacts_state, addNewChat } = useContext(ContactsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleCreateChat = async () => {
    if (!username.trim()) return;
    await addNewChat(username);
    setIsModalOpen(false);
    setUsername("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreateChat();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Chats</h1>
        <div className="sidebarHeaderIcons">
          <div className="profile-icon">
            <Link to="/user-profile">
              <CgProfile size={23} />
            </Link>
          </div>
          <IoCameraOutline size={23} />
          <div className="dots">
            <BsThreeDotsVertical size={23} />
          </div>
        </div>
      </div>

      {contacts_state.map((contact) => (
        <div className="contact-list" key={contact.id}>
          <Contact
            name={contact.name}
            id={contact.id}
            image={contact.image}
            status={contact.status}
          />
        </div>
      ))}
      
      {/* Botón para abrir el modal */}
      <button className="addChatButton" onClick={() => setIsModalOpen(true)}>
        <IoAdd size={30} />
      </button>

      {/* Modal para crear nuevo chat */}
      {isModalOpen && (
        <div className="modalBackground">
          <div className="modalContent">
            <h2>Nuevo Chat</h2>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleCreateChat}>Crear Chat</button>
            <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
