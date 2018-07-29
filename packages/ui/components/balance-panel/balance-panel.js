import React, { Component } from "react";
import PropTypes from "prop-types";

import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
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
      name: d.name,
      value: d.value
    }));
  }

  render() {
    return (
      <div className={styles.balanceDetailsContainer}>
        <PersonIcon className={styles.personIcon} />
        <div className={styles.userInfo}>
          {this.props.userData.ghUserName} • {this.props.userBalance}
        </div>
        <div className={styles.timelineContainer}>
          <ResponsiveContainer width={"100%"} height={100} margin="auto">
            <AreaChart data={this.computeLineChartData()}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#467ebd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#467ebd" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                wrapperStyle={{
                  top: "-40px",
                  fontSize: "11px",
                  textAlign: "center"
                }}
                content={(v, i, l) => {
                  return v.active ? (
                    <div className={styles.timelineTooltip}>
                      <span>
                        {moment(v.payload[0].payload.name).format("DD MMM")}
                      </span>{" "}
                      |
                      <span> {v.payload[0].payload.value}</span>
                    </div>
                  ) : null;
                }}
              />
              <XAxis dataKey="name" hide />
              <Area
                type="monotone"
                strokeWidth={3}
                dataKey="value"
                dot={false}
                fill="url(#colorUv)"
              />
            </AreaChart>
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
