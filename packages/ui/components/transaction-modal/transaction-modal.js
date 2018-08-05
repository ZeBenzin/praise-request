import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "component/modal/modal";

import styles from "./transaction-modal.scss";

class TransactionModal extends Component {
  render() {
    return (
      <Modal
        containerClassName={styles.modalContainer}
        onClose={this.props.onCloseModal}
      />
    );
  }
}

TransactionModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired
};

export default TransactionModal;
