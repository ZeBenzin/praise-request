import React, { Component } from "react";

import Modal from "component/modal/modal";
import Close from "@material-ui/icons/Close";
import { withAuthentication } from "ui/higher-order-components/with-authentication";

import { registerWithGitHub } from "ui/api/user";

import styles from "./authentication-modal.scss";

class AuthenticationModal extends Component {
  constructor(props) {
    super(props);

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onAuthenticateUser = this.onAuthenticateUser.bind(this);
  }

  onCloseModal() {
    this.props.onClose();
  }

  onAuthenticateUser({ username, password }) {
    registerWithGitHub();
  }

  render() {
    const content = (
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <span
            className={styles.exitButton}
            onClick={e => {
              e.stopPropagation();
              this.onCloseModal();
            }}
          >
            <Close />
          </span>
          <div className={styles.title}>Sign in to PraiseRequest.</div>
          <button
            className={styles.githubAuthButton}
            onClick={this.onAuthenticateUser}
          >
            Log in with GitHub
          </button>
          <div className={styles.divider}>
            <div className={styles.dividerSide} />
            <span>Or</span>
            <div className={styles.dividerSide} />
          </div>
          <button
            className={styles.githubAuthButton}
            onClick={this.onAuthenticateUser}
          >
            Register with GitHub
          </button>
        </div>
      </div>
    );
    return (
      <Modal
        onClose={this.onCloseModal}
        containerClassName={styles.registerModal}
        content={content}
      />
    );
  }
}

export default withAuthentication(AuthenticationModal);
