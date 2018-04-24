import React, { PureComponent } from "react";
import styles from "./wallet-icon.scss";

class SearchIcon extends PureComponent {
  render() {
    const className = this.props.small
      ? styles.searchIconSmall
      : styles.searchIcon;
    return <div className={className} />;
  }
}

export default SearchIcon;