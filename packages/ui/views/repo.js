import React, { Component } from "react";

import { getRepoById } from "ui/api/repo";

class Repo extends Component {
  // Use https://api.github.com/repositories/1 to fetch the repository before mounting
  constructor(props) {
    super(props);

    this.state = {
      repoId: props.location.state.repoId,
      repo: null
    };
  }

  componentDidMount() {
    getRepoById(this.state.repoId)
      .then(({ data }) => {
        this.setState({ repo: data.data });
      })
      .catch(err => {
        // Display toast
        console.log(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedId !== this.props.selectedId) {
      getRepoById(nextProps.selectedId)
        .then(({ data }) => {
          this.setState({ repo: data.repo });
        })
        .catch(err => {
          // Display toast
          console.log(err);
        });
    }
  }

  render() {
    if (this.state.repo) {
      return <div>{JSON.stringify(this.state.repo)}</div>;
    }
    return null;
  }
}

export default Repo;
