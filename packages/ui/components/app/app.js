import React, { Component } from "react";
import Search from "ui/views/search";

import SearchIcon from "component/search-icon/search-icon";
import PersonIcon from "component/person-icon/person-icon";
import WalletIcon from "component/wallet-icon/wallet-icon";

import styles from "./app.scss";

class App extends Component {
  getNavLinks() {
    return [
      {
        id: "search",
        label: "Search",
        icon: <SearchIcon small />,
        visible: true
      },
      {
        id: "account",
        label: "Account",
        icon: <PersonIcon />,
        visible: true
      },
      {
        id: "wallet",
        label: "Wallet",
        icon: <WalletIcon small />,
        visible: true
      }
    ];
  }

  renderNavLink({ id, label, icon }) {
    return (
      <div key={id} className={styles.navLink}>
        {icon}
        <span className={styles.navLinkLabel}>{label}</span>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header} />
        <div className={styles.content}>
          <div className={styles.navBar}>
            {this.getNavLinks().map(link => this.renderNavLink(link))}
            {/*<div className={styles.navLink}>
              <SearchIcon small />
              <span className={styles.navLinkLabel}>Search</span>
            </div>
            <div className={styles.navLink}>Account</div>
    <div className={styles.navLink}>Wallet</div>*/}
          </div>
          <div className={styles.mainContent}>
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
