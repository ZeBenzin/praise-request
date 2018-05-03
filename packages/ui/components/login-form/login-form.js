import React, { Component } from "react";
import PropTypes from "prop-types";

import { Person, Lock } from "@material-ui/icons";

import classNames from "classnames";
import styles from "./login-form.scss";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: {
        value: "",
        errorMessage: ""
      },
      username: {
        value: "",
        errorMessage: ""
      }
    };

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onLoginUser = this.onLoginUser.bind(this);
  }
  onPasswordChange(e) {
    this.setState({
      password: { ...this.state.password, value: e.currentTarget.value }
    });
  }

  onUsernameChange(e) {
    this.setState({
      username: { ...this.state.username, value: e.currentTarget.value }
    });
  }

  onLoginUser() {
    this.clearErrors();
    let usernameError = false;
    let passwordError = false;
    if (!this.state.username.value) {
      this.setState({
        username: {
          ...this.state.username,
          errorMessage: "Enter a username"
        }
      });
      usernameError = true;
    }

    if (!this.state.password.value) {
      this.setState({
        password: { ...this.state.password, errorMessage: "Enter a password" }
      });
      passwordError = true;
    }

    if (!usernameError && !passwordError) {
      this.props
        .onLoginUser({
          username: this.state.username.value,
          password: this.state.password.value
        })
        .then(() => this.props.onClose)
        .catch(err => {
          if (err.response.status === 404) {
            this.setState({
              username: {
                ...this.state.username,
                errorMessage: "User not found"
              }
            });
          } else if (err.response.status === 400) {
            this.setState({
              password: {
                ...this.state.password,
                errorMessage: "Password incorrect"
              }
            });
          }
        });
    }
  }

  clearErrors() {
    this.setState({
      username: { ...this.state.username, errorMessage: "" },
      password: { ...this.state.password, errorMessage: "" }
    });
  }

  render() {
    return (
      <div className={styles.form}>
        <div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
              <Person />
              <input
                className={classNames(styles.input, {
                  [styles.inputInvalid]: this.state.username.errorMessage
                })}
                placeholder="username"
                onChange={this.onUsernameChange}
                autoFocus
              />
            </div>
            {this.state.username.errorMessage ? (
              <div className={styles.errorText}>
                {this.state.username.errorMessage}
              </div>
            ) : null}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
              <Lock />
              <input
                type="password"
                className={classNames(styles.input, {
                  [styles.inputInvalid]: this.state.password.errorMessage
                })}
                placeholder="password"
                onChange={this.onPasswordChange}
              />
            </div>
            {this.state.password.errorMessage ? (
              <div className={styles.errorText}>
                {this.state.password.errorMessage}
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={this.onLoginUser}>
            Log in
          </button>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onLoginUser: PropTypes.func.isRequired
};

export default LoginForm;
