import React, { Component } from "react";
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import styles from "./ContactForm.module.css";

export default class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit({ ...this.state });
    this.resetForm();
  };

  render() {
    return (
      <form
        className={styles.form}
        autoComplete="on"
        onSubmit={this.handleSubmit}
      >
        <div className={styles.fields}>
          <label
            className={styles.label}
            htmlFor={this.nameInputId}>
            Name *
          </label>
          <input
            className={styles.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={this.nameInputId}
            placeholder="John Smith"
            onChange={this.handleInputChange}
            value={this.state.name}
          />
        </div>
        <div className={styles.fields}>
          <label
            className={styles.label}
            htmlFor={this.numberInputId}>
            Number *
          </label>
          <input
            className={styles.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={this.numberInputId}
            placeholder="050-123-23-23"
            onChange={this.handleInputChange}
            value={this.state.number}
          />
        </div>
        <button
        className={styles.button}
        type="submit"
        name="submit_button"
        >
          Add contact
        </button>
      </form>
    )
  }
}
