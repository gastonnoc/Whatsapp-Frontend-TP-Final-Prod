import React from "react";
import "../Styles/chat.css";
const Message = ({ text, time, id, author, estado }) => {
  return (
    <div>
      <div className="message">
        {author == "Yo" ? (
          <div className="messageContainerYo">
            <div className="messageYo">
              <span className="texto">{text}</span>
              <div className="horaStatus">
                <span className="hora">{time}</span>
                <span className="status">
                  {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      fill="rgb(83,189,235)"
                      className="bi bi-check-all"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                    </svg>
                  }
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="messageContainerUsuario">
            <div className="messageUsuario">
              <span className="texto">{text}</span>
              <span className="hora">{time}</span>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};



export default Message;
