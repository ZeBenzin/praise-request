import React, { Component } from "react";

import { getTransactions } from "ui/api/ledger";

import styles from "./account.scss";

class Account extends Component {
  componentDidMount() {
    getTransactions().then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div className={styles.accountView}>
        <div className={styles.leftHandSide}>
          <div className={styles.timelineContainer} />
          <div className={styles.transactionList} />
        </div>
        <div className={styles.rightHandSide} />
      </div>
    );
  }
}

export default Account;
