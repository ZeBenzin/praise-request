import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
import styles from "./text-field.scss";

class TextField extends PureComponent {
  render() {
    const {
      autoFocus,
      placeholder,
      onInputChange,
      onKeyPress,
      className,
      onClick
    } = this.props;
    return (
      <input
        placeholder={placeholder}
        autoFocus={autoFocus}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        className={classNames(styles.input, className)}
        onClick={onClick}
      />
    );
  }
}

TextField.propTypes = {
  onInputChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

TextField.defaultProps = {
  onInputChange: () => {},
  onKeyPress: () => {},
  placeholder: "",
  className: "",
  onClick: () => {},
  autoFocus: false
};

export default TextField;
