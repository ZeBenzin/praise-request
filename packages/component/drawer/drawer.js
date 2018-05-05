import React, { Component } from "react";

import classNames from "classnames";
import styles from "./drawer.scss";

class Drawer extends Component {
  render() {
    return (
      <div
        className={classNames(styles.drawer, {
          [styles.drawerHidden]: !this.props.isVisible,
          [styles.drawerVisible]: this.props.isVisible
        })}
      />
    );
  }
}

export default Drawer;
