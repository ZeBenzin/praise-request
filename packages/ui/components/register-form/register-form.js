import React, { Component } from "react";
import PropTypes from "prop-types";

import { Person, Lock } from "@material-ui/icons";
import styles from "./register-form.scss";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmedPassword: "",
      username: ""
    };

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
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

  render() {
    return (
      <div className={styles.form}>
        <div>
          <div className={styles.inputContainer}>
            <Person />
            <input
              className={styles.input}
              placeholder="username"
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
          <button
            className={styles.confirmButton}
            onClick={() => {
              if (this.state.password === this.state.confirmedPassword) {
                this.props.onRegisterUser({
                  username: this.state.username,
                  password: this.state.password
                });
              } else {
                // TODO: error handling
              }
            }}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  onRegisterUser: PropTypes.func.isRequired
};

export default RegisterForm;
