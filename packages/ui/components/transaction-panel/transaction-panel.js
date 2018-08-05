import React, { Component } from "react";
import PropTypes from "prop-types";

import { InfiniteLoader, List, AutoSizer } from "react-virtualized";
import moment from "moment";
import Done from "@material-ui/icons/Done";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalance from "@material-ui/icons/AccountBalance";

import TransactionModal from "ui/components/transaction-modal/transaction-modal";

import { getTransaction } from "ui/api/transaction";
import { getUser } from "ui/api/user";

import styles from "./transaction-panel.scss";

class TransactionPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTransactionModalOpen: false,
      selectedTransaction: {},
      otherUser: {}
    };

    this.rowRenderer = this.rowRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.onTransactionClicked = this.onTransactionClicked.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onTransactionClicked(tx) {
    const otherUserId =
      tx.to_user_id === this.props.userData.ostId
        ? tx.from_user_id
        : tx.to_user_id;
    const promises = [
      getTransaction({ id: tx.id }),
      getUser({ id: otherUserId, isFetchingOSTUser: true })
    ];
    Promise.all(promises).then(result => {
      this.setState({
        isTransactionModalOpen: true,
        selectedTransaction: result[0].transaction,
        otherUser: result[1].users[0]
      });
    });
  }

  onCloseModal() {
    this.setState({ isTransactionModalOpen: false });
  }

  isRowLoaded({ index }) {
    return !!this.props.transactions[index];
  }

  rowRenderer({ index, key, style }) {
    const tx = this.props.transactions[index];
    return (
      <div
        className={styles.txPoint}
        key={key}
        style={style}
        onClick={() => this.onTransactionClicked(tx)}
      >
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
  }

  render() {
    return (
      <div className={styles.transactionList}>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.props.getTransactions}
          rowCount={10000}
        >
          {({ onRowsRendered, registerChild }) => {
            return (
              <AutoSizer>
                {({ width, height }) => {
                  return (
                    <List
                      width={width}
                      height={height}
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                      rowCount={this.props.transactions.length}
                      rowHeight={67}
                      rowRenderer={this.rowRenderer}
                      overscanRowCount={10}
                    />
                  );
                }}
              </AutoSizer>
            );
          }}
        </InfiniteLoader>
        {this.state.isTransactionModalOpen ? (
          <TransactionModal
            transaction={this.state.selectedTransaction}
            otherUser={this.state.otherUser}
            onCloseModal={this.onCloseModal}
            userData={this.props.userData}
          />
        ) : null}
      </div>
    );
  }
}

TransactionPanel.propTypes = {
  userBalance: PropTypes.number,
  userData: PropTypes.object,
  transactions: PropTypes.arrayOf(PropTypes.object),
  getTransactions: PropTypes.func.isRequired
};

TransactionPanel.defaultProps = {
  userBalance: 0,
  userData: {},
  transactions: []
};

export default TransactionPanel;
