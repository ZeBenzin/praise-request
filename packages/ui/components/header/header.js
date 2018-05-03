import React, { PureComponent } from "react";

import AuthenticationModal from "ui/components/authentication-modal/authentication-modal";

import classNames from "classnames";
import styles from "./header.scss";

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authModalOpen: false
    };

    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onAuthenticationModalClosed = this.onAuthenticationModalClosed.bind(
      this
    );
  }

  onLoginClick() {
    this.setState({ authModalOpen: true, activeTab: "login" });
  }

  onRegisterClick() {
    this.setState({
      authModalOpen: true,
      activeTab: "register"
    });
  }

  onAuthenticationModalClosed() {
    this.setState({ authModalOpen: false });
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <button
              className={classNames(
                styles.authenticationButton,
                styles.loginButton
              )}
              onClick={this.onLoginClick}
            >
              Log in
            </button>
            <button
              className={classNames(
                styles.authenticationButton,
                styles.registerButton
              )}
              onClick={this.onRegisterClick}
            >
              Register
            </button>
          </div>
          <div
            className={styles.hamburger}
            onClick={this.props.onActivityIconClick}
          >
            <div className={styles.top} />
            <div className={styles.middle} />
            <div className={styles.bottom} />
          </div>
        </div>
        {this.state.authModalOpen ? (
          <AuthenticationModal
            onClose={this.onAuthenticationModalClosed}
            activeTab={this.state.activeTab}
          />
        ) : null}
      </div>
    );
  }
}

export default Header;
