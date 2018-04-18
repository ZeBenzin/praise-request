import React, { Component } from "react";
import { searchRepos } from "ui/api/repo";

import TextField from "component/text-field/text-field"

import styles from "./search.scss";

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    searchRepos(e.target.value).then(data => {
      console.log("repos: ", data);
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return <div className={styles.searchContainer}>
        <TextField onInputChange={this.onInputChange} />
        <div className={styles.repoListContainer} />
    </div>;
  }
}

export default Search;
