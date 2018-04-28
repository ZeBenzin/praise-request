import React, { PureComponent } from "react";
import styles from "./search-icon.scss";

class SearchIcon extends PureComponent {
  render() {
    const className = this.props.small
      ? styles.searchIconSmall
      : styles.searchIcon;
    return (
      <div>
        <div className={className}>
          <div className={styles.windowShine}>
            <div className={styles.windowShineTop} />
            <div className={styles.windowShineMiddle} />
            <div className={styles.windowShineBottom} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchIcon;
