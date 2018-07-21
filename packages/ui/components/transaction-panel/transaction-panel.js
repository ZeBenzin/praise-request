import React, { Component } from "react";
import moment from "moment";

import { getTransactions } from "ui/api/ledger";

import styles from "./transaction-panel.scss";

class TransactionPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: []
    };
  }

  componentDidMount() {
    getTransactions().then(({ data }) => {
      this.setState(() => ({
        transactions: data.data.transactions
      }));
    });
  }

  render() {
    return (
      <div className={styles.panelContainer}>
        <div className={styles.timelineContainer} />
        <div className={styles.transactionList}>
          {this.state.transactions.map(tx => {
            return (
              <div key={tx.id} className={styles.transactionCard}>
                <div className={styles.transactionCardTop}>
                  <span>{tx.to_user_id}</span>
                  <span>-{tx.amount}</span>
                </div>
                <div>{moment(tx.timestamp).format("DD MMM YYYY")}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TransactionPanel;
