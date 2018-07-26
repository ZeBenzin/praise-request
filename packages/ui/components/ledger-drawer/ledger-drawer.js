import React, { Component } from "react";
import PropTypes from "prop-types";

import TransactionPanel from "ui/components/transaction-panel/transaction-panel";
import { getUserBalance } from "ui/api/balance";
import BalancePanel from "ui/components/balance-panel/balance-panel";

import Drawer from "component/drawer/drawer";

import styles from "./ledger-drawer.scss";

class LedgerWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBalance: 0
    };
  }

  componentDidMount() {
    getUserBalance().then(({ data }) => {
      this.setState(() => ({
        userBalance: parseInt(data.data.balance.available_balance, 10)
      }));
    });
  }

  renderDrawerContent() {
    return (
      <div className={styles.accountView}>
        <BalancePanel
          userBalance={parseInt(this.state.userBalance, 10)}
          userData={this.props.userData}
        />

        <TransactionPanel
          userBalance={this.state.userBalance}
          userData={this.props.userData}
        />
      </div>
    );
  }

  render() {
    return (
      <Drawer
        isVisible={this.props.isVisible}
        drawerContent={this.renderDrawerContent()}
      />
    );
  }
}

LedgerWallet.propTypes = {
  isVisible: PropTypes.bool
};

export default LedgerWallet;
