import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import Done from "@material-ui/icons/Done";

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
      <div className={styles.transactionList}>
        {this.state.transactions.map(tx => {
          return (
            <div className={styles.txPoint} key={tx.id}>
              <div className={styles.txDetails}>
                <div className={styles.txDetailsContent}>
                  <div className={styles.txStatus}>
                    <div className={styles.txStatusIcon}>
                      <Done className={styles.doneIcon} />
                    </div>
                    <span>+{tx.amount}</span>
                  </div>
                </div>
                <div className={styles.arrow} />
              </div>

              <div className={styles.txTimeline}>
                <div className={styles.txLine} />
                <div className={styles.txCircle} />
                <div className={styles.txLine} />
              </div>

              <div className={styles.txCreatedDate}>
                {moment(tx.timestamp).format("hh:mm:ss DD MMM YYYY")}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

TransactionPanel.propTypes = {
  userBalance: PropTypes.number,
  userData: PropTypes.object
};

TransactionPanel.defaultProps = {
  userBalance: 0,
  userData: {}
};

export default TransactionPanel;
