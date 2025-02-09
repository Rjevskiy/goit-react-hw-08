import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contacts/operations";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.contacts);
  const [hasFetched, setHasFetched] = useState(false); // Добавляем флаг для контроля загрузки

  useEffect(() => {
    if (items.length === 0 && !hasFetched) { // Запрос только если список пуст и запрос еще не был сделан
      dispatch(fetchContacts());
      setHasFetched(true); // Устанавливаем флаг, что запрос был выполнен
    }
  }, [dispatch, items.length, hasFetched]); // Добавляем зависимость от hasFetched

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
