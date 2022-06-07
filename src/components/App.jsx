import React, { Component } from "react";
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import styles from './App.module.css';
import Filter from "./Filter/Filter";

const STORAGE_KEY = 'contacts';

export default class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  componentDidMount() {
    if (localStorage.getItem(STORAGE_KEY)) {
      this.setState({contacts: JSON.parse(localStorage.getItem(STORAGE_KEY))});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.contacts));
    }
  }

  onChange = (event) => {
    const { value } = event.target;
      this.setState({
        filter: value.trim(),
      });
  }

  addContact = ({ name, number }) => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      return alert(`${name} is already in Contacts List!`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, {
        id: nanoid(),
        name,
        number,
      }],
    }));
  }

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  }

  renderContactList = () => (
    this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()))
  )

  render() {
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
          onSubmit={this.addContact}
        />
        <h2 className={styles.subheader}>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChange={this.onChange}
        />
        <ContactList
          contacts={this.renderContactList()}
          handleClick={this.deleteContact}
        />
      </div>
    );
  }
}
