import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contacts/operations";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchContacts());
    }
  }, [dispatch, items.length]);

  return (
    <div>
      <h1>Контакти</h1>
      {isLoading && <p>Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>Сталася помилка: {error}</p>}
      <ContactForm />
      <ContactList contacts={items} />
    </div>
  );
};

export default ContactsPage;
