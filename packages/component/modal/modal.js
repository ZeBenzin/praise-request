import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./modal.scss";

class Modal extends Component {
  componentDidMount() {
    document.querySelector("body").appendChild(this._container);
  }

  render() {
    return (
      <div className={styles.container} ref={r => (this._container = r)}>
        <div className={styles.overlay} />
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>{this.props.content}</div>
          <div className={styles.modalActions}>
            <button className={styles.closeButton}>Close</button>
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
