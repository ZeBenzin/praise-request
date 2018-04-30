import React, { PureComponent } from "react";

import Modal from "component/modal/modal";
import { Email, Lock } from "@material-ui/icons";
import { createUser } from "ui/api/user";

import classNames from "classnames";
import styles from "./header.scss";

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      password: "",
      username: ""
    };

    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onSaveUser = this.onSaveUser.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  onCloseModal() {
    this.setState({ modalOpen: false });
  }

  onSaveUser() {
    createUser({ username: this.state.username, password: this.state.password })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  onLoginClick() {
    this.setState({ modalOpen: true });
  }

  onRegisterClick() {
    this.setState({
      modalOpen: true
    });
  }

  onPasswordChange(e) {
    this.setState({ password: e.currentTarget.value });
  }

  onUsernameChange(e) {
    this.setState({ username: e.currentTarget.value });
  }

  renderRegisterForm() {
    return (
      <div className={styles.form}>
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
          />
        </div>
        <button className={styles.githubAuthButton}>Connect to GitHub</button>
      </div>
    );
  }

  renderModal() {
    const content = (
      <div className={styles.contentContainer}>
        <div className={styles.tabs}>
          <div className={classNames(styles.tab, styles.registerTab)}>
            <span className={styles.tabLabel}>Register</span>
          </div>
          <div className={classNames(styles.tab, styles.loginTab)}>
            <span className={styles.tabLabel}>Login</span>
          </div>
        </div>
        {this.renderRegisterForm()}
      </div>
    );
    return (
      <Modal
        onClose={this.onSaveUser}
        containerClassName={styles.registerModal}
        content={content}
      />
    );
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.hamburger}>
            <div className={styles.top} />
            <div className={styles.middle} />
            <div className={styles.bottom} />
          </div>
          <div>
            <button className={styles.loginButton} onClick={this.onLoginClick}>
              Log in
            </button>
            <button
              className={styles.registerButton}
              onClick={this.onRegisterClick}
            >
              Register
            </button>
          </div>
        </div>
        {this.state.modalOpen ? this.renderModal() : null}
      </div>
    );
  }
}

export default Header;
