import React from "react";
import PropTypes from "prop-types";
import "./Contact.css";

const Contact = ({ id, name, number, onDelete }) => (
  <li className="contactLi">
    <article className="contact">
      <span className="contact-name">{name}</span>:{" "}
      <span className="contact-number">{number}</span>
      <button
        className="contact-delete-button"
        onClick={() => onDelete(id)}
        title={`Видалити контакт: ${name}`}
      >
        Видалити
      </button>
    </article>
  </li>
);

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contact;



