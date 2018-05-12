import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import debounce from "lodash/debounce";

import { searchRepos } from "ui/api/repo";

import SearchIcon from "@material-ui/icons/Search";
import TextField from "component/text-field/text-field";

import classNames from "classnames";
import styles from "./search-overlay.scss";

class SearchOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ""
    };

    this.onInputChange = debounce(this.onInputChange.bind(this), 300);
    this.onKeyPress = debounce(this.onKeyPress.bind(this), 300);
  }

  onInputChange(value) {
    this.setState({ searchTerm: value });
  }

  onKeyPress(code) {
    if (code === 13 && this.state.searchTerm) {
      searchRepos(this.state.searchTerm)
        .then(({ data }) => {
          this.props.history.push("/search", {
            repos: data.data,
            searchTerm: this.state.searchTerm
          });
          this.props.toggleSearchOverlay();
        })
        .catch(err => {
          // Early toast implementation
          this.setState({ error: true });
        });
    }
  }

  render() {
    return (
      <div
        className={classNames(styles.searchOverlay, {
          [styles.searchOverlayVisible]: this.props.isSearchVisible
        })}
      >
        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <TextField
            onInputChange={e => this.onInputChange(e.target.value)}
            onKeyPress={e => this.onKeyPress(e.charCode)}
            placeholder="Search repositories"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(SearchOverlay);
