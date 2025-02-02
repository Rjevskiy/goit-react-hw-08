import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps"; 
import "./ContactForm.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Ім'я повинно буди більше за 3 символа")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .required("Обов'язкове поле"),
  number: Yup.string()
    .matches(/^[\d\-]+$/, "Номер повинен містити тільки цифри і дефіс (-)")
    .min(3, "Довжина номера повинна бути не менше 3 символів")
    .max(50, "Номер не повинен перевищувати 50 символів")
    .required("Обов'язкове поле"),
});


const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items); 

  const handleSubmit = async (values, { resetForm }) => {
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === values.name.toLowerCase() ||
        contact.number === values.number
    );

    if (isDuplicate) {
      alert("Контакт з таким іменем або номером вже існує!");
      return;
    }

    try {
      await dispatch(addContact(values)); 
      resetForm(); 
    } catch (error) {
      console.error("Помилка при додаванні контакту:", error);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="contact-form">
        <div>
          <label htmlFor="name">Ім'я</label>
          <Field id="name" name="name" placeholder="Введіть ім'я" />
          <ErrorMessage name="name" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="number">Номер</label>
          <Field id="number" name="number" placeholder="Введіть номер" />
          <ErrorMessage name="number" component="div" className="error" />
        </div>

        <button type="submit">Додати контакт</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;








