import React, { Component } from "react";
import { debounce } from "lodash";
import { searchRepos } from "ui/api/repo";

import TextField from "component/text-field/text-field";

import styles from "./search.scss";

class Search extends Component {
  constructor() {
    super();
    this.onInputChange = debounce(this.onInputChange.bind(this), 300);
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
      });
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <TextField onInputChange={e => this.onInputChange(e.target.value)} />
        <div className={styles.repoListContainer}>
          {this.state.repos.map((repo, index) => <div key={index}>{repo}</div>)}
        </div>
      </div>
    );
  }
}

export default Search;
