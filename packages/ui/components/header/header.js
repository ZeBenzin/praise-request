import React, { PureComponent } from "react";

import styles from "./header.scss";

class Header extends PureComponent {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>(praiseRequest)</div>
          <div>About</div>
          <div>OST</div>
          <div>GitHub</div>
        </div>
      </div>
    );
  }
}

export default Header;
