import React, { Component } from "react";
import PropTypes from "prop-types";

import { Person, Lock } from "@material-ui/icons";

import styles from "./login-form.scss";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmedPassword: "",
      username: ""
    };

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }
  onPasswordChange(e) {
    this.setState({
      password: e.currentTarget.value
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
              autoFocus
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
          <button
            className={styles.confirmButton}
            onClick={() =>
              this.props.onLoginUser({
                username: this.state.username,
                password: this.state.password
              })
            }
          >
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
