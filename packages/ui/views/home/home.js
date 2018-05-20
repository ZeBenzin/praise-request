import React, { Component } from "react";
import PropTypes from "prop-types";

import RepoList from "ui/components/repo-list/repo-list";

import { searchRepos } from "ui/api/repo";

import styles from "./home.scss";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      pageNumber: 1,
      totalPages: 1,
      loading: false
    };

    this.onNextPageClick = this.onNextPageClick.bind(this);
    this.onPrevPageClick = this.onPrevPageClick.bind(this);
  }
  componentWillMount() {
    this.executeSearch(this.state.pageNumber);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchParameters !== nextProps.searchParameters) {
      this.setState({ pageNumber: 1 });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onPrevPageClick() {
    const newPageNumber = this.state.pageNumber - 1;
    this.executeSearch(newPageNumber);
  }

  onNextPageClick() {
    const newPageNumber = this.state.pageNumber + 1;
    this.executeSearch(newPageNumber);
  }

  executeSearch(pageNumber) {
    this.setState({ loading: true });
    searchRepos("react")
      .then(({ data }) => {
        if (this._isMounted) {
          this.setState({
            repos: data.items,
            totalPages: Number.parseInt(data.totalPages, 10),
            pageNumber,
            loading: false
          });
        }
      })
      .catch(err => {
        if (this._isMounted) {
          this.setState({ error: true });
        }
      });
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <div className={styles.header}>Popular Repositories</div>
        <RepoList
          displayFooter={this.props.displayFooter}
          repos={this.state.repos}
          totalPages={this.state.totalPages}
          isUserAuthenticated={this.props.isUserAuthenticated}
          pageNumber={this.state.pageNumber}
          loading={this.state.loading}
          onPrevPageClick={this.onPrevPageClick}
          onNextPageClick={this.onNextPageClick}
        />
      </div>
    );
  }
}

Home.propTypes = {
  displayFooter: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool
};

export default Home;
