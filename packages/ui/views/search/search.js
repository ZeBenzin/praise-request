import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import debounce from "lodash/debounce";

import LoadingSpinner from "component/loading-spinner/loading-spinner";
import TextField from "component/text-field/text-field";
import SearchIcon from "@material-ui/icons/Search";
import { ErrorContext } from "ui/components/app/app";
import RepoList from "ui/components/repo-list/repo-list";

import { searchRepos } from "ui/api/repo";

import styles from "./search.scss";

class Search extends Component {
  constructor(props) {
    super(props);

    const repos = props.location.state ? props.location.state.repos || [] : [];
    const searchTerm = props.location.state
      ? props.location.state.searchTerm || ""
      : "";

    this.state = {
      repos,
      searchTerm,
      pageNumber: 1,
      totalPages: 1,
      loading: false
    };

    this.onInputChange = debounce(this.onInputChange.bind(this), 300);
    this.onNextPageClick = this.onNextPageClick.bind(this);
    this.onPrevPageClick = this.onPrevPageClick.bind(this);
  }

  onInputChange(value) {
    this.setState(
      { searchTerm: value, pageNumber: 1 },
      this.executeSearch(value, 1)
    );
  }

  onPrevPageClick() {
    const newPageNumber = this.state.pageNumber - 1;
    this.executeSearch(this.state.searchTerm, newPageNumber);
  }

  onNextPageClick() {
    const newPageNumber = this.state.pageNumber + 1;
    this.executeSearch(this.state.searchTerm, newPageNumber);
  }

  executeSearch(value, pageNumber) {
    this.setState({ loading: true });
    searchRepos(value)
      .then(({ data }) => {
        this.setState({
          repos: data.items,
          totalPages: Number.parseInt(data.totalPages, 10),
          pageNumber,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: true });
      });
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
          {this.state.loading ? <LoadingSpinner /> : null}
          {this.state.error ? (
            <ErrorContext.Consumer>
              {val => {
                this.setState({ error: false });
                val();
              }}
            </ErrorContext.Consumer>
          ) : null}
        </div>
        <RepoList
          displayFooter={this.props.displayFooter}
          repos={this.state.repos}
          totalPages={this.state.totalPages}
          pageNumber={this.state.pageNumber}
          loading={this.state.loading}
          onPrevPageClick={this.onPrevPageClick}
          onNextPageClick={this.onNextPageClick}
          isUserAuthenticated={this.props.isUserAuthenticated}
        />
      </div>
    );
  }
}

Search.propTypes = {
  displayFooter: PropTypes.func.isRequired,
  location: PropTypes.object,
  isUserAuthenticated: PropTypes.bool
};

export default withRouter(Search);
