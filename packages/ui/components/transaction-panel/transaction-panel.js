import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import Done from "@material-ui/icons/Done";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalance from "@material-ui/icons/AccountBalance";

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
                  <PersonIcon className={styles.icon} />
                  <div className={styles.txConnection}>
                    <span className={styles.txAmount}>
                      {this.props.userData.ostId === tx.to_user_id ? "+" : "-"}
                      {tx.amount}
                    </span>
                    <div className={styles.txConnectionLine} />
                  </div>
                  <AccountBalance className={styles.icon} />
                </div>
                <div className={styles.arrow} />
              </div>
              <div className={styles.txTimeline}>
                <div className={styles.txLine} />
                <div className={styles.txStatusIcon}>
                  <Done className={styles.doneIcon} />
                </div>
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
