import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./text-field.scss";

class TextField extends PureComponent {
  render() {
    return (
      <input
        placeholder={this.props.placeholder}
        autoFocus
        onChange={this.props.onInputChange}
        className={styles.input}
      />
    );
  }
}

TextField.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

TextField.defaultProps = {
  onInputChange: () => {},
  placeholder: ""
};

export default TextField;
