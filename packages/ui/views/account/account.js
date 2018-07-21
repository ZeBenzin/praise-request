import React, { Component } from "react";

import TransactionPanel from "ui/components/transaction-panel/transaction-panel";
// import BalancePanel from "ui/components/balance-panel/balance-panel";

import styles from "./account.scss";

class Account extends Component {
  render() {
    return (
      <div className={styles.accountView}>
        <div className={styles.leftHandSide}>
          <TransactionPanel />
        </div>
        <div className={styles.rightHandSide}>{/* <BalancePanel /> */}</div>
      </div>
    );
  }
}

export default Account;
