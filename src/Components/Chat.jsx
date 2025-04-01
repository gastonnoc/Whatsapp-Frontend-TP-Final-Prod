import React, { useContext, useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContactsContext } from "../Context/ContactsContext";
import MessagesList from "./MessagesList";
import "../Styles/chat.css";
import { IoMdSend } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlinePhone } from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";

const Chat = () => {
  const { contact_id } = useParams();
  const { addNewMessageToContact, getContactById } = useContext(ContactsContext);
  const [contact_selected, setContactSelected] = useState(null);

  useEffect(() => {
    const contact = getContactById(contact_id);
    
    if (!contact) {
      console.error("Contacto no encontrado:", contact_id);
    } else {
      setContactSelected(contact);
    }
  }, [contact_id, getContactById]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [contact_selected?.messages]);

  const navigate = useNavigate();

  const handleSubmitNewMessage = (event) => {
    event.preventDefault();
    const text = event.target.message.value.trim();
    if (!text) return;

    addNewMessageToContact(text, contact_id);

    const updatedContact = getContactById(contact_id);
    if (updatedContact) {
      setContactSelected(updatedContact);
    }

    event.target.message.value = "";
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="mainContent">
      {!contact_selected ? (
        <div>No se encontró el contacto o no tiene mensajes.</div>
      ) : (
        <div className="messages">
          <div className="contactHeader">
            <button onClick={goHome} className="backToHomeButton">
              <FaArrowLeft size="15px" />
            </button>
            <img className="contactImg" src={contact_selected.image} alt={contact_selected.name} />
            <h1 className="contactName">{contact_selected.name}</h1>
            <div className="contactHeaderIcons">
              <AiOutlineVideoCamera size={23} />
              <MdOutlinePhone size={23} />
              <BsThreeDotsVertical size={23} />
            </div>
          </div>

          <div className="messagesBody">
            <MessagesList messages={contact_selected.messages} />
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      <div className="messagesNewMessageForm">
        <form onSubmit={handleSubmitNewMessage}>
          <input placeholder="Escribe un mensaje" id="message" name="message" autoFocus />
          <button className="send" type="submit">
            <IoMdSend size="30px" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
