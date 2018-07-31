import React, { Component } from "react";
import PropTypes from "prop-types";

import TransactionPanel from "ui/components/transaction-panel/transaction-panel";
import BalancePanel from "ui/components/balance-panel/balance-panel";
import Drawer from "component/drawer/drawer";

import { getUserBalance } from "ui/api/balance";
import { getTransactions } from "ui/api/ledger";

import styles from "./ledger-drawer.scss";

class LedgerDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBalance: 0,
      transactions: [],
      pageNo: 1
    };

    this.getTransactions = this.getTransactions.bind(this);
  }

  componentDidMount() {
    const promises = [getUserBalance(), getTransactions({})];
    Promise.all(promises).then(results => {
      this.setState(() => ({
        userBalance: parseInt(results[0].balance.available_balance, 10),
        transactions: results[1].transactions
      }));
    });
  }

  getTransactions() {
    if (!this._isFetching) {
      this._isFetching = true;
      return getTransactions({ pageNo: this.state.pageNo + 1 }).then(result => {
        // if results has come back empty don't update the pageNo
        this.setState(prevState => ({
          transactions: [...prevState.transactions, ...result.transactions],
          pageNo: prevState.pageNo + 1
        }));
        this._isFetching = false;
      });
    }
  }

  renderDrawerContent() {
    return (
      <div className={styles.accountView}>
        <BalancePanel
          userBalance={parseInt(this.state.userBalance, 10)}
          userData={this.props.userData}
          transactions={this.state.transactions}
        />
        <TransactionPanel
          userBalance={this.state.userBalance}
          userData={this.props.userData}
          transactions={this.state.transactions}
          getTransactions={this.getTransactions}
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

LedgerDrawer.propTypes = {
  isVisible: PropTypes.bool
};

export default LedgerDrawer;
