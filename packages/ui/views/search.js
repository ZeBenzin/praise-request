import React, { Component } from "react";
import { debounce } from "lodash";
import { searchRepos } from "ui/api/repo";
import { ErrorContext } from "ui/components/app/app";

import TextField from "component/text-field/text-field";
import RepoCard from "component/repo-card/repo-card";
import SearchIcon from "component/search-icon/search-icon";
import Modal from "component/modal/modal";

import { getByRepoId } from "ui/api/pull-request";

import styles from "./search.scss";

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = debounce(this.onInputChange.bind(this), 300);
    this.onRepoClick = this.onRepoClick.bind(this);

    this.state = {
      repos: [],
      selectedRepo: null
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
        this.setState({ selectedRepo: id, pullRequests: data });
      })
      .catch(err => {
        // Do a toast or suttin
      });
  }

  renderPRModal() {
    const modalContent = (
      <div>
        {this.state.pullRequests.map(pr => (
          <div className={styles.prCard} key={pr.id}>
            <div className={styles.leftSide} />
            <div className={styles.rightSide}>
              <div>{pr.title}</div>
              <div>{pr.user.login}</div>
            </div>
            <div className={styles.praiseButtonContainer}>
              <button className={styles.praiseButton}>Praise</button>
            </div>
          </div>
        ))}
      </div>
    );
    return <Modal content={modalContent} />;
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <SearchIcon />
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
        {this.state.selectedRepo ? this.renderPRModal() : null}
      </div>
    );
  }
}

export default Search;
