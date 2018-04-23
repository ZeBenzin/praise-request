import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { debounce } from "lodash";
import { searchRepos } from "ui/api/repo";
import { ErrorContext } from "ui/components/app/app";

import TextField from "component/text-field/text-field";
import RepoCard from "component/repo-card/repo-card";
import SearchIcon from "component/search-icon/search-icon";

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
    this.setState({ selectedRepo: id });
  }

  render() {
    return this.state.selectedRepo ? (
      <Redirect
        to={{
          pathname: `/search/${this.state.selectedRepo}`,
          state: { repoId: this.state.selectedRepo }
        }}
      />
    ) : (
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
      </div>
    );
  }
}

export default Search;
