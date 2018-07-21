import React, { Component } from "react";

import { getTransactions } from "ui/api/ledger";

import styles from "./transaction-panel.scss";

class TransactionPanel extends Component {
  componentDidMount() {
    getTransactions().then(({ data }) => {
      this.setState(() => ({
        transactions: data
      }));
    });
  }

  render() {
    return <div className={styles.panelContainer} />;
  }
}

export default TransactionPanel;
