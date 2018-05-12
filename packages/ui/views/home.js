import React, { Component } from "react";
import debounce from "lodash/debounce";
import { searchRepos } from "ui/api/repo";
import { ErrorContext } from "ui/components/app/app";

import TextField from "component/text-field/text-field";
import RepoCard from "component/repo-card/repo-card";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Modal from "component/modal/modal";

import { getByRepoId } from "ui/api/pull-request";
import { executeTransaction } from "ui/api/transaction";

import classNames from "classnames";
import styles from "./home.scss";

const PR_STATE = {
  closed: "closed",
  open: "open"
};

class Search extends Component {
  constructor() {
    super();

    this.onRepoClick = this.onRepoClick.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);

    this.state = {
      repos: [],
      selectedRepo: null,
      modalOpen: false,
      pullRequests: [],
      prFilters: {
        term: "",
        state: PR_STATE.open
      }
    };
  }

  componentWillMount() {
    searchRepos("react")
      .then(({ data }) => {
        this.setState({ repos: data.items });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  onRepoClick(e, id) {
    const repo = this.state.repos.find(repo => repo.id === id);
    getByRepoId(repo.name, repo.owner.login, {
      state: this.state.prFilters.state
    })
      .then(({ data }) => {
        this.setState({
          selectedRepo: id,
          pullRequests: data,
          modalOpen: true
        });
      })
      .catch(err => {
        // Do a toast or suttin
      });
    this.setState({ modalOpen: true });
  }

  onPRFilterChanged(nextFilters) {
    const repo = this.state.repos.find(
      repo => repo.id === this.state.selectedRepo
    );
    this.setState(
      {
        prFilters: { ...this.state.prFilters, ...nextFilters }
      },
      () =>
        getByRepoId(repo.name, repo.owner.login, nextFilters).then(
          ({ data }) => {
            this.setState({
              pullRequests: data
            });
          }
        )
    );
  }

  onPraiseClick(e, id) {
    const pr = this.state.pullRequests.find(pr => pr.id === id);
    const elem = e.currentTarget;
    elem.classList.add(styles.clicked);
    executeTransaction(pr)
      .then(data => {
        elem.classList.remove(styles.clicked);
        console.log("success", data);
      })
      .catch(err => console.log(err));
  }

  onCloseModal() {
    this.setState({ modalOpen: false });
  }

  onFilterPRs(query) {
    this.setState({
      prFilters: { ...this.state.prFilters, term: query }
    });
  }

  renderPRModal() {
    const filteredPRs = this.state.prFilters.term
      ? this.state.pullRequests.filter(pr =>
          pr.title
            .toLowerCase()
            .includes(this.state.prFilters.term.toLowerCase())
        )
      : this.state.pullRequests;
    const modalContent = (
      <div className={styles.prContainer}>
        <div className={styles.repoName}>You-Dont-Know-JS</div>
        <div className={styles.filters}>
          <div className={styles.inputContainer}>
            <SearchIcon />
            <input
              placeholder="Filter"
              className={styles.input}
              autoFocus
              onChange={e => this.onFilterPRs(e.currentTarget.value)}
            />
          </div>
          <div className={styles.statusFilters}>
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
                <div>{pr.user.login}</div>
              </div>
              <div className={styles.praiseButtonContainer}>
                <span className={styles.praiseCount}>270</span>
                {this.props.isUserAuthenticated ? (
                  <button
                    className={styles.praiseButton}
                    onClick={e => this.onPraiseClick(e, pr.id)}
                  >
                    <FavoriteBorder className={styles.favoriteIcon} />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    return (
      <Modal
        content={modalContent}
        onClose={this.onCloseModal}
        containerClassName={styles.prModal}
      />
    );
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <div className={styles.header}>Popular Repositories</div>
        <div className={styles.repoListContainer}>
          {this.state.repos.map(repo => (
            <RepoCard
              id={repo.id}
              key={repo.id}
              repo={repo}
              onClick={e => this.onRepoClick(e, repo.id)}
            />
          ))}
        </div>
        {this.state.modalOpen ? this.renderPRModal() : null}
      </div>
    );
  }
}

export default Search;
