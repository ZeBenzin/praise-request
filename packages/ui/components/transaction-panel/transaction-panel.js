import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import moment from "moment";
import sortBy from "lodash/sortBy";

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

  computeLineChartData() {
    let balance = this.props.userBalance;
    const graphData = this.state.transactions.map((tx, index) => {
      const previousTx = this.state.transactions[index - 1];
      if (previousTx) {
        balance = balance + parseInt(previousTx.amount, 10);
      }
      return {
        name: tx.timestamp,
        value: balance
      };
    });
    const sortedData = sortBy(graphData, data => data.name);
    return sortedData.map(d => ({
      name: moment(d.name).format("hh mm DD MMM YYYY"),
      value: d.value
    }));
  }

  render() {
    return (
      <div className={styles.panelContainer}>
        <div className={styles.timelineContainer}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={this.computeLineChartData()}>
              <Tooltip />

              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="value"
                dot={false}
              />
              <XAxis dataKey="name" />
            </LineChart>
          </ResponsiveContainer>
        </div>
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

TransactionPanel.propTypes = {
  userBalance: PropTypes.number
};

TransactionPanel.defaultProps = {
  userBalance: 0
};

export default TransactionPanel;
