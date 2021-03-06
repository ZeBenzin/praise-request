import React, { Component } from "react";
import PropTypes from "prop-types";

import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/PersonOutline";
import Modal from "component/modal/modal";
import LoadingSpinner from "component/loading-spinner/loading-spinner";
import PraiseButton from "component/praise-button/praise-button";

import { getByRepoId } from "ui/api/pull-request";
import { executeTransaction } from "ui/api/transaction";

import classNames from "classnames";
import styles from "./pr-modal.scss";

const PR_STATE = {
  closed: "closed",
  open: "open"
};

class PRModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pullRequests: [],
      loading: true,
      prFilters: {
        term: "",
        state: PR_STATE.open
      }
    };

    this.onPraiseClick = this.onPraiseClick.bind(this);
  }

  componentDidMount() {
    const { name, owner } = this.props.selectedRepo;
    getByRepoId(name, owner.login, {
      state: this.state.prFilters.state
    })
      .then(({ data }) => {
        this.setState({
          pullRequests: data,
          loading: false
        });
      })
      .catch(err => {
        console.error("Error fetching pull requests", err);
      });
  }

  onPRFilterChanged(nextFilters) {
    const { name, owner } = this.props.selectedRepo;
    this.setState(
      {
        prFilters: { ...this.state.prFilters, ...nextFilters },
        loading: true
      },
      () =>
        getByRepoId(name, owner.login, nextFilters).then(({ data }) => {
          this.setState({
            pullRequests: data,
            loading: false
          });
        })
    );
  }

  onFilterPRs(query) {
    this.setState({
      prFilters: { ...this.state.prFilters, term: query }
    });
  }

  onPraiseClick(pr) {
    return executeTransaction(pr.user).catch(err => {
      console.error("Error executing transaction", err);
    });
  }

  render() {
    const filteredPRs = this.state.prFilters.term
      ? this.state.pullRequests.filter(pr =>
          pr.title
            .toLowerCase()
            .includes(this.state.prFilters.term.toLowerCase())
        )
      : this.state.pullRequests;
    const modalContent = (
      <div className={styles.prContainer}>
        <span
          className={styles.exitButton}
          onClick={e => {
            e.stopPropagation();
            this.props.onCloseModal();
          }}
        >
          <CloseIcon />
        </span>
        <div className={styles.repoName}>{this.props.selectedRepo.name}</div>
        <div className={styles.filters}>
          <div>
            <span
              className={classNames(styles.stateFilter, {
                [styles.activeStateFilter]:
                  this.state.prFilters.state === PR_STATE.open
              })}
              onClick={() => this.onPRFilterChanged({ state: PR_STATE.open })}
            >
              Open
            </span>
            <span
              className={classNames(styles.stateFilter, {
                [styles.activeStateFilter]:
                  this.state.prFilters.state === PR_STATE.closed
              })}
              onClick={() => this.onPRFilterChanged({ state: PR_STATE.closed })}
            >
              Closed
            </span>
          </div>
        </div>
        <div className={styles.prList}>
          {this.state.loading ? (
            <LoadingSpinner />
          ) : (
            filteredPRs.map(pr => (
              <div className={styles.prCard} key={pr.id}>
                <div className={styles.rightSide}>
                  <div className={styles.prTitle}>{pr.title}</div>
                  <div className={styles.userInfo}>
                    <PersonIcon />
                    <span>{pr.user.login}</span>
                  </div>
                </div>
                <PraiseButton
                  onPraiseClickCallback={() => this.onPraiseClick(pr)}
                  onPraisePreventedCallback={this.props.displayFooter}
                  isPraiseEnabled={this.props.isUserAuthenticated}
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
    return (
      <Modal
        content={modalContent}
        onClose={this.props.onCloseModal}
        containerClassName={styles.prModal}
      />
    );
  }
}

PRModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  displayFooter: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool
};

export default PRModal;
