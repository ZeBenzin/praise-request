import React, { Component } from "react";
import PropTypes from "prop-types";

class BalancePanel extends Component {
  render() {
    return <div>{this.props.userBalance}</div>;
  }
}

BalancePanel.propTypes = {
  userBalance: PropTypes.number
};

export default BalancePanel;
