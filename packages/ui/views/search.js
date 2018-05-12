import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import debounce from "lodash/debounce";
import { searchRepos } from "ui/api/repo";
import { ErrorContext } from "ui/components/app/app";

import TextField from "component/text-field/text-field";
import RepoCard from "component/repo-card/repo-card";
import Pagination from "component/pagination/pagination";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Modal from "component/modal/modal";

import { getByRepoId } from "ui/api/pull-request";
import { executeTransaction } from "ui/api/transaction";

import classNames from "classnames";
import styles from "./search.scss";

const PR_STATE = {
  closed: "closed",
  open: "open"
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = debounce(this.onInputChange.bind(this), 300);
    this.onRepoClick = this.onRepoClick.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onFilterPRs = debounce(this.onFilterPRs.bind(this), 300);
    this.onPrevPageClick = this.onPrevPageClick.bind(this);
    this.onNextPageClick = this.onNextPageClick.bind(this);

    const repos = props.location.state ? props.location.state.repos || [] : [];
    const searchTerm = props.location.state
      ? props.location.state.searchTerm || ""
      : "";

    this.state = {
      repos,
      searchTerm,
      selectedRepo: null,
      modalOpen: false,
      pullRequests: [],
      pageNumber: 1,
      totalPages: 1,
      prFilters: {
        term: "",
        state: PR_STATE.open
      }
    };
  }

  onInputChange(value) {
    this.setState(
      { searchTerm: value, pageNumber: 1 },
      this.executeSearch(value, 1)
    );
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

  onPrevPageClick() {
    const newPageNumber = this.state.pageNumber - 1;
    this.setState(
      { pageNumber: newPageNumber },
      this.executeSearch(this.state.searchTerm, newPageNumber)
    );
  }

  onNextPageClick() {
    const newPageNumber = this.state.pageNumber + 1;
    this.setState(
      { pageNumber: newPageNumber },
      this.executeSearch(this.state.searchTerm, newPageNumber)
    );
  }

  executeSearch(value, pageNumber) {
    searchRepos(value, pageNumber)
      .then(({ data }) => {
        this.setState({
          repos: data.items,
          totalPages: Number.parseInt(data.totalPages, 10)
        });
      })
      .catch(err => {
        // Early toast implementation
        this.setState({ error: true });
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
        <div className={styles.search}>
          <SearchIcon className={styles.searchIcon} />
          <TextField
            onInputChange={e => this.onInputChange(e.target.value)}
            placeholder="Search repositories"
          />
          {this.state.error ? (
            <ErrorContext.Consumer>
              {val => {
                this.setState({ error: false });
                val();
              }}
            </ErrorContext.Consumer>
          ) : null}
        </div>
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
        <Pagination
          onPrevClick={this.onPrevPageClick}
          onNextClick={this.onNextPageClick}
          showPrevButton={this.state.pageNumber > 1}
          showNextButton={this.state.pageNumber < this.state.totalPages}
        />
        {this.state.modalOpen ? this.renderPRModal() : null}
      </div>
    );
  }
}

export default withRouter(Search);
