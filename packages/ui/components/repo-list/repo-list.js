import React, { Component } from "react";
import PropTypes from "prop-types";

import RepoCard from "component/repo-card/repo-card";
import LoadingSpinner from "component/loading-spinner/loading-spinner";
import Pagination from "component/pagination/pagination";
import PRModal from "ui/components/pr-modal/pr-modal";

import { getByRepoId } from "ui/api/pull-request";

import classNames from "classnames";
import styles from "./repo-list.scss";

class RepoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRepo: {},
      modalOpen: false,
      pullRequests: [],
      prFilters: {
        state: "OPEN"
      }
    };

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onRepoClick = this.onRepoClick.bind(this);
  }

  onCloseModal() {
    this.setState({ modalOpen: false });
  }

  onRepoClick(e, id) {
    const repo = this.props.repos.find(repo => repo.id === id);
    getByRepoId(repo.name, repo.owner.login, {
      state: this.state.prFilters.state
    })
      .then(({ data }) => {
        this.setState({
          selectedRepo: repo,
          pullRequests: data,
          modalOpen: true
        });
      })
      .catch(err => {
        // Do a toast or suttin
      });
  }

  render() {
    return (
      <div>
        {this.props.loading ? <LoadingSpinner /> : null}
        <div
          className={classNames(styles.repoListContainer, {
            [styles.listVisible]: !this.props.loading
          })}
        >
          {this.props.loading ? null : (
            <div className={styles.repoList}>
              {this.props.repos.map(repo => (
                <RepoCard
                  id={repo.id}
                  key={repo.id}
                  displayFooter={this.props.displayFooter}
                  isUserAuthenticated={this.props.isUserAuthenticated}
                  repo={repo}
                  onClick={e => this.onRepoClick(e, repo.id)}
                />
              ))}
            </div>
          )}
          {this.state.modalOpen ? (
            <PRModal
              pullRequests={this.state.pullRequests}
              selectedRepo={this.state.selectedRepo}
              onCloseModal={this.onCloseModal}
              displayFooter={this.props.displayFooter}
            />
          ) : null}
        </div>
        <Pagination
          onPrevClick={this.props.onPrevPageClick}
          onNextClick={this.props.onNextPageClick}
          showPrevButton={this.props.pageNumber > 1}
          showNextButton={this.props.pageNumber < this.props.totalPages}
        />
      </div>
    );
  }
}

RepoList.propTypes = {
  isUserAuthenticated: PropTypes.bool,
  displayFooter: PropTypes.func.isRequired,
  repos: PropTypes.array,
  onPrevPageClick: PropTypes.func.isRequired,
  onNextPageClick: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default RepoList;
