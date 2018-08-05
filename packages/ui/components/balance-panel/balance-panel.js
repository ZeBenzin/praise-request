import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Brush
} from "recharts";
import moment from "moment";
import sortBy from "lodash/sortBy";

import PersonIcon from "@material-ui/icons/PersonOutline";

import styles from "./balance-panel.scss";

class BalancePanel extends Component {
  computeLineChartData() {
    let balance = this.props.userBalance;
    const graphData = this.props.transactions.map((tx, index) => {
      const previousTx = this.props.transactions[index - 1];
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
    return sortedData.map(({ name, value }) => ({
      name,
      value
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
              <Brush height={20} onChange={this.props.onTransactionsFiltered} />
              <Tooltip
                wrapperStyle={{
                  top: "-40px",
                  fontSize: "11px",
                  textAlign: "center"
                }}
                content={(v, i, l) => {
                  return v.active && v.payload ? (
                    <div className={styles.timelineTooltip}>
                      <span>
                        {moment(v.payload[0].payload.name).format("DD MMM")}
                      </span>{" "}
                      <span className={styles.tooltipLabelDivider}>|</span>
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
  userData: PropTypes.object,
  transactions: PropTypes.arrayOf(PropTypes.object)
};

BalancePanel.defaultProps = {
  userBalance: 0,
  userData: {},
  transactions: []
};

export default BalancePanel;
