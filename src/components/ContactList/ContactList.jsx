import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { selectFilteredContacts } from '../../redux/contacts/selectors'; // ✅ исправлен импорт
import Contact from '../ContactList/Contact';
import './Contact.css';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <ul className="contact">
        {filteredContacts.length > 0 ? (
          filteredContacts.map(({ id, name, number }) => (
            <Contact key={id} id={id} name={name} number={number} onDelete={handleDelete} />
          ))
        ) : (
          <p>Контакты не найдены.</p>
        )}
      </ul>
    </div>
  );
};

export default ContactList;
