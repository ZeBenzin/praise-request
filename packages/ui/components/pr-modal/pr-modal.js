import React, { Component } from "react";
import PropTypes from "prop-types";

import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/PersonOutline";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Modal from "component/modal/modal";

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
      pullRequests: props.pullRequests,
      prFilters: {
        term: "",
        state: PR_STATE.open
      }
    };
  }

  onPRFilterChanged(nextFilters) {
    const { name, owner } = this.props.selectedRepo;
    this.setState(
      {
        prFilters: { ...this.state.prFilters, ...nextFilters }
      },
      () =>
        getByRepoId(name, owner.login, nextFilters).then(({ data }) => {
          this.setState({
            pullRequests: data
          });
        })
    );
  }

  onFilterPRs(query) {
    this.setState({
      prFilters: { ...this.state.prFilters, term: query }
    });
  }

  onPraiseClick(e, id) {
    const pr = this.state.pullRequests.find(pr => pr.id === id);
    const elem = e.currentTarget;
    elem.classList.add(styles.clicked);
    if (this.props.isUserAuthenticated) {
      executeTransaction(pr.user)
        .then(() => {
          elem.classList.remove(styles.clicked);
        })
        .catch(err => console.log(err));
    } else {
      elem.classList.remove(styles.clicked);
      this.props.displayFooter();
    }
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
          {filteredPRs.map(pr => (
            <div className={styles.prCard} key={pr.id}>
              <div className={styles.rightSide}>
                <div className={styles.prTitle}>{pr.title}</div>
                <div className={styles.userInfo}>
                  <PersonIcon />
                  <span>{pr.user.login}</span>
                </div>
              </div>
              <div className={styles.praiseButtonContainer}>
                <span className={styles.praiseCount}>270</span>

                <button
                  className={styles.praiseButton}
                  onClick={e => {
                    e.stopPropagation();
                    this.onPraiseClick(e, pr.id);
                  }}
                >
                  <FavoriteBorder className={styles.favoriteIcon} />
                </button>
              </div>
            </div>
          ))}
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
