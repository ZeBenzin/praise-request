import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SearchIcon from "@material-ui/icons/Search";
import AuthenticationModal from "ui/components/authentication-modal/authentication-modal";
import { withAuthentication } from "ui/higher-order-components/with-authentication";

import classNames from "classnames";
import styles from "./header.scss";

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authModalOpen: false,
      balance: 0
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onAuthenticationModalClosed = this.onAuthenticationModalClosed.bind(
      this
    );
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onLoginClick() {
    this.setState({ authModalOpen: true });
  }

  onLogoutClick() {
    localStorage.removeItem("praiseRequestToken");
    window.location.reload(true);
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
          <div className={styles.leftContent}>ALPHA v0.2.0</div>
          {this.props.isUserAuthenticated ? (
            <div className={styles.praiseBalance}>
              <FavoriteBorderIcon />
              <span>{this.props.balance}</span>
            </div>
          ) : null}
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
                {this.props.isUserAuthenticated ? (
                  <div
                    className={styles.hamburger}
                    onClick={this.props.onActivityIconClick}
                  >
                    <div className={styles.top} />
                    <div className={styles.middle} />
                    <div className={styles.bottom} />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
        {this.state.authModalOpen ? (
          <AuthenticationModal onClose={this.onAuthenticationModalClosed} />
        ) : null}
      </div>
    );
  }
}

Header.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  toggleSearchOverlay: PropTypes.func.isRequired,
  onActivityIconClick: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  balance: PropTypes.number
};

export default withRouter(withAuthentication(Header));
