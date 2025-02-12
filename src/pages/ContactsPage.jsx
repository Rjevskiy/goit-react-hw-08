import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contacts/operations";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import SearchBox from "../components/SearchBox/SearchBox";  

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.contacts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 

  // Викликаємо fetchContacts, якщо користувач автентифікований та контакти ще не завантажені
  useEffect(() => {
    if (isAuthenticated && !loading && !items.length) {
      dispatch(fetchContacts()); // Відправляємо запит на отримання контактів
    }
  }, [dispatch, isAuthenticated, loading, items.length]); // Додано залежності для правильного спрацьовування

  return (
    <div>
      <h1>Контакти</h1>
      <ContactForm />
      <SearchBox /> {/* Пошуковий бокс додано правильно */}
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      <ContactList contacts={items} /> {/* Відображення списку контактів */}
    </div>
  );
};

export default ContactsPage;
