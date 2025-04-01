import React from 'react'
import { Link } from 'react-router-dom'
import contacts from '../../Data/ContactData'

const Contact = ({name, id, image, status}) => {
  return (
    <Link to={`/contact/${id}`}>
      <ul className="contact-list">
          <li key={contacts.id} className="contact-item">
            <img
              src={image}
              alt={name}
              className="contact-image"
            />
            <div className="contact-info">
              <h4 className="contact-name">{name}</h4>
              <p className="contact-status">{status}</p>
            </div>
          </li>
      </ul>
    </Link>
  )
}

export default Contact