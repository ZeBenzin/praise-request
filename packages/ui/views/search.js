import React, { Component } from "react";
import { debounce } from "lodash";
import { searchRepos } from "ui/api/repo";

import TextField from "component/text-field/text-field";
import RepoCard from "component/repo-card/repo-card";

import styles from "./search.scss";

class Search extends Component {
  constructor() {
    super();
    this.onInputChange = debounce(this.onInputChange.bind(this), 300);
    this.state = {
      repos: [{}]
    };
  }

  onInputChange(value) {
    searchRepos(value)
      .then(({ data }) => {
        this.setState({ repos: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <TextField onInputChange={e => this.onInputChange(e.target.value)} />
        <div className={styles.repoListContainer}>
          <RepoCard />
        </div>
      </div>
    );
  }
}

export default Search;
