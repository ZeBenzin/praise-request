import React, { Component } from "react";
import PropTypes from "prop-types";

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
        <div className={styles.transactionList}>
          {this.state.transactions.map(tx => {
            return (
              <div className={styles.txPoint}>
                <div className={styles.txDetails}>
                  <div className={styles.txDetailsContent}>{tx.to_user_id}</div>
                  <div className={styles.arrow} />
                </div>

                <div className={styles.txTimeline}>
                  <div className={styles.txLine} />
                  <div className={styles.txCircle} />
                  <div className={styles.txLine} />
                </div>

                <div className={styles.txCreatedDate}>
                  {moment(tx.timestamp).format("DD MMM YYYY")}
                </div>
              </div>
            );
            // return (
            //   <div key={tx.id} className={styles.transactionCard}>
            //     <div className={styles.transactionCardTop}>
            //       <span>{tx.to_user_id}</span>
            //       <span>
            //         {tx.to_user_id === this.props.userData.ostUuid ? "+" : "-"}
            //         {tx.amount}
            //       </span>
            //     </div>
            //     <div>{moment(tx.timestamp).format("DD MMM YYYY")}</div>
            //   </div>
            // );
          })}
        </div>
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
