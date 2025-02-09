import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contacts/operations";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.contacts);
  const { isAuthenticated } = useSelector((state) => state.auth); // Получаем статус аутентификации
  const [hasFetched, setHasFetched] = useState(false); // Для контроля запросов

  useEffect(() => {
    if (isAuthenticated && items.length === 0 && !hasFetched) { // Проверка на авторизацию);
      setHasFetched(true); // Запрос был сделан
    }
  }, [dispatch, items.length, hasFetched, isAuthenticated]); // Добавили зависимость от isAuthenticated

  return (
    <div>
      <h1>Контакти</h1>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>Сталася помилка: {error}</p>}
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
