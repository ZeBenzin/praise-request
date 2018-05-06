import React, { Component } from "react";

import Modal from "component/modal/modal";
import RegisterForm from "ui/components/register-form/register-form";
import LoginForm from "ui/components/login-form/login-form";
import { Close } from "@material-ui/icons";
import { createUser, authenticateUser } from "ui/api/user";
import { withAuthentication } from "ui/higher-order-components/with-authentication";

import classNames from "classnames";
import styles from "./authentication-modal.scss";

const TAB_ENUM = { register: 0, login: 1 };

class AuthenticationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: TAB_ENUM[props.activeTab]
    };

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onRegisterUser = this.onRegisterUser.bind(this);
    this.onLoginUser = this.onLoginUser.bind(this);
  }

  onCloseModal() {
    this.props.onClose();
  }

  onRegisterUser({ username, password }) {
    createUser({ username, password })
      .then(() => this.props.onClose())
      .catch(err => console.log(err));
  }

  onLoginUser({ username, password }) {
    return authenticateUser({
      username,
      password
    }).then(() => {
      this.props.onUserAuthenticated();
      this.props.onClose();
    });
  }

  render() {
    const content = (
      <div className={styles.contentContainer}>
        <div className={styles.tabs}>
          <div
            className={classNames(styles.tab, styles.loginTab, {
              [styles.activeTab]: this.state.activeTab === TAB_ENUM.login
            })}
            onClick={() => this.setState({ activeTab: TAB_ENUM.login })}
          >
            <span className={styles.tabLabel}>Log in</span>
          </div>
          <div
            className={classNames(styles.tab, styles.registerTab, {
              [styles.activeTab]: this.state.activeTab === TAB_ENUM.register
            })}
            onClick={() => this.setState({ activeTab: TAB_ENUM.register })}
          >
            <span className={styles.tabLabel}>Register</span>
            <span
              className={styles.exitButton}
              onClick={e => {
                e.stopPropagation();
                this.onCloseModal();
              }}
            >
              <Close />
            </span>
          </div>
        </div>
        {this.state.activeTab === TAB_ENUM.register ? (
          <RegisterForm onRegisterUser={this.onRegisterUser} />
        ) : (
          <LoginForm
            onLoginUser={this.onLoginUser}
            onClose={this.props.onClose}
          />
        )}
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
