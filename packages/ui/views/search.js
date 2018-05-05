import React, { Component } from "react";
import { debounce } from "lodash";
import { searchRepos } from "ui/api/repo";
import { ErrorContext } from "ui/components/app/app";

import TextField from "component/text-field/text-field";
import RepoCard from "component/repo-card/repo-card";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Modal from "component/modal/modal";

import { getByRepoId } from "ui/api/pull-request";
import { executeTransaction } from "ui/api/transaction";

import styles from "./search.scss";

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = debounce(this.onInputChange.bind(this), 300);
    this.onRepoClick = this.onRepoClick.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);

    this.state = {
      repos: [],
      selectedRepo: null,
      modalOpen: true
    };
  }

  onInputChange(value) {
    searchRepos(value)
      .then(({ data }) => {
        this.setState({ repos: data.data });
      })
      .catch(err => {
        // Early toast implementation
        this.setState({ error: true });
      });
  }

  onRepoClick(e, id) {
    const repo = this.state.repos.find(repo => repo.id === id);
    getByRepoId(repo.name, repo.owner.login)
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

  renderPRModal() {
    const fakePrs = [
      { id: 1, title: "Do a thing for a thing", login: "that_guy_93" },
      { id: 2, title: "Do a thing for a thing", login: "that_guy_93" },
      { id: 3, title: "Do a thing for a thing", login: "that_guy_93" },
      { id: 4, title: "Do a thing for a thing", login: "that_guy_93" }
    ];
    const modalContent = (
      <div className={styles.prContainer}>
        <div className={styles.repoName}>You-Dont-Know-JS</div>
        <div className={styles.filters}>
          <div className={styles.inputContainer}>
            <SearchIcon />
            <input placeholder="Filter" className={styles.input} autoFocus />
          </div>
          <div>
            <span>Open</span>
            <span>Closed</span>
          </div>
        </div>
        <div className={styles.prList}>
          {fakePrs.map(pr => (
            <div className={styles.prCard} key={pr.id}>
              <div className={styles.rightSide}>
                <div className={styles.prTitle}>{pr.title}</div>
                <div>{pr.login}</div>
              </div>
              <div className={styles.praiseButtonContainer}>
                <span className={styles.praiseCount}>270</span>
                <button
                  className={styles.praiseButton}
                  onClick={e => this.onPraiseClick(e, pr.id)}
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
          <TextField onInputChange={e => this.onInputChange(e.target.value)} />
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
        {this.state.modalOpen ? this.renderPRModal() : null}
      </div>
    );
  }
}

export default Search;
