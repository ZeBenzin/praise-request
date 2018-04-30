import React, { PureComponent } from "react";

import TextField from "component/text-field/text-field";
import Modal from "component/modal/modal";

import classNames from "classnames";
import styles from "./header.scss";

class Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };

    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onCloseModal() {
    this.setState({ modalOpen: false });
  }

  onLoginClick() {
    this.setState({ modalOpen: true });
  }

  onRegisterClick() {
    this.setState({
      modalOpen: true
    });
  }

  renderRegisterForm() {
    return <div className={styles.form} />;
  }

  renderModal() {
    const content = (
      <div className={styles.contentContainer}>
        <div className={styles.tabs}>
          <div className={styles.tab}>
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
        onClose={this.onCloseModal}
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
