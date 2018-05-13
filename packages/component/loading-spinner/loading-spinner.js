import React, { PureComponent } from "react";
import styles from "./loading-spinner.scss";

class LoadingSpinner extends PureComponent {
  render() {
    return <div className={styles.spinner} />;
  }
}

export default LoadingSpinner;
