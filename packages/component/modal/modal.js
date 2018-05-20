import React, { Component } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
import styles from "./modal.scss";

class Modal extends Component {
  componentDidMount() {
    this._parentElement = this._container.parentElement;
    document.querySelector("body").appendChild(this._container);
    setTimeout(() => {
      this._contentContainer.classList.add(styles.modalContainerVisible);
      this._overlay.classList.add(styles.overlayVisible);
    }, 0);
  }

  componentWillUnmount() {
    this._parentElement.appendChild(this._container);
  }

  render() {
    return (
      <div className={styles.container} ref={r => (this._container = r)}>
        <div
          className={styles.overlay}
          onClick={this.props.onClose}
          ref={r => (this._overlay = r)}
        />
        <div
          className={classNames(
            styles.modalContainer,
            this.props.containerClassName
          )}
          ref={r => (this._contentContainer = r)}
        >
          <div className={styles.content}>{this.props.content}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.node
};

export default Modal;
