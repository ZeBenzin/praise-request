import React, { Component } from "react";

import { getRepoById } from "ui/api/repo";

class Repo extends Component {
  // Use https://api.github.com/repositories/1 to fetch the repository before mounting
  constructor(props) {
    super(props);
    this.state = {
      repo: {}
    };
  }

  componentDidMount() {}

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
    return <div>{this.state.repo}</div>;
  }
}

export default Repo;
