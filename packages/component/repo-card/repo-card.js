import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./repo-card.scss";

class RepoCard extends PureComponent {
  renderTags() {
    return ["javascript", "react", "website", "documentation"].map(tag => {
      return (
        <span>
          <span className={styles.repoTag}>{tag}</span>
        </span>
      );
    });
  }

  render() {
    const { name, description, owner, id } = this.props.repo;
    return (
      <div id={id} className={styles.repoCard} onClick={this.props.onClick} />
    );
  }
}

RepoCard.propTypes = {
  repo: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

RepoCard.defaultProps = {
  onClick: () => {}
};

export default RepoCard;
