import React, { useContext } from "react";
import "../styles/homeScreen.css";
import { ContactsContext } from "../Context/ContactsContext";

const HomeScreen = () => {
    const contacts_context_values = useContext(ContactsContext); 
    return (
            <div className="homeScreen">
                <div className="masterContainer">
                    <img
                        src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669aeJeom.png"
                        alt="whatsapp-image"
                    />
                    <h1 className="descargaWsp">Descarga WhatsApp para Windows</h1>
                    <p className="textoDescarga">
                        Descarga la aplicación para Windows y haz llamadas, comparte
                        pantalla y disfruta de una <br /> experiencia mas rapida.
                    </p>
                    <button className="descargaBtn">
                        <a
                            className="letraDescargaBtn"
                            href="https://www.whatsapp.com/download?lang=es_LA"
                            target="_blank"
                        >
                            Descargar para Windows
                        </a>
                    </button>
                    <span className="cifrado">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="currentColor"
                            class="bi bi-lock-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                        </svg>{" "}
                        Tus mensajes personales están cifrados de extremo a extremo.
                    </span>
                </div>
            </div>
        
    );
};

export default HomeScreen;
