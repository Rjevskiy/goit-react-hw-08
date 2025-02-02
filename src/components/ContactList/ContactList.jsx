import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { selectFilteredContacts } from '../../redux/contactsSlice'; 
import Contact from '../ContactList/Contact';
import './Contact.css';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts); 
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const contactExists = filteredContacts.find(contact => contact.id === id);
    if (contactExists) {
      dispatch(deleteContact(id));
    } else {
      alert('Контакт не знайден!');
    }
  };
  
  return (
    <div>
      <ul className="contact">
        {filteredContacts.map(({ id, name, number }) => (
          <Contact key={id} id={id} name={name} number={number} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;










