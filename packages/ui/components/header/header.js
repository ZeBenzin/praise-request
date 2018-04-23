import React, { PureComponent } from "react";

import styles from "./header.scss";

class Header extends PureComponent {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.hamburger}>
            <div className={styles.top} />
            <div className={styles.middle} />
            <div className={styles.bottom} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
