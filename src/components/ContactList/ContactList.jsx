import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

export default class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        })).isRequired,
    handleClick: PropTypes.func.isRequired,
  };

  render() {
    const { contacts, handleClick } = this.props;
    return (
      <ul>
        {contacts.map(contact =>
        (<li
          key={contact.id}
          id={contact.id}
          className={styles.item}
        >
          {contact.name}: {contact.number}
          <button
            className={styles.button}
            type="button"
            onClick={() => handleClick(contact.id)}
          >
            Delete
          </button>
        </li>)
        )}
      </ul>
    )
  }
}
