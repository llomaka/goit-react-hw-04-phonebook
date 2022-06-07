import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

export default class Filter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const { filter, onChange } = this.props;
    return (
      <>
        <h2 className={styles.header}>Find contacts by name</h2>
        <input
          className={styles.input}
          type="text"
          name="filter"
          onChange={onChange}
          value={filter}
          />
      </>
    )
  }
}
