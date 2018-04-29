import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./modal.scss";

class Modal extends Component {
  componentDidMount() {
    this._parentElement = this._container.parentElement;
    document.querySelector("body").appendChild(this._container);
  }

  componentWillUnmount() {
    this._parentElement.appendChild(this._container);
  }

  render() {
    return (
      <div className={styles.container} ref={r => (this._container = r)}>
        <div className={styles.overlay} onClick={this.props.onClose} />
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>{this.props.content}</div>
          <div className={styles.modalActions}>
            <button className={styles.closeButton} onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.node
};

export default Modal;
