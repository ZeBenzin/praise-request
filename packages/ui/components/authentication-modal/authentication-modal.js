import React, { Component } from "react";

import Modal from "component/modal/modal";
import { Email, Lock, Close } from "@material-ui/icons";
import { createUser, authenticateUser } from "ui/api/user";

import classNames from "classnames";
import styles from "./authentication-modal.scss";

const TAB_ENUM = { register: 0, login: 1 };

class AuthenticationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: TAB_ENUM[props.activeTab],
      password: "",
      confirmedPassword: "",
      username: ""
    };

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onRegisterUser = this.onRegisterUser.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  onCloseModal() {
    this.props.onClose();
  }

  onRegisterUser() {
    createUser({ username: this.state.username, password: this.state.password })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  onLogin() {
    authenticateUser({
      username: this.state.username,
      password: this.state.password
    })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  onPasswordChange(e) {
    this.setState({
      password: e.currentTarget.value
    });
  }

  onConfirmPasswordChange(e) {
    this.setState({
      confirmPassword: e.currentTarget.value
    });
  }

  onUsernameChange(e) {
    this.setState({
      username: e.currentTarget.value
    });
  }

  renderRegisterForm() {
    return (
      <div className={styles.form}>
        <div>
          <div className={styles.inputContainer}>
            <Email />
            <input
              className={styles.input}
              placeholder="email"
              onChange={this.onUsernameChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <Lock />
            <input
              type="password"
              className={styles.input}
              placeholder="password"
              onChange={this.onPasswordChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <Lock />
            <input
              type="password"
              className={styles.input}
              placeholder="confirm password"
              onChange={this.onConfirmPasswordChange}
            />
          </div>
          <button className={styles.githubAuthButton}>Connect to GitHub</button>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.closeButton} onClick={this.onRegisterUser}>
            Register
          </button>
        </div>
      </div>
    );
  }

  renderLoginForm() {
    return (
      <div className={styles.form}>
        <div>
          <div className={styles.inputContainer}>
            <Email />
            <input
              className={styles.input}
              placeholder="email"
              onChange={this.onUsernameChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <Lock />
            <input
              type="password"
              className={styles.input}
              placeholder="password"
              onChange={this.onPasswordChange}
            />
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.closeButton} onClick={this.onLogin}>
            Log in
          </button>
        </div>
      </div>
    );
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
        {this.state.activeTab === TAB_ENUM.register
          ? this.renderRegisterForm()
          : this.renderLoginForm()}
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

export default AuthenticationModal;
