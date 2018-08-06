import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import classnames from "classnames";

import PersonIcon from "@material-ui/icons/Person";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Close from "@material-ui/icons/Close";

import Modal from "component/modal/modal";
import TransactionStatus from "ui/components/transaction-status/transaction-status";

import styles from "./transaction-modal.scss";

class TransactionModal extends Component {
  renderModalContent() {
    return (
      <div className={styles.modalContentContainer}>
        <span
          className={styles.exitButton}
          onClick={e => {
            e.stopPropagation();
            this.props.onCloseModal();
          }}
        >
          <Close />
        </span>

        <TransactionStatus status={this.props.transaction.status} />

        <div className={styles.txDetailsContent}>
          <div className={styles.txUser}>
            <PersonIcon className={styles.icon} />
            <div className={styles.username}>{this.props.otherUser.name}</div>
          </div>
          <div className={styles.txConnection}>
            <span className={styles.txAmount}>
              {this.props.userData.ostId === this.props.transaction.to_user_id
                ? "+"
                : "-"}
              {this.props.transaction.amount}
            </span>
            <div
              className={classnames(styles.txConnectionArrow, {
                [styles.reversed]:
                  this.props.userData.ostId ===
                  this.props.transaction.to_user_id
              })}
            >
              <div className={styles.arrowHead}>{`<`}</div>
              <div className={styles.txConnectionLine} />
            </div>
          </div>
          <div className={styles.txUser}>
            <AccountBalance className={styles.icon} />
            <div className={styles.username}>
              {this.props.userData.ghUserName}
            </div>
          </div>
        </div>
        <div className={styles.txMetaData}>
          <div>
            {moment(this.props.transaction.timestamp).format(
              "hh:mm:ss DD MMM YYYY"
            )}
          </div>
          <div>{this.props.transaction.id}</div>
          <div>{this.props.transaction.block_number}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        containerClassName={styles.modalContainer}
        onClose={this.props.onCloseModal}
        content={this.renderModalContent()}
      />
    );
  }
}

TransactionModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  otherUser: PropTypes.object.isRequired
};

export default TransactionModal;
