import React, { Component } from "react";
import Search from "ui/views/search";

import SearchIcon from "component/search-icon/search-icon";

import styles from "./app.scss";

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header} />
        <div className={styles.content}>
          <div className={styles.navBar}>
            <div className={styles.navLink}>
              <SearchIcon small />
              <span className={styles.navLinkLabel}>Search</span>
            </div>
            <div className={styles.navLink}>Account</div>
            <div className={styles.navLink}>Wallet</div>
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
