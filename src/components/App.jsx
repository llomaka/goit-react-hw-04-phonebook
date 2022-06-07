import React, { useState } from "react";
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import styles from './App.module.css';
import Filter from "./Filter/Filter";

// const STORAGE_KEY = 'contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   if (localStorage.getItem(STORAGE_KEY)) {
  //     this.setState({contacts: JSON.parse(localStorage.getItem(STORAGE_KEY))});
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
  //   }
  // }

  const onChange = (event) => {
    const { value } = event.target;
    setFilter(value.trim());
  }

  const addContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in Contacts List!`);
    }
    setContacts(prevContacts => (
      [...prevContacts, {
        id: nanoid(),
        name,
        number,
      }]
    ));
  }

  const deleteContact = (id) => {
    setContacts(prevContacts => [
      prevContacts.filter(contact => contact.id !== id)]
    );
  }

  const renderContactList = () => (
    contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        fontSize: 40,
        color: '#010101'
      }}
    >
      <h1 className={styles.header}>Phonebook</h1>
      <ContactForm
        onSubmit={addContact}
      />
      <h2 className={styles.subheader}>Contacts</h2>
      <Filter
        filter={filter}
        onChange={onChange}
      />
      <ContactList
        contacts={renderContactList()}
        handleClick={deleteContact}
      />
    </div>
  );
};
