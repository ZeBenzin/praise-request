import React, { Component } from "react";
import PropTypes from "prop-types";

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";
import sortBy from "lodash/sortBy";

import PersonIcon from "@material-ui/icons/PersonOutline";

import { getTransactions } from "ui/api/ledger";

import styles from "./balance-panel.scss";

class BalancePanel extends Component {
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
        if (previousTx.to_user_id === this.props.userData.ostUuid) {
          balance = balance - parseInt(previousTx.amount, 10);
        } else {
          balance = balance + parseInt(previousTx.amount, 10);
        }
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
      <div className={styles.balanceDetailsContainer}>
        <PersonIcon className={styles.personIcon} />
        <div>{this.props.userData.ghUserName}</div>
        <div>{this.props.userBalance} PRAISE</div>
        <div className={styles.timelineContainer}>
          <ResponsiveContainer width={"100%"} height={200} margin="auto">
            <LineChart data={this.computeLineChartData()}>
              <Tooltip />

              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="value"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

BalancePanel.propTypes = {
  userBalance: PropTypes.number,
  userData: PropTypes.object
};

export default BalancePanel;
