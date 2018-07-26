import React, { Component } from "react";
import PropTypes from "prop-types";

import TransactionPanel from "ui/components/transaction-panel/transaction-panel";
import { getUserBalance } from "ui/api/balance";
import BalancePanel from "ui/components/balance-panel/balance-panel";

import styles from "./account.scss";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBalance: 0
    };
  }

  componentDidMount() {
    getUserBalance().then(({ data }) => {
      this.setState(() => ({
        userBalance: parseInt(data.data.balance.available_balance, 10)
      }));
    });
  }

  render() {
    return (
      <div className={styles.accountView}>
        <div className={styles.leftHandSide}>
          <TransactionPanel
            userBalance={this.state.userBalance}
            userData={this.props.userData}
          />
        </div>
        <div className={styles.rightHandSide}>
          <BalancePanel
            userBalance={parseInt(this.state.userBalance, 10)}
            userData={this.props.userData}
          />
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  userData: PropTypes.object
};

export default Account;
