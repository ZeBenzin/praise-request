import React, { Component } from "react";
import { debounce } from "lodash";
import { searchRepos } from "ui/api/repo";

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
      repos: []
    };
  }

  onInputChange(value) {
    searchRepos(value)
      .then(({ data }) => {
        this.setState({ repos: data.data });
      })
      .catch(err => {
        console.log(err);
        // Display toast - yeah right!
      });
  }

  onRepoClick() {}

  render() {
    return (
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <SearchIcon />
          <TextField onInputChange={e => this.onInputChange(e.target.value)} />
        </div>
        <div className={styles.repoListContainer}>
          {this.state.repos.map(repo => (
            <RepoCard key={repo.id} repo={repo} onClick={this.onRepoClick} />
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
