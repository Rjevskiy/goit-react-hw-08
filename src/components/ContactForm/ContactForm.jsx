import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { nanoid } from "nanoid";
import "./ContactForm.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Ім'я повинно бути більше за 3 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .required("Обов'язкове поле"),
  number: Yup.string()
    .matches(/^[\d\s\-+]+$/, "Номер повинен містити тільки цифри, пробіли, '+' та дефіс (-)")
    .min(3, "Довжина номера повинна бути не менше 3 символів")
    .max(50, "Номер не повинен перевищувати 50 символів")
    .required("Обов'язкове поле"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    const newContact = { id: nanoid(), ...values };

    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.toLowerCase() === values.name.toLowerCase() ||
        contact.number === values.number
    );

    if (isDuplicate) {
      alert("Контакт з таким іменем або номером вже існує!");
      setSubmitting(false);  
      return;
    }

    try {
      await dispatch(addContact(newContact));
      resetForm();
    } catch (error) {
      console.error("Помилка при додаванні контакту:", error);
    } finally {
      setSubmitting(false);  
    }
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="contact-form">
          <div>
            <label htmlFor="name">Ім'я</label>
            <Field id="name" name="name" placeholder="Введіть ім'я" autoComplete="off" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="number">Номер</label>
            <Field id="number" name="number" placeholder="Введіть номер" autoComplete="off" />
            <ErrorMessage name="number" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Завантаження..." : "Додати контакт"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
