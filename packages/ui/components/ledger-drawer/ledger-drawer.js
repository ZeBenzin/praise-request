import React, { Component } from "react";
import PropTypes from "prop-types";

import debounce from "lodash/debounce";

import TransactionPanel from "ui/components/transaction-panel/transaction-panel";
import BalancePanel from "ui/components/balance-panel/balance-panel";
import Drawer from "component/drawer/drawer";

import { getTransactions } from "ui/api/ledger";

import styles from "./ledger-drawer.scss";

class LedgerDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBalance: 0,
      transactions: [],
      pageNo: 1,
      isFilterActive: false
    };

    this.getTransactions = this.getTransactions.bind(this);
    this.onTransactionsFiltered = debounce(
      this.onTransactionsFiltered.bind(this),
      300
    );
    this.onRefreshClicked = this.onRefreshClicked.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.userBalance !== this.props.userBalance &&
      !this.state.isFilterActive
    ) {
      getTransactions({}).then(result => {
        this.setState(() => ({
          transactions: result.transactions
        }));
      });
    }
  }

  componentDidMount() {
    getTransactions({}).then(result => {
      this.setState(() => ({
        transactions: result.transactions
      }));
    });
  }

  onTransactionsFiltered({ startIndex, endIndex }) {
    this.setState(prevState => ({
      transactions: [...prevState.transactions.slice(startIndex, endIndex + 1)],
      isFilterActive: true
    }));
  }

  onRefreshClicked() {
    if (!this._isFetching) {
      getTransactions({}).then(result => {
        this.setState(() => ({
          transactions: result.transactions
        }));
        this._isFetching = false;
      });
    }
  }

  getTransactions() {
    if (!this._isFetching && !this.state.isFilterActive) {
      this._isFetching = true;
      return getTransactions({ pageNo: this.state.pageNo + 1 }).then(result => {
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
          userBalance={parseInt(this.props.userBalance, 10)}
          userData={this.props.userData}
          transactions={this.state.transactions}
          onTransactionsFiltered={this.onTransactionsFiltered}
        />
        <TransactionPanel
          userBalance={this.props.userBalance}
          userData={this.props.userData}
          transactions={this.state.transactions}
          getTransactions={this.getTransactions}
          onRefreshClicked={this.onRefreshClicked}
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
