import React, { Component } from "react";
import PropTypes from "prop-types";

import AuthenticationModal from "ui/components/authentication-modal/authentication-modal";
import Close from "@material-ui/icons/Close";

import classNames from "classnames";
import styles from "./footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authModalOpen: false
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onAuthenticationModalClosed = this.onAuthenticationModalClosed.bind(
      this
    );
  }

  onLoginClick() {
    this.setState({ authModalOpen: true });
    this.props.hideFooter();
  }

  onRegisterClick() {
    this.setState({
      authModalOpen: true
    });
    this.props.hideFooter();
  }

  onAuthenticationModalClosed() {
    this.setState({ authModalOpen: false });
  }

  render() {
    return (
      <div
        className={classNames(styles.footer, {
          [styles.footerHidden]: !this.props.isVisible,
          [styles.footerVisible]: this.props.isVisible
        })}
        onClick={e => e.stopPropagation()}
      >
        <div
          className={styles.closeFooterButton}
          onClick={this.props.hideFooter}
        >
          <Close />
        </div>
        <div className={styles.footerContentContainer}>
          <div className={styles.footerContentDetails}>
            <div className={styles.footerTitle}>So close!</div>
            <div className={styles.footerDescription}>
              Log in or register an account to give praise.
            </div>
          </div>
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

Footer.propTypes = {
  footerContent: PropTypes.node,
  isVisible: PropTypes.bool,
  hideFooter: PropTypes.func.isRequired
};

export default Footer;
