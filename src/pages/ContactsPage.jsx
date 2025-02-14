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
  const isLoginSuccessful = useSelector((state) => state.auth.isLoginSuccessful); // Для отслеживания успешного входа

  // Викликаємо fetchContacts, якщо користувач автентифікований, логін пройшов успішно і контакти ще не завантажені
  useEffect(() => {
    if (isAuthenticated && isLoginSuccessful && !loading && items.length === 0) {
      dispatch(fetchContacts()); // Відправляємо запит на отримання контактів
    }
  }, [dispatch, isAuthenticated, isLoginSuccessful, loading, items.length]);

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
