import React, { Component } from "react";
import PropTypes from "prop-types";

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
      >
        {this.props.drawerContent}
      </div>
    );
  }
}

Drawer.propTypes = {
  drawerContent: PropTypes.node,
  isVisible: PropTypes.bool
};

export default Drawer;
