import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";

import AuthenticationModal from "ui/components/authentication-modal/authentication-modal";
import { withAuthentication } from "ui/higher-order-components/with-authentication";

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
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onAuthenticationModalClosed = this.onAuthenticationModalClosed.bind(
      this
    );
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onLoginClick() {
    this.setState({ authModalOpen: true, activeTab: "login" });
  }

  onLogoutClick() {
    localStorage.removeItem("praiseRequestToken");
    this.props.onUserLogOut();
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

  onSearchClick() {
    this.props.toggleSearchOverlay();
  }

  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.rightContent}>
            {this.props.location.pathname !== "/search" ? (
              <SearchIcon
                className={styles.searchButton}
                onClick={this.onSearchClick}
              />
            ) : null}
            {!this.props.isUserAuthenticated ? (
              <div>
                {" "}
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
            ) : (
              <div className={styles.authenticatedActions}>
                <button
                  className={classNames(
                    styles.authenticationButton,
                    styles.logoutButton
                  )}
                  onClick={this.onLogoutClick}
                >
                  Log out
                </button>
                <div
                  className={styles.hamburger}
                  onClick={this.props.onActivityIconClick}
                >
                  <div className={styles.top} />
                  <div className={styles.middle} />
                  <div className={styles.bottom} />
                </div>
              </div>
            )}
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

export default withRouter(withAuthentication(Header));
