import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class TextField extends PureComponent {
  render() {
    return <input onChange={this.props.onInputChange} />;
  }
}

TextField.propTypes = {
  onInputChange: PropTypes.func.isRequired
};

TextField.defaultProps = {
  onInputChange: () => {}
};

export default TextField;
