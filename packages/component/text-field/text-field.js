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
        onKeyPress={this.props.onKeyPress}
        className={styles.input}
      />
    );
  }
}

TextField.propTypes = {
  onInputChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string
};

TextField.defaultProps = {
  onInputChange: () => {},
  onKeyPress: () => {},
  placeholder: ""
};

export default TextField;
